import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import useUIStore from "@/stores/useUIStore";
import useAuthStore from "@/stores/useAuthStore";
import { cn, RESPONSE_MESSAGE } from "@/lib/utils";
import ShowToast from "@/components/ui/ShowToast";

const EmailRegistration = () => {
    const [dots, setDots] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    const loading = useUIStore((state) => state.loading);
    const setLoading = useUIStore((state) => state.setLoading);

    const emailUsername = useAuthStore((state) => state.emailUsername);
    const setEmailUsername = useAuthStore((state) => state.setEmailUsername);
    const setEmail = useAuthStore((state) => state.setEmail);
    const setStep = useAuthStore((state) => state.setStep);

    useEffect(() => {
        if (!loading) {
            setDots('');
            return;
        }

        const interval = setInterval(() => {
            setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
        }, 400);

        return () => clearInterval(interval);
    }, [loading]);

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            const isTypingKey = (e.key?.length === 1 || e.key === "Backspace") && e.key !== "@";

            if (inputRef.current && document.activeElement !== inputRef.current && isTypingKey) {
                inputRef.current?.focus();
                return;
            }

            if (e.key === "Enter" && document.activeElement !== inputRef.current && inputRef.current?.validity.valid && !loading) inputRef.current.form?.requestSubmit();
        };

        window.addEventListener("keydown", handleKeydown);

        return () => window.removeEventListener("keydown", handleKeydown);
    }, [loading]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        try {
            setLoading(true);

            const cleanedEmailUsername = emailUsername.trim().split('@')[0];
            const cleanedUsername = cleanedEmailUsername.replace(/\d*\..*$/, '');
            const fullEmail = `${cleanedEmailUsername}@learner.manipal.edu`;

            setEmailUsername(cleanedEmailUsername);
            setEmail(fullEmail);

            // Perform login logic here (e.g. API call)
            await new Promise((resolve) => setTimeout(resolve, 5000));

            console.log("Verifying with: ", fullEmail);
            console.log("Cleaned Username: ", cleanedUsername);

            ShowToast({
                type: 'success',
                children: (
                    <span className="text-white font-satoshi font-medium text-sm">
                        {RESPONSE_MESSAGE.otpSuccess}
                    </span>
                )
            });

            setStep('otp');
        } catch (error) {
            console.error("Verification failed:", error);
        } finally {
            setLoading(false);
        }
    }, [loading, emailUsername, setLoading, setEmailUsername, setEmail, setStep]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailUsername(e.target.value.toLowerCase());
    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "@") {
            e.preventDefault();
            inputRef.current?.blur();
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen font-outfit -translate-y-13">
            <Link
                to="/"
                className="mb-4"
            >
                <img src="/logo.png" className="h-10" />
            </Link>
            <label
                htmlFor="email"
                className="my-5 text-xl font-medium text-white"
            >
                What's your Outlook email address?
            </label>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-0.5"
                noValidate={false}
            >
                <div className="flex items-center">
                    <input
                        id="email"
                        ref={inputRef}
                        autoFocus={true}
                        disabled={loading}
                        type="text"
                        required
                        pattern={import.meta.env.VITE_MIT_EMAIL_REGEX}
                        title="Use format: yourname.mitmpl20xx or yourname.mitblr20xx"
                        value={emailUsername}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter your email address"
                        className={cn(
                            `w-44 p-2 bg-secondary/65 rounded-lg font-geist-sans text-[15px] text-white
                                placeholder:text-white/50 placeholder:text-[14px] placeholder:text-center placeholder:font-outfit border border-transparent
                                focus:border-white/20 focus:border-[0.5px] outline-none transition-all duration-300 ease-in`,
                            emailUsername ? 'text-center' : 'text-left'
                        )}
                    />
                    <span className="pl-2 text-white/50 text-sm">
                        @learner.manipal.edu
                    </span>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-secondary/20 text-accent font-jetbrains-mono tracking-tighter p-2 mt-4 w-80 rounded-md cursor-pointer"
                >
                    {loading ? `Verifying${dots}` : 'Verify'}
                </button>
            </form>
            <div className="m-4">
                <span className="text-white/80">
                    Already have an account?
                </span>
                <Link
                    to={'/auth/login'}
                    className="pl-2 font-jetbrains-mono text-accent/65 font-medium text-sm tracking-tighter"
                >
                    Log In
                </Link>
            </div>
        </div>
    );
}

export default EmailRegistration