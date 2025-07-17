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
  description?: string;
  severity?: 'low' | 'medium' | 'high';
  status?: 'active' | 'resolved' | 'chronic';
  treatingProvider?: string;
}

export interface DiagnosisCode {
  code: string;
  description: string;
  category: string;
}

export interface TreatmentDetail {
  id: string;
  diagnosisId: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  provider: string;
  status: 'planned' | 'in-progress' | 'completed' | 'discontinued';
  notes?: string;
  effectiveness?: 'poor' | 'fair' | 'good' | 'excellent';
}

export interface Document {
  title: string;
  id: string;
  url?: string;
  uploadedAt: string;
  category?: 'lab' | 'imaging' | 'referral' | 'prescription' | 'other';
  relatedDiagnosis?: string;
  relatedTreatment?: string;
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
  diagnosisCodes: DiagnosisCode[];
  treatmentDetails: TreatmentDetail[];
  documents: Document[];
  tasks: Task[];
  socialInfo: SocialEntry[];
  isLoading: boolean;
  error: string | null;
}

export type HistoryType = 'documentation' | 'diagnosis' | 'documents' | 'tasks' | 'socialInfo' | 'treatmentDetails' | 'diagnosisCodes';

export interface AddInfPayload {
  type: HistoryType;
  data: Documentation | Diagnosis | Document | Task | SocialEntry | TreatmentDetail | DiagnosisCode;
}

export interface ReportFilters {
  startDate?: string;
  endDate?: string;
  diagnosisCodes?: string[];
  treatmentStatus?: string[];
  providers?: string[];
}