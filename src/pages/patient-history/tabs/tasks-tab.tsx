/* eslint-disable @typescript-eslint/no-explicit-any */
import {
   Box,
   Typography,
   TextField,
   Button,
   Stack,
   List,
   ListItem,
   Checkbox,
   ListItemText,
} from '@mui/material';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { addInfForHistory, toggleDoneTask } from '../../../store/slices/patientHistorySlice';

interface Task {
   title: string;
   done: boolean;
}

export default function TasksTab() {
   const [newTask, setNewTask] = useState('');
   const dispatch = useAppDispatch();
   const tasks = useAppSelector((state) => state.patientHistory.tasks);

   const handleAddTask = () => {
      if (newTask.trim() === '') return;

      const task: Task = {
         title: newTask.trim(),
         done: false,
      };

      dispatch(addInfForHistory({ type: 'tasks', data: task }));
      setNewTask('');
   };

   const toggleDone = (index: number) => {
      dispatch(toggleDoneTask(index));
   };

   return (
      <Box>
         <Typography variant='h6' mb={2}>
            Tasks
         </Typography>
         <Stack direction='row' spacing={2} mb={2}>
            <TextField
               label='New Task'
               fullWidth
               value={newTask}
               onChange={(e) => setNewTask(e.target.value)}
            />
            <Button variant='contained' onClick={handleAddTask}>
               Add
            </Button>
         </Stack>

         <List>
            {tasks.map((task: Task, index: number) => (
               <ListItem key={index}>
                  <Checkbox checked={task.done} onClick={() => toggleDone(index)} />
                  <ListItemText
                     primary={task.title}
                     sx={{ textDecoration: task.done ? 'line-through' : 'none' }}
                  />
               </ListItem>
            ))}
         </List>
      </Box>
   );
}
