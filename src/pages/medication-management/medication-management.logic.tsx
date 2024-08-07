import { useState } from 'react';
import { Medication, medicationManagementMock } from './medication-management.mock';

export const useMedicationManagementLogic = () => {
   const [isShownModal, setIsShownModal] = useState(false);
   const [rows, setRows] = useState(medicationManagementMock);

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
      data: {},
      state: { isShownModal, rows },
      setState: { setIsShownModal, setRows },
      handlers: { handleCloseModal, handleAddMedication },
   };
};
