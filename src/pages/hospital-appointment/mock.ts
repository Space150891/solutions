export type IEvent = {
   event_id: number | string;
   title: string;
   start: Date;
   end: Date;
   location?: any;
   phone_number?: any;
   first_name?: any;
   last_name?: any;
   addition_info?: any;
};
import { IPatientDoctor } from '../patient-list/types';

export const doctors: IPatientDoctor[] = [
   {
      doctor_id: '01HW8E2PWARXRECVEHF8Q1B0XE',
      first_name: 'Marlane',
      last_name: 'Goady',
      gender: 'Female',
      specialization: 'Neurology',
      locations: ['Fulton'],
   },
   {
      doctor_id: '01HW8E2PWCH3QAWJ62CAQHBCYA',
      first_name: 'Yoshiko',
      last_name: 'Veazey',
      gender: 'Female',
      specialization: 'Dermatology',
      locations: ['Reindahl', 'Aberg'],
   },
   {
      doctor_id: '01HW8E2PWEG7TKYJYCW74QP0FK',
      first_name: 'Erinn',
      last_name: 'Lorentz',
      gender: 'Female',
      specialization: 'Cardiology',
      locations: ['Division', 'Lawn'],
   },
   {
      doctor_id: '01HW8E2PWF5EV386TY156WEGHR',
      first_name: 'Burtie',
      last_name: 'Gallelli',
      gender: 'Male',
      specialization: 'Endocrinology',
      locations: ['Homewood', 'Luster', 'Raven'],
   },
   {
      doctor_id: '01HW8E2PWG0NW81YCWDR7CY02A',
      first_name: 'Reginauld',
      last_name: 'Troake',
      gender: 'Male',
      specialization: 'Neurology',
      locations: ['Ludington', 'Butternut'],
   },
   {
      doctor_id: '01HW8E2PWHSM7CJ2QCZ7Q4WPV7',
      first_name: 'Mallory',
      last_name: 'Boote',
      gender: 'Male',
      specialization: 'Psychiatry',
      locations: ['Aberg', 'Jenna'],
   },
   {
      doctor_id: '01HW8E2PWJWBWHT1H7H5TWVT1V',
      first_name: 'Mose',
      last_name: 'Pesticcio',
      gender: 'Male',
      specialization: 'Gastroenterology',
      locations: ['Maple', 'Arkansas', 'Stoughton'],
   },
   {
      doctor_id: '01HW8E2PWKVR5ANHYXRGP1DT26',
      first_name: 'Brooks',
      last_name: 'Crickmoor',
      gender: 'Male',
      specialization: 'Psychiatry',
      locations: ['Namekagon'],
   },
   {
      doctor_id: '01HW8E2PWK0X1N3H16GWBFQGW0',
      first_name: 'Deana',
      last_name: 'Dunster',
      gender: 'Female',
      specialization: 'Psychiatry',
      locations: ['Melrose', 'Rigney', 'Bultman'],
   },
   {
      doctor_id: '01HW8E2PWNBTA72XP8BMKBTRC4',
      first_name: 'Reid',
      last_name: 'Dussy',
      gender: 'Male',
      specialization: 'Gastroenterology',
      locations: ['Elgar', 'Warner'],
   },
   {
      doctor_id: '01HW8E2PWNCF8T1A0XQ6W80SBB',
      first_name: 'Walton',
      last_name: 'Lightowler',
      gender: 'Male',
      specialization: 'Cardiology',
      locations: ['Butterfield', 'Northland', 'Ruskin'],
   },
   {
      doctor_id: '01HW8E2PWPMH9KKP01SXX0XHR8',
      first_name: 'Rudolph',
      last_name: 'Carrell',
      gender: 'Male',
      specialization: 'Endocrinology',
      locations: ['Sunbrook', 'Pawling', 'Oak'],
   },
   {
      doctor_id: '01HW8E2PWQF3NX6KFNH2SFK3SK',
      first_name: 'Dusty',
      last_name: 'Songest',
      gender: 'Female',
      specialization: 'Neurology',
      locations: ['Northview', 'Clemons', 'Dexter'],
   },
   {
      doctor_id: '01HW8E2PWQDR4SWX9CVBKN3Y9J',
      first_name: 'Siusan',
      last_name: 'Pristnor',
      gender: 'Female',
      specialization: 'Orthopedics',
      locations: ['Chinook', 'Kedzie'],
   },
   {
      doctor_id: '01HW8E2PWR5WQGYGHA03B94RT2',
      first_name: 'Darya',
      last_name: 'Carrol',
      gender: 'Female',
      specialization: 'Oncology',
      locations: ['1st', 'Gerald', '2nd'],
   },
];

export const MOCK_EVENTS: IEvent[] = [
   {
      event_id: 1,
      title: 'Event 1',
      start: new Date('2024/5/2 09:30'),
      end: new Date('2024/5/2 10:30'),
   },
   {
      event_id: 2,
      title: 'Event 2',
      start: new Date('2024/5/4 10:00'),
      end: new Date('2024/5/4 11:00'),
   },
];
