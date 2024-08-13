export enum IPages {
   DASHBOARD = 'Dashboard',
   MULTISTEP_FORM = 'Multistep Form',
   PATIENT_LIST = 'Patient List',
   PATIENT_APPOINTMENT = 'Patient Appointment',
   HOSPITAL_APPOINTMENT = 'Hospital Appointment',
   PATIENT_MANAGEMENT = 'Patient Management',
   PERSONNEL_MANAGEMENT = 'Personnel Management',
   INSURANCE_INFORMATION = 'Insurance Information',
   PATIENT_DASHBOARD = 'Patient Dashboard',
   WAITING_BOARD = 'Waiting Board',
   AGENDA = 'Agenda',
   LABORATORY_ANALYSIS = 'Laboratory Analysis',
   TREATMENT_DOCUMENTATION = 'Treatment Documentation',
   MEDICATION_MANAGEMENT = 'Medication Management',
   MEDICATION_INVENTORY = 'Medication Inventory',
   TASK_MANAGEMENT = 'Task Management',
}

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
