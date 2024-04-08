import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import store from './store';
import { theme } from './providers/theme.provider.ts';

import './index.css';
import { routesData } from './routes/routes.tsx';

const routes = createBrowserRouter(routesData);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <Provider store={store}>
         <ThemeProvider theme={theme}>
            <RouterProvider router={routes} />
         </ThemeProvider>
      </Provider>
   </React.StrictMode>,
);
