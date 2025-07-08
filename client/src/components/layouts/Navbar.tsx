import { ReactNode, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import { motion, MotionProps } from 'motion/react';
import { NAVBAR_ITEMS } from '@/lib/utils';
import logo from '@/assets/logo/logo.png';

type FadeInProps = {
    children: ReactNode;
    delay?: number;
} & MotionProps & HTMLAttributes<HTMLDivElement>;

const FadeIn = ({ children, delay = 0, ...props }: FadeInProps) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ delay, type: 'tween', duration: 0.4, ease: 'easeOut' }}
        {...props}
    >
        {children}
    </motion.div>
);

type SlideInProps = {
    children: ReactNode;
    delay?: number;
};

const SlideIn = ({ children, delay = 0 }: SlideInProps) => (
    <motion.div
        initial={{ opacity: 0, y: -15, filter: 'blur(5px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay, type: 'tween', duration: 0.4, ease: 'easeOut' }}
    >
        {children}
    </motion.div>
);

type NavItemProps = {
    route: string;
    label: string;
    icon: ReactNode;
    isActive: boolean;
    index: number;
};

const NavItem = ({ route, label, icon, isActive, index }: NavItemProps) => (
    <SlideIn delay={index * 0.07}>
        <Link
            to={route}
            className={clsx(
                'flex items-center gap-x-1.5 text-sm font-outfit tracking-wider uppercase transition-all duration-300 ease-in-out',
                isActive ? 'text-white' : 'text-white/60 hover:text-white'
            )}
        >
            <span>{icon}</span>

            <span className='relative group'>
                {label}
                <span
                    className="absolute left-0 right-0 -bottom-1 h-[1.5px] bg-white
                    rounded-full opacity-0 scale-x-0 group-hover:opacity-100
                    group-hover:scale-x-100 transition-all duration-300 origin-center pointer-events-none"
                />
            </span>
        </Link>
    </SlideIn>
);

const AuthSection = ({ user }: { user: boolean }) => {
    if (user) {
        /*
            Backend needs to fetch user data to determine if the user has a profile picture
            For now, we have a placeholder image
            Replace with actual user profile picture URL when available
        */
        return (
            <Link to="/profile" className="relative top-0.5 h-11 w-11 overflow-hidden">
                <img src="/user_icon.png" alt="User Profile" className="scale-[1.8] object-contain" />
            </Link>
        );
    }

    return (
        <div className='hidden md:flex items-center h-10 bg-secondary/45 backdrop-blur-md rounded-[14px] text-white/80'>
            <Link
                to="/auth/login"
                className="px-3 h-full flex items-center text-sm font-jetbrains-mono hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] transition-all duration-300 ease-in-out"
            >
                <FadeIn>
                    Log In
                </FadeIn>
            </Link>

            <div className="flex items-center group">
                <div className="h-5 w-[1.5px] bg-white/10 origin-center transform transition-all duration-300 ease-in-out group-hover:h-0 group-hover:opacity-0" />

                <FadeIn className="h-10">
                    <Link
                        to="/auth/register"
                        className="px-3.5 h-full flex items-center rounded-[14px] hover:bg-black transition-all text-sm group"
                    >
                        <span className="font-jetbrains-mono font-bold group-hover:text-white transition-all">
                            Get Started
                        </span>
                    </Link>
                </FadeIn>
            </div>
        </div>
    );
};

const Navbar = () => {
    const { pathname } = useLocation();
    const user = false; // Replace with actual user state management

    return (
        <nav className='fixed w-full py-6 px-20 z-50'>
            <div className="flex items-center justify-between">
                <div className='flex-1 flex'>
                    <FadeIn className="font-geist-mono tracking-wider backdrop-blur-md rounded-[14px]">
                        <Link to="/" className="flex items-center gap-x-4 bg-secondary/45 rounded-[14px] py-2 px-4 backdrop-blur-md">
                            <img src={logo} alt="OSL Logo" className="h-10" />
                            <div className="text-accent font-medium text-xl">Manipal OSF</div>
                        </Link>
                    </FadeIn>
                </div>

                <div className='hidden md:flex justify-center bg-secondary/45 rounded-2xl py-2.5 px-4 backdrop-blur-md'>
                    <ul className='flex gap-x-10 items-center'>
                        {NAVBAR_ITEMS.map(({ route, label, icon }, index) => (
                            <li key={label}>
                                <NavItem
                                    route={route}
                                    label={label}
                                    icon={icon}
                                    isActive={pathname === route}
                                    index={index}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex-1 flex justify-end">
                    <AuthSection user={user} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;