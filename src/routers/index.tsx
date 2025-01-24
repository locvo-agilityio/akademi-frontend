import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';
import { Suspense } from 'react';

// Layouts
import { MainLayout, SecondaryLayout } from '@/layouts';

// Components
import { Fallback } from '@/components';

// Routers
import { DASHBOARD_ROUTES, PUBLIC_ROUTES } from './routers';

// Constants
import { PUBLIC_ROUTERS } from '@/constants';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path={PUBLIC_ROUTERS.ROOT}
        element={<Navigate to={PUBLIC_ROUTERS.DASHBOARD} replace />}
      />

      {DASHBOARD_ROUTES.map(({ path, Component, title }) => (
        <Route key={path} element={<MainLayout />}>
          <Route
            key={path}
            path={path}
            id={path}
            element={
              <Suspense fallback={<Fallback />}>
                <Component />
              </Suspense>
            }
            loader={() => ({ title })}
          />
        </Route>
      ))}

      {PUBLIC_ROUTES.map(({ path, Component, title }) => (
        <Route key={path} element={<SecondaryLayout title={title} />}>
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<Fallback />}>
                <Component />
              </Suspense>
            }
            loader={() => ({ title })}
          />
        </Route>
      ))}
    </Route>,
  ),
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },
);
