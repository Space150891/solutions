export interface User {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'patient';
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface FileAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  uploadedAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'system';
  status: 'sent' | 'delivered' | 'read';
  replyTo?: string;
  attachments?: FileAttachment[];
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  title?: string;
  type: 'direct' | 'group';
}

export interface ChatState {
  conversations: Conversation[];
  messages: { [conversationId: string]: Message[] };
  activeConversation: string | null;
  currentUser: User;
  isTyping: { [conversationId: string]: string[] };
}

export const MessageStatus = {
  SENT: 'sent' as const,
  DELIVERED: 'delivered' as const,
  READ: 'read' as const,
};

export const UserRole = {
  DOCTOR: 'doctor' as const,
  PATIENT: 'patient' as const,
};

export const MessageType = {
  TEXT: 'text' as const,
  IMAGE: 'image' as const,
  FILE: 'file' as const,
  SYSTEM: 'system' as const,
};

export const FileType = {
  IMAGE: 'image',
  DOCUMENT: 'document',
  VIDEO: 'video',
  AUDIO: 'audio',
  OTHER: 'other',
} as const;

export type FileTypeKey = keyof typeof FileType; 