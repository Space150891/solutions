export type MedicationInventoryItem = {
   id: number;
   name: string;
   quantity: number;
   inDoctorsOffice: boolean;
   inProxies: boolean;
   prescription: string;
};

export const newMedicationInventoryItemFields: {
   label: string;
   field: keyof MedicationInventoryItem;
   type: 'input' | 'radio';
}[] = [
   { label: 'Name', field: 'name', type: 'input' },
   { label: 'Quantity', field: 'quantity', type: 'input' },
   { label: 'Prescription', field: 'prescription', type: 'input' },
   { label: 'In doctor`s office', field: 'inDoctorsOffice', type: 'radio' },
   { label: 'In proxies', field: 'inProxies', type: 'radio' },
];

export const initialMedicationInventoryItemData: MedicationInventoryItem = {
   id: 0,
   name: '',
   quantity: 0,
   inDoctorsOffice: false,
   inProxies: false,
   prescription: '',
};

export const medicationInventoryItemsMock: MedicationInventoryItem[] = [
   {
      id: 1,
      name: 'Gerbion',
      quantity: 20,
      inDoctorsOffice: true,
      inProxies: true,
      prescription: 'Not necessary',
   },
];
