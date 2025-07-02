import { v4 as uuidv4 } from 'uuid';

// Define the types for our treatment planning components
export interface TreatmentItem {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  cost: number;
  category: 'procedure' | 'medication' | 'followUp';
  color?: string;
}

export interface TreatmentPhase {
  id: string;
  title: string;
  description: string;
  items: TreatmentItem[];
  order: number;
}

export interface TreatmentPlan {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  phases: TreatmentPhase[];
}

// Define mock data for available treatment procedures
export const availableProcedures: TreatmentItem[] = [
  {
    id: uuidv4(),
    title: 'Initial Consultation',
    description: 'Detailed medical history review and initial assessment',
    duration: 60,
    cost: 120,
    category: 'procedure',
    color: '#4caf50', // green
  },
  {
    id: uuidv4(),
    title: 'Diagnostic Imaging',
    description: 'X-ray, MRI or other imaging procedures',
    duration: 45,
    cost: 250,
    category: 'procedure',
    color: '#2196f3', // blue
  },
  {
    id: uuidv4(),
    title: 'Blood Test Panel',
    description: 'Comprehensive blood testing',
    duration: 20,
    cost: 80,
    category: 'procedure',
    color: '#f44336', // red
  },
  {
    id: uuidv4(),
    title: 'Physical Therapy Session',
    description: 'Guided physical therapy with specialist',
    duration: 60,
    cost: 90,
    category: 'procedure',
    color: '#ff9800', // orange
  },
  {
    id: uuidv4(),
    title: 'Minor Surgery',
    description: 'Minor invasive procedure',
    duration: 120,
    cost: 750,
    category: 'procedure',
    color: '#9c27b0', // purple
  }
];

// Mock data for available medications
export const availableMedications: TreatmentItem[] = [
  {
    id: uuidv4(),
    title: 'Amoxicillin',
    description: 'Antibiotic - 500mg, 3 times daily for 10 days',
    duration: 10 * 24 * 60, // 10 days in minutes
    cost: 25,
    category: 'medication',
    color: '#00bcd4', // cyan
  },
  {
    id: uuidv4(),
    title: 'Ibuprofen',
    description: 'Anti-inflammatory - 400mg, as needed for pain',
    duration: 30 * 24 * 60, // 30 days in minutes
    cost: 12,
    category: 'medication',
    color: '#cddc39', // lime
  },
  {
    id: uuidv4(),
    title: 'Lisinopril',
    description: 'Blood pressure medication - 10mg, once daily',
    duration: 90 * 24 * 60, // 90 days in minutes
    cost: 30,
    category: 'medication',
    color: '#673ab7', // deep purple
  },
  {
    id: uuidv4(),
    title: 'Metformin',
    description: 'Diabetes medication - 500mg, twice daily',
    duration: 30 * 24 * 60, // 30 days in minutes
    cost: 15,
    category: 'medication',
    color: '#ff5722', // deep orange
  }
];

// Mock data for follow-up appointments
export const availableFollowUps: TreatmentItem[] = [
  {
    id: uuidv4(),
    title: 'Check-up Appointment',
    description: 'Standard follow-up to review progress',
    duration: 30,
    cost: 60,
    category: 'followUp',
    color: '#795548', // brown
  },
  {
    id: uuidv4(),
    title: 'Specialist Consultation',
    description: 'Referral to specialist for focused care',
    duration: 45,
    cost: 150,
    category: 'followUp',
    color: '#607d8b', // blue grey
  },
  {
    id: uuidv4(),
    title: 'Diagnostic Review',
    description: 'Review of lab work and diagnostic results',
    duration: 20,
    cost: 80,
    category: 'followUp',
    color: '#8bc34a', // light green
  }
];

// Sample treatment plan structure
export const sampleTreatmentPlan: TreatmentPlan = {
  id: uuidv4(),
  patientId: '12345',
  patientName: 'John Doe',
  doctorId: '54321',
  doctorName: 'Dr. Sarah Smith',
  title: 'Hypertension Management Plan',
  description: 'Comprehensive approach to manage blood pressure and reduce risks',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  phases: [
    {
      id: uuidv4(),
      title: 'Initial Assessment',
      description: 'First phase assessment and preliminary treatment',
      order: 1,
      items: [
        availableProcedures[0], // Initial Consultation
        availableProcedures[2], // Blood Test Panel
      ]
    },
    {
      id: uuidv4(),
      title: 'Treatment Phase',
      description: 'Active treatment and medication regime',
      order: 2,
      items: [
        availableMedications[2], // Lisinopril
        availableFollowUps[0], // Check-up Appointment
      ]
    },
    {
      id: uuidv4(),
      title: 'Monitoring Phase',
      description: 'Long-term monitoring and adjustments',
      order: 3, 
      items: [
        availableFollowUps[2], // Diagnostic Review
      ]
    }
  ]
};

// Combined collection of all available treatment items
export const allTreatmentItems: TreatmentItem[] = [
  ...availableProcedures,
  ...availableMedications,
  ...availableFollowUps
];

// Sample patients for the selector
export const samplePatients = [
  { id: '12345', name: 'John Doe', age: 45, condition: 'Hypertension' },
  { id: '23456', name: 'Sarah Johnson', age: 32, condition: 'Diabetes Type 2' },
  { id: '34567', name: 'Robert Brown', age: 58, condition: 'Arthritis' },
  { id: '45678', name: 'Emily Davis', age: 27, condition: 'Asthma' },
  { id: '56789', name: 'Michael Wilson', age: 41, condition: 'Back Pain' }
];

// Sample doctors for the selector
export const sampleDoctors = [
  { id: '54321', name: 'Dr. Sarah Smith', specialty: 'Cardiology' },
  { id: '65432', name: 'Dr. James Johnson', specialty: 'Internal Medicine' },
  { id: '76543', name: 'Dr. David Chen', specialty: 'Orthopedics' },
  { id: '87654', name: 'Dr. Maria Rodriguez', specialty: 'Neurology' },
  { id: '98765', name: 'Dr. Thomas White', specialty: 'Family Medicine' }
];

// Function to generate a new empty treatment plan
export const createEmptyTreatmentPlan = (
  patientId: string, 
  patientName: string,
  doctorId: string,
  doctorName: string
): TreatmentPlan => {
  return {
    id: uuidv4(),
    patientId,
    patientName,
    doctorId,
    doctorName,
    title: 'New Treatment Plan',
    description: 'Treatment plan description',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    phases: [
      {
        id: uuidv4(),
        title: 'Initial Phase',
        description: 'First phase of treatment',
        order: 1,
        items: []
      }
    ]
  };
};
