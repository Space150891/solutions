import { capitalize, FormControl, InputLabel, MenuItem, ModalProps, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import {
   initialMedicationData,
   Medication,
   medicationFormOptions,
   newMedicationFields,
} from '../medication-management.mock';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

type Props = Omit<ModalProps, 'children'> & {
   selectedMedication: Medication | null;
   onClose: () => void;
   onConfirm: (medication: Medication) => void;
};

export const useCreateOrEditMedicationModalLogic = (props: Props) => {
   const { open, selectedMedication, onClose, onConfirm } = props;

   const [medication, setMedication] = useState(initialMedicationData);
   const [isAdding, setIsAdding] = useState(false);

   const isDisabledConfirmButton = Object.entries(medication).some(([key, val]) => key !== 'id' && !val);

   const handleClose = () => {
      setMedication(initialMedicationData);
      onClose();
   };

   const handleConfirm = () => {
      onConfirm(medication);
      handleClose();
   };

   const handleRenderField = ({ field, label, type }: (typeof newMedicationFields)[0]) => {
      switch (type) {
         case 'select':
            return (
               <FormControl variant='standard' fullWidth>
                  <InputLabel variant='standard' id='form-select-label'>
                     Form
                  </InputLabel>
                  <Select
                     variant='standard'
                     labelId='form-select-label'
                     id='form-select'
                     value={medication[field]}
                     label='Form'
                     onChange={(e) => setMedication((prev) => ({ ...prev, [field]: e.target.value }))}
                     sx={{ height: '45px' }}
                  >
                     {medicationFormOptions.map((option) => (
                        <MenuItem value={option} key={option}>
                           {capitalize(option)}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            );
         case 'date':
            return (
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                     ampm={false}
                     slotProps={{ textField: { variant: 'standard' } }}
                     format='hh:mm DD.MM.YYYY'
                     label={label}
                     value={dayjs(medication[field])}
                     onChange={(value) => setMedication((prev) => ({ ...prev, [field]: value }))}
                     sx={{ width: '100%' }}
                  />
               </LocalizationProvider>
            );
         default:
            return (
               <TextField
                  sx={{ mb: 1 }}
                  label={label}
                  variant='standard'
                  fullWidth
                  value={medication[field]}
                  onChange={(e) => setMedication((prev) => ({ ...prev, [field]: e.target.value }))}
               />
            );
      }
   };

   useEffect(() => {
      if (!selectedMedication || !open) return;

      setMedication(selectedMedication);
   }, [open]);

   return {
      data: { isDisabledConfirmButton },
      state: { medication, isAdding },
      setState: { setMedication, setIsAdding },
      handlers: { handleClose, handleRenderField, handleConfirm },
   };
};
