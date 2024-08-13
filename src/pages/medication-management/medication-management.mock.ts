import dayjs from 'dayjs';

export type Medication = {
   id: number;
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

export const initialMedicationData: Medication = {
   id: 0,
   name: '',
   startDate: dayjs(new Date()).toString(),
   stopDate: dayjs(new Date()).toString(),
   dosageInstructions: '',
   form: 'capsule',
   duration: '',
   frequency: '',
};

export const medicationFormOptions: Medication['form'][] = ['capsule', 'drink', 'pill', 'syrup', 'tablet'];

export const newMedicationFields: {
   label: string;
   field: keyof Medication;
   type: 'input' | 'select' | 'date';
}[] = [
   { label: 'Name', field: 'name', type: 'input' },
   { label: 'Start date', field: 'startDate', type: 'date' },
   { label: 'Stop date', field: 'stopDate', type: 'date' },
   { label: 'Dosage Instructions', field: 'dosageInstructions', type: 'input' },
   { label: 'Form', field: 'form', type: 'select' },
   { label: 'Duration', field: 'duration', type: 'input' },
   { label: 'Frequency', field: 'frequency', type: 'input' },
];
