export interface ClinicalAlert {
   id: string;
   type: 'drug-interaction' | 'preventive-care' | 'allergy' | 'vital-signs' | 'lab-result' | 'medication-reminder';
   severity: 'low' | 'medium' | 'high' | 'critical';
   title: string;
   message: string;
   patientId?: string;
   timestamp: Date;
   isRead: boolean;
   isDismissed: boolean;
   actionRequired: boolean;
   relatedMedications?: string[];
   relatedConditions?: string[];
   recommendedActions?: string[];
   source: 'system' | 'provider' | 'external';
}

export interface DrugInteractionAlert extends ClinicalAlert {
   type: 'drug-interaction';
   interactingDrugs: {
      drug1: string;
      drug2: string;
      interactionLevel: 'minor' | 'moderate' | 'major' | 'contraindicated';
      mechanism: string;
      clinicalEffect: string;
   };
}

export interface PreventiveCareAlert extends ClinicalAlert {
   type: 'preventive-care';
   careType: 'screening' | 'vaccination' | 'follow-up' | 'lifestyle';
   dueDate: Date;
   lastPerformed?: Date;
   frequency: string;
   ageGroup?: string;
   riskFactors?: string[];
}

export interface ClinicalAlertsProps {
   patientId?: string;
   showOnlyActive?: boolean;
   maxAlerts?: number;
   alertTypes?: ClinicalAlert['type'][];
   onAlertAction?: (alertId: string, action: 'dismiss' | 'acknowledge' | 'snooze') => void;
}

export interface AlertSummaryProps {
   alerts: ClinicalAlert[];
   compact?: boolean;
} 