export interface InsuranceInfo {
  id: string;
  provider: string;
  policyNumber: string;
  coverageType: string;
  startDate: string;
  endDate: string;
  contactPerson: string;
  contactPhone: string;
  coverageDetails: string;
  isActive: boolean;
}

export interface Case {
  id: string;
  patientId: string;
  patientName: string;
  caseNumber: string;
  title: string;
  description: string;
  status: 'active' | 'closed' | 'pending' | 'archived';
  createdAt: string;
  updatedAt: string;
  insuranceId: string | null;
  insuranceInfo: InsuranceInfo | null;
  assignedDoctorId: string | null;
  assignedDoctorName: string | null;
  notes: string;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    url: string;
  }>;
}

export interface CaseManagementState {
  cases: Case[];
  currentCase: Case | null;
  insurances: InsuranceInfo[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  filterBy: {
    status: string | null;
    patientId: string | null;
    insuranceId: string | null;
  };
} 