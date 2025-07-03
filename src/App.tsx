import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { createHead, UnheadProvider } from '@unhead/react/client';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

import Home from './pages/main/Home';
import Team from './pages/main/TeamPage';
import Tracker from './pages/main/TrackerPage';
import LogIn from './pages/auth/LoginPage';
import Register from './pages/auth/RegisterPage';

const App = () => {
  const head = createHead();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<MainLayout />} >
          <Route index element={<Home />} />
          <Route path='team' element={<Team />} />
          <Route path='tracker' element={<Tracker />} />
        </Route>

        <Route path='/auth' element={<AuthLayout />} >
          <Route path='register' element={<Register />} />
          <Route path='login' element={<LogIn />} />
        </Route>
      </>
    )
  );

  return (
    <UnheadProvider head={head}>
      <RouterProvider router={router} />
    </UnheadProvider>
  )
}

export default App;