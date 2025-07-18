import { Link } from "react-router-dom";
import useAppSeo from "@/lib/hooks/useAppSeo";
import useAuthStore from "@/stores/useAuthStore";
import EmailStep from "@/components/layouts/auth/EmailRegistration";
import OTPVerification from "@/components/layouts/auth/OTPVerification";
import DetailsCollection from "@/components/layouts/auth/DetailsCollection";
import useUIStore from "@/stores/useUIStore";

const Register = () => {
    
    useAppSeo({
        title: 'Register - Manipal OSL',
        description: 'Join Manipal OSL and start tracking your attendance with powerful tools made for students.',
    });
    
    const step = useAuthStore((state) => state.step);
    const resetAuth = useAuthStore((state) => state.resetAuth);
    const resetUI = useUIStore((state) => state.resetUI);

    return (
        <main role="main">
            <div className="flex flex-col items-center justify-center min-h-screen font-outfit -translate-y-13">
                <Link
                    to={"/"}
                    aria-label="Go to homepage"
                    onClick={() => {
                        resetAuth();
                        resetUI();
                    }}
                    className='mb-4'
                >
                    <img src='/logo.png' alt="logo" className='h-10' />
                </Link>
                {step === 'email' && <EmailStep />}
                {step === 'otp' && <OTPVerification />}
                {step === 'details' && <DetailsCollection />}
            </div>
        </main>
    );
}

export default Register;
