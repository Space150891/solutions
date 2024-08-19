import { useState } from 'react';

import { userActivityMock } from './user-activity.mock';
import { userActivityColumnsConfig } from './user-activity.columns';

export const useUserActivityLogic = () => {
   const [rows, setRows] = useState(userActivityMock);

   const columns = userActivityColumnsConfig();

   return { data: { columns }, state: { rows }, setState: { setRows }, handlers: {} };
};
