import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="relative min-w-full bg-primary bg-[linear-gradient(to_bottom,hsl(210,6%,6%)_0%,hsl(0,0%,3%)_50%)]">
      <Outlet />
    </div>
  );
}

export default AuthLayout;