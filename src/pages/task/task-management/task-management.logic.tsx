import { useState } from 'react';
import { medicationManagementColumnsConfig } from './task-management.columns';
import { taskManagementMock } from './task-management.mock';

export const useTaskManagementLogic = () => {
   const [rows, setRows] = useState(taskManagementMock);

   const columns = medicationManagementColumnsConfig();

   return { data: { columns }, state: { rows }, setState: { setRows }, handlers: {} };
};
