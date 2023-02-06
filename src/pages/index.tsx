import type { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootPage } from './RootPage';
import { ContentPage } from './ContentPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        path: '*',
        element: <ContentPage />,
      },
    ],
  },
]);

export const Pages: FC = () => <RouterProvider router={router} />;