import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import store from './store';
import { ThemeContextProvider } from './providers/theme-context.provider';

import './index.css';
import { routesData } from './routes/routes.tsx';

const routes = createBrowserRouter(routesData);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <Provider store={store}>
         <ThemeContextProvider>
            <RouterProvider router={routes} />
         </ThemeContextProvider>
      </Provider>
   </React.StrictMode>,
);
