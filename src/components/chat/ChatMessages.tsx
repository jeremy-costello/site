// components/chat/ChatMessages.tsx
import React from 'react';
import { Box } from '@mui/material';
import ChatMessage, { type ChatMessage as ChatMessageType } from './ChatMessage';
import StreamingMessage from './StreamingMessage';
import EmptyChat from './EmptyChat';
import { useTheme } from "@mui/material/styles";

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
  const theme = useTheme();
  
  return (
    <Box sx={{
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      p: { xs: 1, sm: 2 },
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default',

      // scrollbar
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.text.primary,
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: theme.palette.primary.main,
      },
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