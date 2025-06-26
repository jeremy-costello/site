// components/chat/ChatContainer.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { generateRAGResponse } from '../../services/llm';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { type ChatMessage as ChatMessageType } from './ChatMessage';

interface RetrievedArticle {
  title: string;
  text: string;
}

interface ChatContainerProps {
  onArticlesChange: (articles: RetrievedArticle[]) => void;
  cachedArticles: RetrievedArticle[];
}

export default function ChatContainer({ onArticlesChange, cachedArticles }: ChatContainerProps) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [numArticles, setNumArticles] = useState<number | 'none'>(1);
  const [paragraphsPerArticle, setParagraphsPerArticle] = useState<number | 'all'>(2);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  const handleSubmit = async () => {
    if (!query.trim() || loading) return;
    
    const currentQuery = query;
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      type: 'user',
      content: currentQuery,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setLoading(true);
    setStreamingContent('');

    try {
      // Convert messages to chat history format for LLM
      const chatHistory = messages
        .filter(msg => msg.type === 'user')
        .map((userMsg) => {
          const assistantMsg = messages.find(
            msg => 
              msg.type === 'assistant' && 
              msg.timestamp > userMsg.timestamp &&
              messages.indexOf(msg) === messages.indexOf(userMsg) + 1
          );
          return {
            question: userMsg.content,
            answer: assistantMsg?.content || ''
          };
        })
        .filter(chat => chat.answer); // Only include complete Q&A pairs

      // Determine if this is the first message (no chat history)
      const isFirstMessage = chatHistory.length === 0;
      
      const stream = generateRAGResponse(
        currentQuery,
        numArticles,
        paragraphsPerArticle,
        chatHistory,
        isFirstMessage,
        cachedArticles
      );
      
      let fullResponse = '';
      
      for await (const chunk of stream) {
        if (typeof chunk === 'string') {
          fullResponse += chunk;
          setStreamingContent(fullResponse);
        } else {
          // Handle the case where articles are returned
          if (chunk.articles && chunk.articles.length > 0) {
            onArticlesChange(chunk.articles);
          }
        }
      }
      
      const assistantMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: fullResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setStreamingContent('');
    } catch (err) {
      console.error('Generation error:', err);
      const errorMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'An error occurred while generating a response.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setStreamingContent('');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setStreamingContent('');
    onArticlesChange([]); // Clear cached articles when clearing chat
  };

  return (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default',
      border: 1,
      borderColor: 'divider',
      borderRadius: { xs: 1, md: '4px 0 0 4px' }
    }}>
      {/* Fixed Header */}
      <ChatHeader
        messageCount={messages.length}
        cachedArticlesCount={cachedArticles.length}
        onClearChat={clearChat}
        numArticles={numArticles}
        onNumArticlesChange={setNumArticles}
        paragraphsPerArticle={paragraphsPerArticle}
        onParagraphsPerArticleChange={setParagraphsPerArticle}
      />

      {/* Scrollable Messages Area */}
      <ChatMessages
        messages={messages}
        loading={loading}
        streamingContent={streamingContent}
        messagesEndRef={messagesEndRef}
      />

      {/* Fixed Input Area */}
      <ChatInput
        query={query}
        loading={loading}
        onQueryChange={setQuery}
        onSubmit={handleSubmit}
        onKeyPress={handleKeyPress}
      />
    </Box>
  );
}