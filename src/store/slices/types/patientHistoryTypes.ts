export interface Documentation {
  title: string;
  id: string;
  createdAt: string;
}

export interface Diagnosis {
  code: number;
  title: string;
  id: string;
  date: string;
}

export interface Document {
  title: string;
  id: string;
  url?: string;
  uploadedAt: string;
}

export interface Task {
  id: string;
  done: boolean;
  title: string;
  dueDate?: string;
  assignedTo?: string;
}

export interface SocialEntry {
  id: string;
  livingConditions: string;
  supportSystem: string;
  specialNotes: string;
  lastUpdated: string;
}

export interface PatientHistoryState {
  documentation: Documentation[];
  diagnosis: Diagnosis[];
  documents: Document[];
  tasks: Task[];
  socialInfo: SocialEntry[];
  isLoading: boolean;
  error: string | null;
}

export type HistoryType = 'documentation' | 'diagnosis' | 'documents' | 'tasks' | 'socialInfo';

export interface AddInfPayload {
  type: HistoryType;
  data: Documentation | Diagnosis | Document | Task | SocialEntry;
}