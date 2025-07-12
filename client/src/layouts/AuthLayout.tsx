import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen min-w-full bg-primary">
      <Outlet />
    </div>
  );
}

export default AuthLayout;