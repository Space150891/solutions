import { type IPatient } from './types';

export const patients: IPatient[] = [
   {
      id: 1,
      status: 'wealth',
      firstName: 'Maxim',
      lastName: 'Pavlichenko',
      dateBirth: '12.05.85',
      gender: 'male',
      contactInfo: {
         mobile: '0987',
         city: 'Kyiv',
         address: 'Maxims address',
      },
      doctor: {
         name: 'Kaspersky',
         specialization: 'surgeon',
      },
      history: '',
   },
];
