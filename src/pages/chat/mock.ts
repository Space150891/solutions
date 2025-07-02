import { User, Message, Conversation, UserRole, MessageStatus, MessageType, FileAttachment } from './types';

// Mock users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@hospital.com',
    role: UserRole.DOCTOR,
    avatar: '/assets/doctor_f.png',
    isOnline: true,
  },
  {
    id: 'user-2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@hospital.com',
    role: UserRole.DOCTOR,
    avatar: '/assets/doctor_m.png',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: 'user-3',
    name: 'John Smith',
    email: 'john.smith@email.com',
    role: UserRole.PATIENT,
    avatar: '/assets/patient_m.png',
    isOnline: true,
  },
  {
    id: 'user-4',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    role: UserRole.PATIENT,
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: 'user-5',
    name: 'Robert Wilson',
    email: 'robert.wilson@email.com',
    role: UserRole.PATIENT,
    isOnline: true,
  },
];

// Current user (can be switched for demo purposes)
export const currentUser: User = mockUsers[0]; // Dr. Sarah Johnson

// Sample file attachments
export const sampleAttachments: FileAttachment[] = [
  {
    id: 'att-1',
    name: 'blood_test_results.pdf',
    type: 'application/pdf',
    size: 245760, // 240KB
    url: '/assets/sample-files/blood_test_results.pdf',
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: 'att-2',
    name: 'x_ray_chest.jpg',
    type: 'image/jpeg',
    size: 1024000, // 1MB
    url: '/assets/sample-files/x_ray_chest.jpg',
    thumbnailUrl: '/assets/sample-files/x_ray_chest_thumb.jpg',
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hour ago
  },
  {
    id: 'att-3',
    name: 'medication_schedule.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 52480, // 51KB
    url: '/assets/sample-files/medication_schedule.docx',
    uploadedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
];

// Mock messages
export const mockMessages: { [conversationId: string]: Message[] } = {
  'conv-1': [
    {
      id: 'msg-1',
      conversationId: 'conv-1',
      senderId: 'user-3',
      content: 'Hello Dr. Johnson, I wanted to follow up on my recent test results.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      type: MessageType.TEXT,
      status: MessageStatus.READ,
    },
    {
      id: 'msg-2',
      conversationId: 'conv-1',
      senderId: 'user-1',
      content: 'Hello John! I\'ve reviewed your test results. Overall, they look good. Your blood pressure has improved significantly since our last visit.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5), // 1.5 hours ago
      type: MessageType.FILE,
      status: MessageStatus.READ,
      attachments: [sampleAttachments[0]], // Blood test results PDF
    },
    {
      id: 'msg-3',
      conversationId: 'conv-1',
      senderId: 'user-3',
      content: 'That\'s great news! Should I continue with the current medication dosage?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      type: MessageType.TEXT,
      status: MessageStatus.READ,
    },
    {
      id: 'msg-4',
      conversationId: 'conv-1',
      senderId: 'user-1',
      content: 'Yes, please continue with the current dosage. I\'d like to schedule a follow-up appointment in 3 months to monitor your progress.',
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      type: MessageType.TEXT,
      status: MessageStatus.READ,
    },
    {
      id: 'msg-5',
      conversationId: 'conv-1',
      senderId: 'user-3',
      content: 'Perfect! I\'ll contact the front desk to schedule the appointment. Thank you for the quick response.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      type: MessageType.TEXT,
      status: MessageStatus.READ,
    },
  ],
  'conv-2': [
    {
      id: 'msg-6',
      conversationId: 'conv-2',
      senderId: 'user-4',
      content: 'Dr. Johnson, I\'ve been experiencing some side effects from the new medication. Is this normal?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      type: MessageType.TEXT,
      status: MessageStatus.READ,
    },
    {
      id: 'msg-7',
      conversationId: 'conv-2',
      senderId: 'user-1',
      content: 'I\'m sorry to hear that, Emily. Can you describe the specific side effects you\'re experiencing?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3.5), // 3.5 hours ago
      type: MessageType.TEXT,
      status: MessageStatus.READ,
    },
    {
      id: 'msg-8',
      conversationId: 'conv-2',
      senderId: 'user-4',
      content: 'I\'ve been feeling nauseous in the mornings and have had some dizziness. It started about 3 days ago.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      type: MessageType.TEXT,
      status: MessageStatus.READ,
    },
    {
      id: 'msg-9',
      conversationId: 'conv-2',
      senderId: 'user-1',
      content: 'These symptoms can occur as your body adjusts to the medication. Let\'s reduce the dosage by half for the next week and see if that helps. Please keep me updated on how you feel.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5), // 2.5 hours ago
      type: MessageType.FILE,
      status: MessageStatus.READ,
      attachments: [sampleAttachments[2]], // Medication schedule document
    },
    {
      id: 'msg-10',
      conversationId: 'conv-2',
      senderId: 'user-4',
      content: 'Thank you! I\'ll start with the reduced dosage today. Should I call if the symptoms persist?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      type: MessageType.TEXT,
      status: MessageStatus.DELIVERED,
    },
  ],
  'conv-3': [
    {
      id: 'msg-11',
      conversationId: 'conv-3',
      senderId: 'user-5',
      content: 'Good morning Dr. Johnson! I wanted to ask about my upcoming surgery preparation.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      type: MessageType.TEXT,
      status: MessageStatus.READ,
    },
    {
      id: 'msg-12',
      conversationId: 'conv-3',
      senderId: 'user-1',
      content: 'Good morning Robert! I\'m glad you reached out. Your surgery is scheduled for next Tuesday. Have you been following the pre-operative instructions I sent?',
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      type: MessageType.TEXT,
      status: MessageStatus.READ,
    },
    {
      id: 'msg-13',
      conversationId: 'conv-3',
      senderId: 'user-5',
      content: 'Yes, I\'ve been following the diet restrictions and stopped taking the medications you mentioned. I do have one question about the fasting period.',
      timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
      type: MessageType.TEXT,
      status: MessageStatus.READ,
    },
    {
      id: 'msg-14',
      conversationId: 'conv-3',
      senderId: 'user-1',
      content: 'Great! What\'s your question about fasting?',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      type: MessageType.TEXT,
      status: MessageStatus.READ,
    },
    {
      id: 'msg-15',
      conversationId: 'conv-3',
      senderId: 'user-5',
      content: 'Can I drink water up until 2 hours before the surgery, or should I stop earlier?',
      timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
      type: MessageType.TEXT,
      status: MessageStatus.DELIVERED,
    },
    {
      id: 'msg-16',
      conversationId: 'conv-3',
      senderId: 'user-5',
      content: '',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      type: MessageType.FILE,
      status: MessageStatus.DELIVERED,
      attachments: [sampleAttachments[1]], // X-ray image
    },
  ],
};

// Mock conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participants: [mockUsers[0], mockUsers[2]], // Dr. Sarah Johnson & John Smith
    lastMessage: mockMessages['conv-1'][mockMessages['conv-1'].length - 1],
    unreadCount: 0,
    isActive: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    type: 'direct',
  },
  {
    id: 'conv-2',
    participants: [mockUsers[0], mockUsers[3]], // Dr. Sarah Johnson & Emily Davis
    lastMessage: mockMessages['conv-2'][mockMessages['conv-2'].length - 1],
    unreadCount: 1,
    isActive: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    type: 'direct',
  },
  {
    id: 'conv-3',
    participants: [mockUsers[0], mockUsers[4]], // Dr. Sarah Johnson & Robert Wilson
    lastMessage: mockMessages['conv-3'][mockMessages['conv-3'].length - 1],
    unreadCount: 2,
    isActive: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    type: 'direct',
  },
];

// Simulated typing indicators
export const mockTypingIndicators: { [conversationId: string]: string[] } = {};

// Auto-response messages for simulation
export const autoResponses = [
  "Thank you for the information. I'll review this and get back to you shortly.",
  "I understand your concern. Let me check your medical history and provide you with the best advice.",
  "That sounds good. Please keep me updated on your progress.",
  "I'll schedule a follow-up appointment for you. My assistant will contact you with the details.",
  "Please don't hesitate to reach out if you have any other questions or concerns.",
  "Based on your symptoms, I recommend continuing with the current treatment plan.",
  "I'll send you some additional resources that might be helpful for your condition.",
  "Your test results look normal. We'll continue monitoring as planned.",
]; 