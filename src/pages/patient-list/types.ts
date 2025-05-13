export interface IPatient {
   patient_id: string;
   status: IPatientStatus;
   first_name: string;
   last_name: string;
   date_of_birth: string;
   gender: IGender;
   contact_info: IPatientContactInfo;
   doctor: IPatientDoctor;
   email: string;
}

export type IPatientStatus = 'ill' | 'wealth' | 'examination';
export type IGender = 'Male' | 'Female';
export type IPatientContactInfo = {
   mobile: string;
   city: string;
   address: string;
};
export type IPatientDoctor = {
   last_name: string;
   first_name: string;
   specialization: IDoctorSpecialization;
   doctor_id: string;
   gender?: IGender;
   locations?: string[];
   description?: string; // Added description field for doctor details
};

export type IDoctorSpecialization =
   | 'Cardiology'
   | 'Dermatology'
   | 'Neurology'
   | 'Pediatrics'
   | 'Oncology'
   | 'Orthopedics'
   | 'Psychiatry'
   | 'Urology'
   | 'Gastroenterology'
   | 'Endocrinology';
