import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import store from './store';
import { ThemeContextProvider } from './providers/theme-context.provider';

import './index.css';
import { routesData } from './routes/routes.tsx';

const routes = createBrowserRouter(routesData);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <Provider store={store}>
         <ThemeContextProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
               <RouterProvider router={routes} />
            </LocalizationProvider>
         </ThemeContextProvider>
      </Provider>
   </React.StrictMode>
);
