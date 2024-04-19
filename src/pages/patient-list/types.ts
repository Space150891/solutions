export interface IPatient {
   patient_id: string;
   status: IPatientStatus;
   first_name: string;
   last_name: string;
   date_of_birth: string;
   gender: IPatientGender;
   contact_info: IPatientContactInfo;
   doctor: IPatientDoctor;
   email: string;
}

type IPatientStatus = 'ill' | 'wealth' | 'examination';
type IPatientGender = 'Male' | 'Female';
type IPatientContactInfo = {
   mobile: string;
   city: string;
   address: string;
};
type IPatientDoctor = {
   last_name: string;
   first_name: string;
   specialization: IDoctorSpecialization;
   doctor_id: string;
};

type IDoctorSpecialization =
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
