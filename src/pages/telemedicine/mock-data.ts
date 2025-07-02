import { Participant, ChatMessage, ConsultationSession, VitalSigns, ConsultationDocument } from './types';

export const mockParticipants: Participant[] = [
   {
      id: 'doctor-001',
      name: 'Dr. Sarah Johnson',
      role: 'doctor',
      avatar: '/assets/doctor_f.png',
      isOnline: true,
      isMuted: false,
      isVideoEnabled: true,
      connectionQuality: 'excellent'
   },
   {
      id: 'patient-001',
      name: 'John Doe',
      role: 'patient',
      avatar: '/assets/patient_m.png',
      isOnline: true,
      isMuted: false,
      isVideoEnabled: true,
      connectionQuality: 'good'
   },
   {
      id: 'nurse-001',
      name: 'Emily Chen',
      role: 'nurse',
      isOnline: false,
      isMuted: true,
      isVideoEnabled: false,
      connectionQuality: 'good'
   }
];

export const mockChatMessages: ChatMessage[] = [
   {
      id: 'msg-001',
      senderId: 'system',
      senderName: 'System',
      senderRole: 'doctor',
      message: 'Consultation session started',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      type: 'system'
   },
   {
      id: 'msg-002',
      senderId: 'doctor-001',
      senderName: 'Dr. Sarah Johnson',
      senderRole: 'doctor',
      message: 'Good morning, John! How are you feeling today?',
      timestamp: new Date(Date.now() - 240000), // 4 minutes ago
      type: 'text'
   },
   {
      id: 'msg-003',
      senderId: 'patient-001',
      senderName: 'John Doe',
      senderRole: 'patient',
      message: 'Good morning, Doctor. I\'ve been feeling much better since our last consultation.',
      timestamp: new Date(Date.now() - 180000), // 3 minutes ago
      type: 'text'
   },
   {
      id: 'msg-004',
      senderId: 'doctor-001',
      senderName: 'Dr. Sarah Johnson',
      senderRole: 'doctor',
      message: 'That\'s great to hear! I see you\'ve uploaded your latest blood pressure readings. Let me review them.',
      timestamp: new Date(Date.now() - 120000), // 2 minutes ago
      type: 'text'
   },
   {
      id: 'msg-005',
      senderId: 'patient-001',
      senderName: 'John Doe',
      senderRole: 'patient',
      message: 'Yes, I\'ve been monitoring it daily as you suggested.',
      timestamp: new Date(Date.now() - 60000), // 1 minute ago
      type: 'text'
   }
];

export const mockConsultationSession: ConsultationSession = {
   id: 'session-001',
   patientId: 'patient-001',
   patientName: 'John Doe',
   doctorId: 'doctor-001',
   doctorName: 'Dr. Sarah Johnson',
   appointmentTime: new Date(),
   duration: 30,
   status: 'active',
   consultationType: 'follow-up',
   specialty: 'Cardiology',
   notes: 'Follow-up consultation for hypertension management'
};

export const mockVitalSigns: VitalSigns[] = [
   {
      heartRate: 72,
      bloodPressure: { systolic: 125, diastolic: 80 },
      temperature: 98.6,
      oxygenSaturation: 98,
      respiratoryRate: 16,
      timestamp: new Date(Date.now() - 86400000) // 1 day ago
   },
   {
      heartRate: 75,
      bloodPressure: { systolic: 128, diastolic: 82 },
      temperature: 98.4,
      oxygenSaturation: 99,
      respiratoryRate: 15,
      timestamp: new Date(Date.now() - 43200000) // 12 hours ago
   },
   {
      heartRate: 70,
      bloodPressure: { systolic: 122, diastolic: 78 },
      temperature: 98.5,
      oxygenSaturation: 98,
      respiratoryRate: 16,
      timestamp: new Date() // Now
   }
];

export const mockConsultationDocuments: ConsultationDocument[] = [
   {
      id: 'doc-001',
      name: 'Blood Pressure Log.pdf',
      type: 'report',
      url: '#',
      uploadedBy: 'patient-001',
      uploadedAt: new Date(Date.now() - 3600000), // 1 hour ago
      size: 245760 // 240 KB
   },
   {
      id: 'doc-002',
      name: 'ECG Results.pdf',
      type: 'lab-result',
      url: '#',
      uploadedBy: 'doctor-001',
      uploadedAt: new Date(Date.now() - 1800000), // 30 minutes ago
      size: 1048576 // 1 MB
   },
   {
      id: 'doc-003',
      name: 'Prescription - Lisinopril.pdf',
      type: 'prescription',
      url: '#',
      uploadedBy: 'doctor-001',
      uploadedAt: new Date(Date.now() - 900000), // 15 minutes ago
      size: 102400 // 100 KB
   }
];

export const generateMockMessage = (senderId: string, senderName: string, senderRole: Participant['role'], message: string): ChatMessage => {
   return {
      id: `msg-${Date.now()}`,
      senderId,
      senderName,
      senderRole,
      message,
      timestamp: new Date(),
      type: 'text'
   };
};

export const formatFileSize = (bytes: number): string => {
   if (bytes < 1024) return bytes + ' B';
   if (bytes < 1048576) return Math.round(bytes / 1024) + ' KB';
   return Math.round(bytes / 1048576) + ' MB';
};

export const getConnectionQualityColor = (quality: Participant['connectionQuality']): string => {
   switch (quality) {
      case 'excellent': return '#4caf50';
      case 'good': return '#8bc34a';
      case 'fair': return '#ff9800';
      case 'poor': return '#f44336';
      default: return '#9e9e9e';
   }
};

export const getRoleColor = (role: Participant['role']): string => {
   switch (role) {
      case 'doctor': return '#1976d2';
      case 'patient': return '#388e3c';
      case 'nurse': return '#7b1fa2';
      case 'specialist': return '#f57c00';
      default: return '#616161';
   }
}; 