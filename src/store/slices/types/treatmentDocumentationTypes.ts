export interface DevelopmentalHistory {
  milestonesInTime: boolean;
  crawl: string;
  satUp: string;
  stood: string;
  walked: string;
  fedSelf: string;
  toileted: string;
  dressSelf: string;
  singleWords: string;
  combinedWords: string;
}

export interface TreatmentDocumentationState {
  // General Information
  documentName: string;
  patient: string;
  dob: string;
  age: string;
  nativeLanguage: string;
  evaluationDate: string;
  duration: number;
  primaryDiagnosis: string;
  secondaryDiagnosis: string;
  doctor: string;
  
  // Treatment Information
  treatmentType: string;
  treatmentStatus: string;
  referralSource: string;
  categories: string;
  
  // History
  significantHistory: string;
  medicalHistory: string;
  medications: string;
  accident: string;
  disease: string;
  developmentalHistory: DevelopmentalHistory;
  educationalStatus: string;
  
  // Behavioral Observation
  attendingSkills: string;
  coop: string;
  awarenessOfOthers: string;
  prognosisForICF: string;
  responseRate: string;
  socialInteractions: string;
  reliabilityOfScores: string;
  levelOfActivity: string;
  communicativeIntent: string;
  awarenessOfEnvironmentalEvents: string;
}
