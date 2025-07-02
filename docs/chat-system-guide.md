# Chat/Messaging System for Telemedicine

## Overview

This chat system provides secure messaging functionality between doctors and patients, simulating real-time telemedicine communication. The system includes modern chat features like typing indicators, message status tracking, online presence, and auto-responses.

## Features

### Core Functionality
- **Real-time messaging** simulation with typing indicators
- **Message status tracking** (sent, delivered, read)
- **Online presence indicators** for users
- **Auto-response system** that simulates doctor responses
- **Context-aware responses** based on message content
- **Search functionality** for conversations
- **Responsive design** that works on desktop and mobile

### User Interface
- **Modern chat interface** with message bubbles
- **Conversation sidebar** with unread message counts
- **User avatars** and role indicators (doctor/patient)
- **Date separators** for better message organization
- **Typing indicators** with animated dots
- **Message timestamps** and status icons

### Telemedicine Features
- **Video call button** (placeholder for WebRTC integration)
- **Voice call button** (placeholder for WebRTC integration)
- **File attachment system** with upload, preview, and download functionality
- **Multi-format support** for images, documents, PDFs, videos, and audio files
- **File validation** with size limits and type restrictions
- **Emoji support** (placeholder for emoji picker)
- **Secure messaging** between healthcare providers and patients

## Navigation

To access the chat system:
1. Open the application
2. Navigate to the sidebar menu
3. Click on "Chat" in the navigation menu
4. Select a conversation from the sidebar to start messaging

## Demo Conversations

The system comes with pre-populated conversations between:

### Dr. Sarah Johnson (Current User) and Patients:

1. **John Smith** - Discussion about test results and medication
2. **Emily Davis** - Conversation about medication side effects  
3. **Robert Wilson** - Pre-surgery consultation and preparation

## How to Use

### Sending Messages
1. Select a conversation from the sidebar
2. Type your message in the input field at the bottom
3. Press Enter or click the send button
4. Watch for typing indicators and auto-responses

### Sharing Files
1. Click the attachment button (📎) in the message input area
2. Select files from your device (max 10MB per file)
3. Supported formats: Images, PDFs, Word documents, videos, audio files
4. Review selected files and remove any unwanted ones
5. Click "Upload" to attach files to your message
6. Send the message with or without additional text

### Viewing Attachments
- **Images**: Display as thumbnails with click-to-expand functionality
- **Documents**: Show file icons with name, size, and download button
- **File info**: Each attachment shows upload time and file size
- **Download**: Click the download button to save files locally

### Auto-Response System
The system simulates realistic doctor responses with:
- **Context-aware replies** based on keywords (appointment, medication, pain, etc.)
- **Typing indicators** that appear before responses
- **Realistic delays** (2-4 seconds) for natural conversation flow
- **Professional medical communication** style

### Message Features
- **Message status**: See when messages are sent, delivered, and read
- **Timestamps**: View exact time of each message
- **Date separators**: Messages are grouped by date
- **User identification**: Clear distinction between doctor and patient messages

## Technical Implementation

### File Structure
```
src/pages/chat/
├── chat.page.tsx              # Main chat page component
├── types.ts                   # TypeScript interfaces
├── mock.ts                    # Mock data and auto-responses
└── components/
    ├── chat-sidebar.component.tsx      # Conversation list
    ├── chat-header.component.tsx       # Chat header with user info
    ├── messages-list.component.tsx     # Message display area
    ├── message-bubble.component.tsx    # Individual message bubbles
    ├── message-input.component.tsx     # Message input field
    ├── file-attachment.component.tsx   # File attachment display
    └── file-upload.component.tsx       # File upload dialog
```

### Key Technologies
- **React** with TypeScript for type safety
- **Material-UI** for consistent design system
- **Real-time simulation** using setTimeout for demo purposes
- **Responsive design** using Material-UI breakpoints
- **State management** with React hooks

### Real-World Integration Points

For production deployment, the following would be integrated:

1. **WebSocket Connection**: Replace setTimeout with real WebSocket for live messaging
2. **Authentication**: Integrate with existing user authentication system
3. **Database**: Store messages, conversations, and user data
4. **File Storage**: Implement secure cloud storage for medical documents
5. **Video/Voice Calls**: Integrate WebRTC for telemedicine consultations
6. **Push Notifications**: Alert users of new messages when offline
7. **Encryption**: End-to-end encryption for HIPAA compliance

## Customization

### Adding New Auto-Responses
Edit `src/pages/chat/mock.ts` and add responses to the `autoResponses` array:

```typescript
export const autoResponses = [
  "Your custom response here...",
  // ... existing responses
];
```

### Modifying Conversation Data
Update the mock data in `src/pages/chat/mock.ts`:
- `mockUsers`: Add or modify user profiles
- `mockConversations`: Create new conversation threads
- `mockMessages`: Add message history

### Styling Customization
The chat system uses Material-UI's theming system and responds to:
- Light/dark mode switching
- Primary color theme changes
- Typography customization

## Security Considerations

In a production environment, implement:
- **HIPAA compliance** for healthcare data
- **End-to-end encryption** for message content
- **Audit logging** for all communications
- **Access controls** based on user roles
- **Data retention policies** for medical records

## Future Enhancements

Potential improvements for the chat system:
- **Group conversations** for medical team consultations
- **Message reactions** and replies
- **Voice messages** for easier communication
- **Screen sharing** for medical consultations
- **Appointment scheduling** integration
- **Medical form sharing** within conversations
- **Translation services** for multilingual support

## Testing the System

1. Navigate to the Chat page
2. Send a message containing keywords like "appointment", "medication", or "pain"
3. Observe the typing indicator and contextual auto-response
4. Try switching between conversations to see unread message handling
5. Test file attachment functionality:
   - Click the attachment button (📎)
   - Select various file types (images, PDFs, documents)
   - Upload files and observe the preview
   - Send messages with attachments
   - Download attached files from received messages
6. Test the responsive design by resizing the browser window

The chat system provides a solid foundation for telemedicine communication and can be easily extended with real-time capabilities for production use. 