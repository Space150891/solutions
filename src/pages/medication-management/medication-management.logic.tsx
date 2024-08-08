import { useState } from 'react';
import { Medication, medicationManagementMock } from './medication-management.mock';
import { medicationManagementColumnsConfig } from './medication-management.columns';

export const useMedicationManagementLogic = () => {
   const [isShownModal, setIsShownModal] = useState(false);
   const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
   const [rows, setRows] = useState(medicationManagementMock);
   const [searchKeyword, setSearchKeyword] = useState('');

   const filteredList = rows.filter((med) => med.name.toLowerCase().includes(searchKeyword.toLowerCase()));
   const isOpenModal = isShownModal || !!selectedMedication;
   const columns = medicationManagementColumnsConfig(setSelectedMedication);

   const handleCloseModal = () => {
      setIsShownModal(false);
      setSelectedMedication(null);
   };

   const handleCreateMedication = (newMed: Medication) => {
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

   const handleEditMedication = (medication: Medication) => {
      setRows((prev) => {
         const copy: Medication[] = structuredClone(prev);
         const index = copy.findIndex((med) => med.id === medication.id);

         copy[index] = medication;

         return copy;
      });
   };

   return {
      data: { filteredList, isOpenModal, columns },
      state: { isShownModal, rows, searchKeyword, selectedMedication },
      setState: { setIsShownModal, setRows, setSearchKeyword },
      handlers: { handleCloseModal, handleCreateMedication, handleEditMedication },
   };
};
