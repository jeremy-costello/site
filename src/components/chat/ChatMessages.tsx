// components/chat/ChatMessages.tsx
import React from 'react';
import { Box } from '@mui/material';
import ChatMessage, { type ChatMessage as ChatMessageType } from './ChatMessage';
import StreamingMessage from './StreamingMessage';
import EmptyChat from './EmptyChat';

interface ChatMessagesProps {
  messages: ChatMessageType[];
  loading: boolean;
  streamingContent: string;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export default function ChatMessages({
  messages,
  loading,
  streamingContent,
  messagesEndRef
}: ChatMessagesProps) {
  return (
    <Box sx={{ 
      flex: 1, 
      overflowY: 'auto', 
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default'
    }}>
      {messages.length === 0 && !loading && <EmptyChat />}

      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}

      {/* Streaming Response */}
      {loading && <StreamingMessage content={streamingContent} />}

      <div ref={messagesEndRef} />
    </Box>
  );
}