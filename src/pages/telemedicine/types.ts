export interface Participant {
   id: string;
   name: string;
   role: 'doctor' | 'patient' | 'nurse' | 'specialist';
   avatar?: string;
   isOnline: boolean;
   isMuted: boolean;
   isVideoEnabled: boolean;
   connectionQuality: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface ChatMessage {
   id: string;
   senderId: string;
   senderName: string;
   senderRole: Participant['role'];
   message: string;
   timestamp: Date;
   type: 'text' | 'file' | 'system';
   fileUrl?: string;
   fileName?: string;
}

export interface ConsultationSession {
   id: string;
   patientId: string;
   patientName: string;
   doctorId: string;
   doctorName: string;
   appointmentTime: Date;
   duration: number; // in minutes
   status: 'scheduled' | 'active' | 'completed' | 'cancelled';
   consultationType: 'routine' | 'follow-up' | 'urgent' | 'second-opinion';
   specialty: string;
   notes?: string;
}

export interface VideoCallState {
   isCallActive: boolean;
   isRecording: boolean;
   recordingDuration: number;
   participants: Participant[];
   localParticipant: Participant;
   isScreenSharing: boolean;
   screenShareParticipant?: string;
   callQuality: 'excellent' | 'good' | 'fair' | 'poor';
   connectionStatus: 'connected' | 'connecting' | 'disconnected' | 'reconnecting';
}

export interface ConsultationControls {
   isMuted: boolean;
   isVideoEnabled: boolean;
   isScreenSharing: boolean;
   isRecording: boolean;
   isChatOpen: boolean;
   isParticipantsOpen: boolean;
   isSettingsOpen: boolean;
}

export interface VitalSigns {
   heartRate?: number;
   bloodPressure?: {
      systolic: number;
      diastolic: number;
   };
   temperature?: number;
   oxygenSaturation?: number;
   respiratoryRate?: number;
   timestamp: Date;
}

export interface ConsultationDocument {
   id: string;
   name: string;
   type: 'prescription' | 'lab-result' | 'image' | 'report' | 'other';
   url: string;
   uploadedBy: string;
   uploadedAt: Date;
   size: number;
}

export interface TelemedicineProps {
   sessionId?: string;
   patientId?: string;
   onSessionEnd?: () => void;
   onEmergency?: () => void;
} 