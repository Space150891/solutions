interface PatientIllnessHistory {
   id: string;
   illnessName: string;
   description: string;
   date: string;
}

interface AppointmentHistory {
   id: string;
   date: string;
   doctorName: string;
   reason: string;
   prescription: string;
}

export const patientIllnessHistory: PatientIllnessHistory[] = [
   {
      id: '1',
      illnessName: 'Flu',
      description: 'Patient had symptoms of fever, cough, and body aches.',
      date: '2022-01-15',
   },
   {
      id: '2',
      illnessName: 'Asthma',
      description: 'Patient experienced shortness of breath and wheezing.',
      date: '2021-11-20',
   },
   {
      id: '3',
      illnessName: 'Sprained Ankle',
      description: 'Patient sprained their ankle during a hiking trip.',
      date: '2022-02-10',
   },
   {
      id: '4',
      illnessName: 'Appendicitis',
      description: 'Patient underwent surgery for appendicitis.',
      date: '2021-09-05',
   },
   {
      id: '5',
      illnessName: 'Appendicitis',
      description: 'Patient underwent consultation for appendicitis surgery.',
      date: '2021-09-03',
   },
];

export const appointmentHistory: AppointmentHistory[] = [
   {
      id: '1',
      date: '2023-04-05',
      doctorName: 'Dr. Jane Smith',
      reason: 'Annual Check-up',
      prescription: 'None',
   },
   {
      id: '2',
      date: '2023-03-15',
      doctorName: 'Dr. John Doe',
      reason: 'Flu Symptoms',
      prescription: 'Antiviral medication',
   },
   {
      id: '3',
      date: '2023-02-20',
      doctorName: 'Dr. Emily Brown',
      reason: 'Sprained Ankle',
      prescription: 'Pain relievers and rest',
   },
   {
      id: '4',
      date: '2023-01-10',
      doctorName: 'Dr. Michael Johnson',
      reason: 'Asthma Follow-up',
      prescription: 'Inhaler',
   },
];
