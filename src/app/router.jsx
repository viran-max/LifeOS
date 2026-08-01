// src/app/router.jsx
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Dashboard from '../pages/Dashboard/Dashboard'
import Planner from '../pages/Planner/Planner'
import History from '../pages/History/History'
import Analytics from '../pages/Analytics/Analytics'
import Settings from '../pages/Settings/Settings'
import NotFound from '../pages/NotFound/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'planner', element: <Planner /> },
      { path: 'history', element: <History /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])