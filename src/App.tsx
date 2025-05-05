import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/error-boundary/error-boundary.component';
import { Loading } from './components/loading/loading.component';
import { routesData } from './routes/routes';
import { paths } from './routes/paths';

function App() {
   return (
      <ErrorBoundary>
         <Suspense fallback={<Loading />}>
            <Routes>
               {routesData.map((route) => (
                  <Route
                     key={route.path}
                     path={route.path}
                     element={route.element}
                     errorElement={<ErrorBoundary error={new Error('Route error')} />}
                  >
                     {route.children?.map((child) => (
                        <Route
                           key={child.path}
                           path={child.path}
                           element={child.element}
                           errorElement={<ErrorBoundary error={new Error('Route error')} />}
                        />
                     ))}
                  </Route>
               ))}
               <Route path='*' element={<Navigate to={paths.login} replace />} />
            </Routes>
         </Suspense>
      </ErrorBoundary>
   );
}

export default App;
