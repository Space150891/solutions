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
   IconButton,
   Tooltip,
} from '@mui/material';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { addInfForHistory, toggleDoneTask, removeInfFromHistory } from '../../../store/slices/patientHistorySlice';
import { Task } from '../../../store/slices/types/patientHistoryTypes';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TasksTab() {
   const [newTask, setNewTask] = useState('');
   const dispatch = useAppDispatch();
   const tasks = useAppSelector((state) => state.patientHistory.tasks);

   const handleAddTask = () => {
      if (newTask.trim() === '') return;

      const task: Task = {
         id: crypto.randomUUID(),
         title: newTask.trim(),
         done: false,
         dueDate: undefined,
         assignedTo: undefined,
      };

      dispatch(addInfForHistory({ type: 'tasks', data: task }));
      setNewTask('');
   };

   const handleKeyPress = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
         handleAddTask();
      }
   };

   const handleToggleDone = (taskId: string) => {
      dispatch(toggleDoneTask(taskId));
   };

   const handleDeleteTask = (taskId: string) => {
      dispatch(removeInfFromHistory({ type: 'tasks', id: taskId }));
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
               onKeyPress={handleKeyPress}
               placeholder="Enter a new task"
               size="medium"
            />
            <Button 
               variant='contained' 
               onClick={handleAddTask}
               disabled={newTask.trim() === ''}
            >
               Add
            </Button>
         </Stack>

         <List sx={{ width: '100%' }}>
            {tasks.map((task) => (
               <ListItem
                  key={task.id}
                  secondaryAction={
                     <Tooltip title="Delete task">
                        <IconButton 
                           edge="end" 
                           aria-label="delete"
                           onClick={() => handleDeleteTask(task.id)}
                        >
                           <DeleteIcon />
                        </IconButton>
                     </Tooltip>
                  }
                  sx={{
                     bgcolor: 'background.paper',
                     borderRadius: 1,
                     mb: 1,
                     '&:hover': {
                        bgcolor: 'action.hover',
                     },
                  }}
               >
                  <Checkbox 
                     checked={task.done} 
                     onChange={() => handleToggleDone(task.id)}
                     edge="start"
                  />
                  <ListItemText
                     primary={task.title}
                     sx={{ 
                        textDecoration: task.done ? 'line-through' : 'none',
                        color: task.done ? 'text.secondary' : 'text.primary',
                     }}
                  />
               </ListItem>
            ))}
         </List>
      </Box>
   );
}
