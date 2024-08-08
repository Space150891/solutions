import { useState } from 'react';
import { Medication, medicationManagementMock } from './medication-management.mock';

export const useMedicationManagementLogic = () => {
   const [isShownModal, setIsShownModal] = useState(false);
   const [rows, setRows] = useState(medicationManagementMock);
   const [searchKeyword, setSearchKeyword] = useState('');

   const filteredList = rows.filter((med) => med.name.toLowerCase().includes(searchKeyword.toLowerCase()));

   const handleCloseModal = () => {
      setIsShownModal(false);
   };

   const handleAddMedication = (newMed: Medication) => {
      setRows((prev) => {
         const copy: Medication[] = structuredClone(prev);

         const highestId = copy.reduce((prevMedId, medication) => {
            return medication.id > prevMedId ? medication.id : prevMedId;
         }, 0);

         const newMedication = {
            ...newMed,
            id: highestId + 1,
         };

         copy.push(newMedication);

         return copy;
      });
   };

   return {
      data: { filteredList },
      state: { isShownModal, rows, searchKeyword },
      setState: { setIsShownModal, setRows, setSearchKeyword },
      handlers: { handleCloseModal, handleAddMedication },
   };
};
