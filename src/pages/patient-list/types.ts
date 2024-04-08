export interface IPatient {
   id: number;
   status: IPatientStatus;
   firstName: string;
   lastName: string;
   dateBirth: string;
   gender: IPatientGender;
   contactInfo: IPatientContactInfo;
   doctor: IPatientDoctor;
   history?: string;
}

type IPatientStatus = 'ill' | 'wealth' | 'examination';
type IPatientGender = 'male' | 'female';
type IPatientContactInfo = {
   mobile: string;
   city: string;
   address: string;
};
type IPatientDoctor = {
   name: string;
   specialization: IDoctorSpecialization;
};

type IDoctorSpecialization = 'surgeon' | 'therapist' | 'psychiatrist' | 'cardiologist';
