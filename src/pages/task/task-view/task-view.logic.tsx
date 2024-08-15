import { useNavigate, useParams } from 'react-router-dom';

import { useState } from 'react';
import { taskManagementMock } from '../task-management/task-management.mock';
import { initialTaskData, newTaskFields } from './task-view.mock';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export const useTaskViewLogic = () => {
   const { task_id } = useParams();
   const navigate = useNavigate();
   const pageIsCreate = location.href.includes('create');

   const [isLoading, setIsLoading] = useState(false);
   const [task, setTask] = useState(
      task_id ? taskManagementMock.find((t) => t.id === +task_id) ?? initialTaskData : initialTaskData,
   );

   const handleConfirm = () => {
      setIsLoading(true);

      setTimeout(() => {
         setIsLoading(false);
         navigate(-1);
      }, 1500);
   };

   const handleRenderField = ({ field, label, type }: (typeof newTaskFields)[0]) => {
      switch (type) {
         case 'radio':
            return (
               <FormControlLabel
                  name={field}
                  control={
                     <Checkbox
                        checked={!!task[field] ?? false}
                        onChange={(e) => setTask((prev) => ({ ...prev, [field]: e.target.checked }))}
                     />
                  }
                  label={label}
               />
            );
         case 'date':
            return (
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                     name={field}
                     ampm={false}
                     slotProps={{ textField: { variant: 'standard' } }}
                     format='hh:mm DD.MM.YYYY'
                     label={label}
                     value={dayjs(task[field] as string)}
                     onChange={(value) => setTask((prev) => ({ ...prev, [field]: value }))}
                     sx={{ width: '100%' }}
                  />
               </LocalizationProvider>
            );
         default:
            return (
               <TextField
                  name={field}
                  sx={{ mb: 1 }}
                  label={label}
                  variant='standard'
                  fullWidth
                  value={task[field]}
                  onChange={(e) =>
                     setTask((prev) => ({
                        ...prev,
                        [field]: e.target.value,
                     }))
                  }
               />
            );
      }
   };

   return {
      data: { pageIsCreate, navigate },
      state: { task, isLoading },
      setState: {},
      handlers: { handleRenderField, handleConfirm },
   };
};
