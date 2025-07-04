export interface Procedure {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  category: ProcedureCategory;
  complexity: 'Low' | 'Medium' | 'High';
  equipment?: string[];
  prerequisites?: string[];
  notes?: string;
}

export interface Medication {
  id: string;
  name: string;
  type: 'Oral' | 'Injection' | 'Topical' | 'Inhalation' | 'IV';
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  sideEffects?: string[];
  contraindications?: string[];
  notes?: string;
}

export interface FollowUpAppointment {
  id: string;
  type: AppointmentType;
  scheduledDate: string;
  duration: number; // in minutes
  provider: string;
  department: string;
  purpose: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  notes?: string;
}

export interface TreatmentPlan {
  id: string;
  patientId: string;
  patientName: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  status: 'Draft' | 'Active' | 'Completed' | 'Cancelled';
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  procedures: Procedure[];
  medications: Medication[];
  followUpAppointments: FollowUpAppointment[];
  goals: string[];
  notes?: string;
}

export enum ProcedureCategory {
  DIAGNOSTIC = 'Diagnostic',
  THERAPEUTIC = 'Therapeutic',
  PREVENTIVE = 'Preventive',
  SURGICAL = 'Surgical',
  REHABILITATION = 'Rehabilitation',
  COUNSELING = 'Counseling',
  MONITORING = 'Monitoring',
}

export enum AppointmentType {
  FOLLOW_UP = 'Follow-up',
  CONSULTATION = 'Consultation',
  ASSESSMENT = 'Assessment',
  PROCEDURE = 'Procedure',
  THERAPY = 'Therapy',
  REVIEW = 'Review',
  EMERGENCY = 'Emergency',
}

export interface TreatmentPlanningState {
  currentPlan: TreatmentPlan | null;
  plans: TreatmentPlan[];
  availableProcedures: Procedure[];
  availableMedications: Medication[];
  availableAppointments: FollowUpAppointment[];
  isLoading: boolean;
  error: string | null;
  selectedPatient: {
    id: string;
    name: string;
    dob: string;
    age: string;
  } | null;
} 