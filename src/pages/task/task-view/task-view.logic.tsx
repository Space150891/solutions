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
         setTimeout(() => {
            const notification = document.createElement('div');
            notification.style.position = 'fixed';
            notification.style.top = '24px';
            notification.style.right = '24px';
            notification.style.backgroundColor = '#2e7d32';
            notification.style.color = 'white';
            notification.style.padding = '16px 24px';
            notification.style.borderRadius = '8px';
            notification.style.zIndex = '9999';
            notification.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            notification.style.fontFamily = 'Roboto, sans-serif';
            notification.style.fontSize = '14px';
            notification.style.fontWeight = '500';
            notification.style.display = 'flex';
            notification.style.alignItems = 'center';
            notification.style.gap = '8px';
            notification.style.transition = 'opacity 0.3s ease-in-out';
            notification.style.opacity = '0';
            notification.innerHTML = `
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="white"/>
               </svg>
               Task saved successfully
            `;
            document.body.appendChild(notification);
            requestAnimationFrame(() => {
               notification.style.opacity = '1';
            });
            setTimeout(() => {
               notification.style.opacity = '0';
               setTimeout(() => {
                  document.body.removeChild(notification);
               }, 300);
            }, 3000);
         }, 100);
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
                        checked={task[field] as boolean}
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
