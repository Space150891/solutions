export type Medication = {
   id: number | string;
   name: string;
   startDate: string;
   stopDate: string;
   dosageInstructions: string;
   form: 'pill' | 'tablet' | 'capsule' | 'drink' | 'syrup';
   frequency: string;
   duration: string;
};

export const medicationManagementMock: Medication[] = [
   {
      id: 1,
      name: 'Gerbion',
      startDate: '2010-07-29T02:11:46Z',
      stopDate: '2010-08-29T02:11:46Z',
      dosageInstructions: 'icelandic moss: 6 mg/ml',
      form: 'syrup',
      frequency: '1 time per day',
      duration: '30 mins',
   },
];
