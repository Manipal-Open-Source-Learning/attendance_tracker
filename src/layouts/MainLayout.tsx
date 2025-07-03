import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layouts/Navbar';
import BottomBlur from '@/components/ui/BottomBlur';
import Vortex from '@/components/ui/Vortex';

const MainLayout = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      <div className="fixed inset-0 -z-10">
        <Vortex
          baseHue={15}
          particleCount={500}
          rangeSpeed={2}
        />
      </div>

      <main>
        <Outlet />
      </main>
      
      <BottomBlur />
    </div>
  );
}

export default MainLayout;