import { useState } from 'react';
import { medicationInventoryColumnsConfig } from './medication-inventory.columns';
import { medicationInventoryMock } from './medication-inventory.mock';

export const useMedicationInventoryLogic = () => {
   const [rows, setRows] = useState(medicationInventoryMock);
   const [searchKeyword, setSearchKeyword] = useState('');

   const filteredList = rows.filter((med) => med.name.toLowerCase().includes(searchKeyword.toLowerCase()));

   const columns = medicationInventoryColumnsConfig();

   return {
      data: { columns, filteredList },
      state: { rows, searchKeyword },
      setState: { setRows, setSearchKeyword },
      handlers: {},
   };
};
