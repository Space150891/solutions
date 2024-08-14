import dayjs from 'dayjs';
import { Task } from '../task-management/task-management.mock';

export const initialTaskData: Task = {
   id: 0,
   creator: '',
   assignedUser: '',
   isCompleted: false,
   endDate: dayjs(new Date()).toString(),
};

export const newTaskFields: {
   label: string;
   field: keyof Task;
   type: 'input' | 'radio' | 'date';
}[] = [
   { label: 'Creator', field: 'creator', type: 'input' },
   { label: 'Assigned user', field: 'assignedUser', type: 'input' },
   { label: 'End date', field: 'endDate', type: 'date' },
   { label: 'Completed', field: 'isCompleted', type: 'radio' },
];
