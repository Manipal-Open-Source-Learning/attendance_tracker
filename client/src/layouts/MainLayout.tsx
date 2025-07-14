import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layouts/Navbar';
import BottomBlur from '@/components/ui/BottomBlur';

const MainLayout = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Outlet />
      <BottomBlur />
    </div>
  );
}

export default MainLayout;