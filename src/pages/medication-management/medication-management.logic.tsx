import { useState } from 'react';

export const useMedicationManagementLogic = () => {
   const [isShownModal, setIsShownModal] = useState(false);

   const handleCloseModal = () => {
      setIsShownModal(false);
   };

   return {
      data: {},
      state: { isShownModal },
      setState: { setIsShownModal },
      handlers: { handleCloseModal },
   };
};
