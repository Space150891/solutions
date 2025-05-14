import { Alert } from "./components/types";

// Patient data
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  room: string;
  bloodType: string;
  condition: 'Stable' | 'Critical' | 'Serious' | 'Fair';
  doctorAssigned: string;
  admissionDate: string;
}

export const patients: Patient[] = [
  {
    id: '1',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    room: '302-A',
    bloodType: 'O+',
    condition: 'Stable',
    doctorAssigned: 'Dr. Sarah Williams',
    admissionDate: '2025-04-28'
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    age: 62,
    gender: 'Female',
    room: '305-B',
    bloodType: 'A-',
    condition: 'Critical',
    doctorAssigned: 'Dr. James Chen',
    admissionDate: '2025-05-01'
  },
  {
    id: '3',
    name: 'Robert Johnson',
    age: 53,
    gender: 'Male',
    room: '201-C',
    bloodType: 'AB+',
    condition: 'Serious',
    doctorAssigned: 'Dr. Emily Parker',
    admissionDate: '2025-04-30'
  },
  {
    id: '4',
    name: 'Emma Thompson',
    age: 28,
    gender: 'Female',
    room: '410-A',
    bloodType: 'B+',
    condition: 'Fair',
    doctorAssigned: 'Dr. Michael Lee',
    admissionDate: '2025-05-05'
  }
];

// Generate historical vital signs data (for charts)
export interface VitalReading {
  timestamp: string;
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  temperature: number;
  respiratoryRate: number;
  oxygenSaturation: number;
}

// Helper function to generate time-series data
const generateTimeSeriesData = (hours: number, baseValue: number, fluctuation: number) => {
  const now = new Date();
  const data: { timestamp: string; value: number }[] = [];
  
  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000).toISOString();
    const value = baseValue + (Math.random() * fluctuation * 2) - fluctuation;
    data.push({ timestamp, value: Number(value.toFixed(1)) });
  }
  
  return data;
};

// Generate mock vital signs time series for patients
export const generatePatientVitals = (patientId: string) => {
  // Base values depend on patient condition
  const patient = patients.find(p => p.id === patientId);
  const multiplier = patient?.condition === 'Critical' ? 1.2 : 
                     patient?.condition === 'Serious' ? 1.1 : 1;
  
  // Generate 24 hours of data
  const hours = 24;
  
  return {
    heartRate: generateTimeSeriesData(hours, 75 * multiplier, 12),
    bloodPressureSystolic: generateTimeSeriesData(hours, 120 * multiplier, 15),
    bloodPressureDiastolic: generateTimeSeriesData(hours, 80 * multiplier, 10),
    temperature: generateTimeSeriesData(hours, 37 * multiplier, 0.8),
    respiratoryRate: generateTimeSeriesData(hours, 16 * multiplier, 4),
    oxygenSaturation: generateTimeSeriesData(hours, 98 / multiplier, 3),
  };
};

// Current vitals data (for real-time display)
export const getCurrentVitals = (patientId: string) => {
  const patient = patients.find(p => p.id === patientId);
  const multiplier = patient?.condition === 'Critical' ? 1.2 : 
                     patient?.condition === 'Serious' ? 1.1 : 1;
  
  // Add slight randomness to make it look real-time
  return {
    heartRate: Math.round(75 * multiplier + (Math.random() * 8 - 4)),
    bloodPressureSystolic: Math.round(120 * multiplier + (Math.random() * 10 - 5)),
    bloodPressureDiastolic: Math.round(80 * multiplier + (Math.random() * 6 - 3)),
    temperature: Number((37 * multiplier + (Math.random() * 0.6 - 0.3)).toFixed(1)),
    respiratoryRate: Math.round(16 * multiplier + (Math.random() * 3 - 1.5)),
    oxygenSaturation: Math.round(Math.min(99, 98 / multiplier + (Math.random() * 2 - 1))),
  };
};
export const vitalThresholds = {
  heartRate: { low: 60, high: 100 },
  bloodPressureSystolic: { low: 90, high: 140 },
  bloodPressureDiastolic: { low: 60, high: 90 },
  temperature: { low: 36, high: 38 },
  respiratoryRate: { low: 12, high: 20 },
  oxygenSaturation: { low: 95, high: 100 },
};

// Generate alerts based on current vitals
export const generateAlerts = (patientId: string) => {
  const vitals = getCurrentVitals(patientId);
  const alerts: Alert[] = [];
  
  if (vitals.heartRate < vitalThresholds.heartRate.low || vitals.heartRate > vitalThresholds.heartRate.high) {
    alerts.push({
      type: 'Heart Rate',
      value: vitals.heartRate,
      message: `Abnormal heart rate: ${vitals.heartRate} bpm`,
      severity: vitals.heartRate > vitalThresholds.heartRate.high + 20 || vitals.heartRate < vitalThresholds.heartRate.low - 10 ? 'high' : 'medium'
    });
  }
  
  if (vitals.bloodPressureSystolic < vitalThresholds.bloodPressureSystolic.low || vitals.bloodPressureSystolic > vitalThresholds.bloodPressureSystolic.high) {
    alerts.push({
      type: 'Blood Pressure',
      value: `${vitals.bloodPressureSystolic}/${vitals.bloodPressureDiastolic}`,
      message: `Abnormal blood pressure: ${vitals.bloodPressureSystolic}/${vitals.bloodPressureDiastolic} mmHg`,
      severity: vitals.bloodPressureSystolic > vitalThresholds.bloodPressureSystolic.high + 20 ? 'high' : 'medium'
    });
  }
  
  if (vitals.temperature < vitalThresholds.temperature.low || vitals.temperature > vitalThresholds.temperature.high) {
    alerts.push({
      type: 'Temperature',
      value: vitals.temperature,
      message: `Abnormal temperature: ${vitals.temperature}°C`,
      severity: vitals.temperature > vitalThresholds.temperature.high + 1 ? 'high' : 'medium'
    });
  }
  
  if (vitals.oxygenSaturation < vitalThresholds.oxygenSaturation.low) {
    alerts.push({
      type: 'Oxygen Saturation',
      value: vitals.oxygenSaturation,
      message: `Low oxygen saturation: ${vitals.oxygenSaturation}%`,
      severity: vitals.oxygenSaturation < 90 ? 'high' : 'medium'
    });
  }
  
  return alerts;
};
