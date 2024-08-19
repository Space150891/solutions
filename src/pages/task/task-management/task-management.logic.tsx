import { useState } from 'react';
import { taskManagementColumnsConfig } from './task-management.columns';
import { taskManagementMock } from './task-management.mock';

export const useTaskManagementLogic = () => {
   const [rows, setRows] = useState(taskManagementMock);

   const columns = taskManagementColumnsConfig();

   return { data: { columns }, state: { rows }, setState: { setRows }, handlers: {} };
};
