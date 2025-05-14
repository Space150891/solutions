export interface IPatient {
   patientId: string;
   status: IPatientStatus;
   firstName: string;
   lastName: string;
   dateOfBirth: string;
   gender: IGender;
   contactInfo: IPatientContactInfo;
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
   lastName: string;
   firstName: string;
   specialization: IDoctorSpecialization;
   doctorId: string;
   gender?: IGender;
   locations?: string[];
   description?: string;
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
