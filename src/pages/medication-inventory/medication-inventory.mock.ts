export type MedicationInventory = {
   id: number;
   name: string;
   quantity: number;
   inDoctorsOffice: boolean;
   inProxies: boolean;
   prescription: string;
};

export const medicationInventoryMock: MedicationInventory[] = [
   {
      id: 1,
      name: 'Gerbion',
      quantity: 20,
      inDoctorsOffice: true,
      inProxies: true,
      prescription: 'Not necessary',
   },
];
