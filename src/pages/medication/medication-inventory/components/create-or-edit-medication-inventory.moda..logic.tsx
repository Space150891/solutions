import { Checkbox, FormControlLabel, ModalProps, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

import {
   initialMedicationInventoryItemData,
   MedicationInventoryItem,
   newMedicationInventoryItemFields,
} from '../medication-inventory.mock';

type Props = Omit<ModalProps, 'children'> & {
   selectedItem: MedicationInventoryItem | null;
   onClose: () => void;
   onConfirm: (medication: MedicationInventoryItem) => void;
};

export const useCreateOrEditMedicationInventoryModalLogic = (props: Props) => {
   const { open, selectedItem, onClose, onConfirm } = props;

   const [medication, setMedication] = useState(initialMedicationInventoryItemData);
   const [isAdding, setIsAdding] = useState(false);

   const isDisabledConfirmButton = Object.entries(medication).some(
      ([key, value]) => key !== 'id' && value === '',
   );

   const handleClose = () => {
      setMedication(initialMedicationInventoryItemData);
      onClose();
   };

   const handleConfirm = () => {
      onConfirm(medication);
      handleClose();
   };

   const handleRenderField = ({ field, label, type }: (typeof newMedicationInventoryItemFields)[0]) => {
      switch (type) {
         case 'radio':
            return (
               <FormControlLabel
                  name={field}
                  control={
                     <Checkbox
                        checked={!!medication[field] ?? false}
                        onChange={(e) => setMedication((prev) => ({ ...prev, [field]: e.target.checked }))}
                     />
                  }
                  label={label}
               />
            );
         default:
            return (
               <TextField
                  name={field}
                  sx={{ mb: 1 }}
                  label={label}
                  variant='standard'
                  fullWidth
                  value={medication[field]}
                  onChange={(e) =>
                     setMedication((prev) => ({
                        ...prev,
                        [field]: field === 'quantity' ? +e.target.value : e.target.value,
                     }))
                  }
               />
            );
      }
   };

   useEffect(() => {
      if (!selectedItem || !open) return;

      setMedication(selectedItem);
   }, [open]);

   return {
      data: { isDisabledConfirmButton },
      state: { medication, isAdding },
      setState: { setMedication, setIsAdding },
      handlers: { handleClose, handleRenderField, handleConfirm },
   };
};
