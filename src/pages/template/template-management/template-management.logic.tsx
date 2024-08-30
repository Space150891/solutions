import { useState } from 'react';
import { templateViewMock } from '../template-view/template-view.mock';
import { templateManagementColumnsConfig } from './template-management.columns';

export const useTemplateManagementLogic = () => {
   const [rows, setRows] = useState(templateViewMock);

   const columns = templateManagementColumnsConfig();

   return { data: { columns }, state: { rows }, setState: { setRows }, handlers: {} };
};
