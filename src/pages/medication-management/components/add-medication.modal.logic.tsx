import { capitalize, FormControl, InputLabel, MenuItem, ModalProps, Select, TextField } from '@mui/material';
import { useState } from 'react';
import {
   initialMedicationData,
   medicationFormOptions,
   newMedicationFields,
} from '../medication-management.mock';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

type Props = Omit<ModalProps, 'children'> & {
   onClose: () => void;
};

export const useAddMedicationModalLogic = (props: Props) => {
   const { onClose } = props;

   const [medication, setMedication] = useState(initialMedicationData);

   const handleClose = () => {
      setMedication(initialMedicationData);
      onClose();
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

   return {
      data: {},
      state: { medication },
      setState: { setMedication },
      handlers: { handleClose, handleRenderField },
   };
};
