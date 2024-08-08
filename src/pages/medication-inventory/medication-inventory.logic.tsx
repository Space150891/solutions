import { useState } from 'react';
import { medicationInventoryColumnsConfig } from './medication-inventory.columns';
import { MedicationInventoryItem, medicationInventoryItemsMock } from './medication-inventory.mock';

export const useMedicationInventoryLogic = () => {
   const [isShownModal, setIsShownModal] = useState(false);
   const [selectedItem, setSelectedItem] = useState<MedicationInventoryItem | null>(null);
   const [rows, setRows] = useState(medicationInventoryItemsMock);
   const [searchKeyword, setSearchKeyword] = useState('');

   const filteredList = rows.filter((med) => med.name.toLowerCase().includes(searchKeyword.toLowerCase()));
   const isOpenModal = isShownModal || !!selectedItem;
   const columns = medicationInventoryColumnsConfig(setSelectedItem);

   const handleCloseModal = () => {
      setIsShownModal(false);
      setSelectedItem(null);
   };

   const handleAddItem = (item: MedicationInventoryItem) => {
      setRows((prev) => {
         const copy: MedicationInventoryItem[] = structuredClone(prev);

         const highestId = copy.reduce((prevMedId, medication) => {
            return medication.id > prevMedId ? medication.id : prevMedId;
         }, 0);

         const newItem = {
            ...item,
            id: highestId + 1,
         };

         copy.push(newItem);

         return copy;
      });
   };

   const handleEditItem = (item: MedicationInventoryItem) => {
      setRows((prev) => {
         const copy: MedicationInventoryItem[] = structuredClone(prev);
         const index = copy.findIndex((med) => med.id === item.id);

         copy[index] = item;

         return copy;
      });
   };

   return {
      data: { columns, filteredList, isOpenModal },
      state: { rows, searchKeyword, isShownModal, selectedItem },
      setState: { setRows, setSearchKeyword, setIsShownModal },
      handlers: { handleCloseModal, handleAddItem, handleEditItem },
   };
};
