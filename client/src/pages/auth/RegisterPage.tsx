import EmailStep from "@/components/layouts/auth/EmailRegistration";
import useAuthStore from "@/stores/useAuthStore";
import useAppSeo from "@/lib/hooks/useAppSeo";

const Register = () => {
    useAppSeo({
        title: 'Register - Manipal OSL',
        description: 'Join Manipal OSL and start tracking your attendance with powerful tools made for students.',
    });

    const step = useAuthStore((state) => state.step);

    return (
        <main>
            {step === 'email' && <EmailStep />}
        </main>
    );
}

export default Register;
