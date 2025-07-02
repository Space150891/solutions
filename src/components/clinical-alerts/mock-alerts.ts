import { ClinicalAlert, DrugInteractionAlert, PreventiveCareAlert } from './types';

export const mockClinicalAlerts: ClinicalAlert[] = [
   // Drug Interaction Alerts
   {
      id: 'alert-001',
      type: 'drug-interaction',
      severity: 'high',
      title: 'Major Drug Interaction Detected',
      message: 'Warfarin and Aspirin combination may increase bleeding risk. Consider alternative therapy or adjust dosing.',
      patientId: 'patient-001',
      timestamp: new Date('2024-01-15T10:30:00'),
      isRead: false,
      isDismissed: false,
      actionRequired: true,
      relatedMedications: ['Warfarin', 'Aspirin'],
      recommendedActions: [
         'Consider alternative antiplatelet therapy',
         'Increase INR monitoring frequency',
         'Educate patient on bleeding precautions'
      ],
      source: 'system',
      interactingDrugs: {
         drug1: 'Warfarin',
         drug2: 'Aspirin',
         interactionLevel: 'major',
         mechanism: 'Additive anticoagulant effect',
         clinicalEffect: 'Increased bleeding risk'
      }
   } as DrugInteractionAlert,
   
   {
      id: 'alert-002',
      type: 'drug-interaction',
      severity: 'medium',
      title: 'Moderate Drug Interaction',
      message: 'Simvastatin and Amlodipine may increase risk of myopathy. Monitor for muscle pain.',
      patientId: 'patient-001',
      timestamp: new Date('2024-01-15T09:15:00'),
      isRead: true,
      isDismissed: false,
      actionRequired: false,
      relatedMedications: ['Simvastatin', 'Amlodipine'],
      recommendedActions: [
         'Monitor for muscle pain or weakness',
         'Consider dose reduction of simvastatin'
      ],
      source: 'system',
      interactingDrugs: {
         drug1: 'Simvastatin',
         drug2: 'Amlodipine',
         interactionLevel: 'moderate',
         mechanism: 'CYP3A4 inhibition',
         clinicalEffect: 'Increased statin levels'
      }
   } as DrugInteractionAlert,

   // Preventive Care Alerts
   {
      id: 'alert-003',
      type: 'preventive-care',
      severity: 'medium',
      title: 'Mammography Screening Due',
      message: 'Patient is due for annual mammography screening. Last screening was 13 months ago.',
      patientId: 'patient-001',
      timestamp: new Date('2024-01-14T14:20:00'),
      isRead: false,
      isDismissed: false,
      actionRequired: true,
      recommendedActions: [
         'Schedule mammography appointment',
         'Discuss screening benefits and risks',
         'Update preventive care tracking'
      ],
      source: 'system',
      careType: 'screening',
      dueDate: new Date('2024-01-20T00:00:00'),
      lastPerformed: new Date('2022-12-10T00:00:00'),
      frequency: 'Annual',
      ageGroup: '50-74 years',
      riskFactors: ['Family history of breast cancer']
   } as PreventiveCareAlert,

   {
      id: 'alert-004',
      type: 'preventive-care',
      severity: 'high',
      title: 'Flu Vaccination Overdue',
      message: 'Patient has not received current year flu vaccination. Recommend immediate vaccination.',
      patientId: 'patient-001',
      timestamp: new Date('2024-01-13T11:45:00'),
      isRead: false,
      isDismissed: false,
      actionRequired: true,
      recommendedActions: [
         'Administer flu vaccine today',
         'Check for contraindications',
         'Update immunization record'
      ],
      source: 'system',
      careType: 'vaccination',
      dueDate: new Date('2023-10-01T00:00:00'),
      frequency: 'Annual',
      ageGroup: 'All adults',
      riskFactors: ['Chronic conditions']
   } as PreventiveCareAlert,

   // Allergy Alerts
   {
      id: 'alert-005',
      type: 'allergy',
      severity: 'critical',
      title: 'Penicillin Allergy Alert',
      message: 'Patient has documented severe penicillin allergy. Amoxicillin prescribed - contraindicated!',
      patientId: 'patient-001',
      timestamp: new Date('2024-01-15T16:22:00'),
      isRead: false,
      isDismissed: false,
      actionRequired: true,
      relatedMedications: ['Amoxicillin', 'Penicillin'],
      relatedConditions: ['Penicillin Allergy'],
      recommendedActions: [
         'STOP amoxicillin immediately',
         'Select alternative antibiotic',
         'Verify allergy documentation'
      ],
      source: 'system'
   },

   // Vital Signs Alerts
   {
      id: 'alert-006',
      type: 'vital-signs',
      severity: 'high',
      title: 'Hypertensive Crisis',
      message: 'Blood pressure 185/110 mmHg exceeds critical threshold. Immediate intervention required.',
      patientId: 'patient-001',
      timestamp: new Date('2024-01-15T15:10:00'),
      isRead: true,
      isDismissed: false,
      actionRequired: true,
      recommendedActions: [
         'Recheck BP in 5 minutes',
         'Consider IV antihypertensive',
         'Assess for end-organ damage',
         'Notify attending physician'
      ],
      source: 'system'
   },

   // Lab Result Alerts
   {
      id: 'alert-007',
      type: 'lab-result',
      severity: 'medium',
      title: 'Elevated Creatinine',
      message: 'Serum creatinine 2.1 mg/dL (baseline 1.2). Possible acute kidney injury.',
      patientId: 'patient-001',
      timestamp: new Date('2024-01-15T12:30:00'),
      isRead: false,
      isDismissed: false,
      actionRequired: true,
      recommendedActions: [
         'Review nephrotoxic medications',
         'Check urine output',
         'Consider nephrology consult',
         'Adjust medication doses'
      ],
      source: 'system'
   },

   // Medication Reminder Alerts
   {
      id: 'alert-008',
      type: 'medication-reminder',
      severity: 'low',
      title: 'Medication Adherence Check',
      message: 'Patient missed last 2 doses of Metformin. Follow up on adherence barriers.',
      patientId: 'patient-001',
      timestamp: new Date('2024-01-15T08:00:00'),
      isRead: false,
      isDismissed: false,
      actionRequired: false,
      relatedMedications: ['Metformin'],
      recommendedActions: [
         'Discuss adherence barriers',
         'Review dosing schedule',
         'Consider medication synchronization'
      ],
      source: 'system'
   }
];

export const getAlertsByPatient = (patientId: string): ClinicalAlert[] => {
   return mockClinicalAlerts.filter(alert => alert.patientId === patientId);
};

export const getActiveAlerts = (alerts: ClinicalAlert[]): ClinicalAlert[] => {
   return alerts.filter(alert => !alert.isDismissed);
};

export const getUnreadAlerts = (alerts: ClinicalAlert[]): ClinicalAlert[] => {
   return alerts.filter(alert => !alert.isRead && !alert.isDismissed);
};

export const getAlertsBySeverity = (alerts: ClinicalAlert[], severity: ClinicalAlert['severity']): ClinicalAlert[] => {
   return alerts.filter(alert => alert.severity === severity);
};

export const getCriticalAlerts = (alerts: ClinicalAlert[]): ClinicalAlert[] => {
   return getAlertsBySeverity(alerts, 'critical');
}; 