import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/useAuthStore";
import useUIStore from "@/stores/useUIStore";
import { cn, RESPONSE_MESSAGE } from "@/lib/utils";

const DetailsCollection = () => {
    const navigate = useNavigate();
    const [dots, setDots] = useState('');

    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const username = useAuthStore((state) => state.username);
    const password = useAuthStore((state) => state.password);
    const setUsername = useAuthStore((state) => state.setUsername);
    const setPassword = useAuthStore((state) => state.setPassword);
    const resetAuth = useAuthStore((state) => state.resetAuth);

    const loading = useUIStore((state) => state.loading);
    const setLoading = useUIStore((state) => state.setLoading);
    const setSuccess = useUIStore((state) => state.setSuccess);
    const setError = useUIStore((state) => state.setError);

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
            if (e.key === "Enter" && document.activeElement !== usernameRef.current && document.activeElement !== passwordRef.current && !loading) {
                e.preventDefault();
                usernameRef.current?.form?.requestSubmit();
            }
        };

        window.addEventListener("keydown", handleKeydown);

        return () => window.removeEventListener("keydown", handleKeydown);
    }, [loading]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading || !username || !password) return;

        try {
            setLoading(true);

            // Perform login logic here (e.g. API call)
            await new Promise((resolve) => setTimeout(resolve, 2000));
            // await Promise.reject(new Error('failed'))

            console.log("Username:", username);
            console.log("Password:", password)

            setSuccess(RESPONSE_MESSAGE.loginSuccess.registered);
            navigate('/'); // /onboarding route whenever we're done with that

            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => resetAuth(), 2000);
        } catch (error) {
            console.error("Verification failed: ", error);

            // check error type - api failure, rate-limited, otp-expired (duration: Infinity) etc
            setError(RESPONSE_MESSAGE.loginErrors.serverError);
        } finally {
            setLoading(false);
        }
    }, [loading, username, password, navigate, setLoading, setSuccess, setError, resetAuth]);

    const handleInputChange = useCallback((type: 'username' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (type === 'username') setUsername(value);
        else setPassword(value);
    }, [setUsername, setPassword]);

    return (
        <>
            <h1 className="flex items-center my-3 text-xl font-medium text-white gap-x-2.5">
                <span>Let's</span>
                <span>Get</span>
                <span>Started</span>
            </h1>

            <div className="flex flex-col items-center text-white/70 text-sm">
                <p>Please enter your name and create a password to begin.</p>
                <p>This will help us set up your account.</p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-y-px"
            >
                <div className="flex flex-row items-center mt-4 mb-2 gap-x-4">
                    <input
                        id="username"
                        ref={usernameRef}
                        autoFocus={true}
                        disabled={loading}
                        type="text"
                        required
                        minLength={3}
                        maxLength={15}
                        value={username}
                        onChange={handleInputChange('username')}
                        placeholder="Enter Username"
                        aria-label="Enter your username"
                        className={
                            `w-44 p-2 bg-secondary/65 rounded-lg font-outfit text-lg text-accent/70 text-center
                            placeholder:text-white/50 placeholder:text-sm placeholder:text-center placeholder:font-geist-mono border
                            border-transparent focus:border-white/20 focus:border-[0.5px] outline-none transition-all duration-300 ease-in`
                        }
                    />
                    <input
                        id="password"
                        ref={passwordRef}
                        disabled={loading}
                        type="password"
                        required
                        minLength={8}
                        maxLength={20}
                        value={password}
                        onChange={handleInputChange('password')}
                        placeholder="Enter Password"
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$"
                        title="Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a symbol."
                        aria-label="Enter your password"
                        className={
                            `w-44 p-2 bg-secondary/65 rounded-lg font-outfit text-lg text-accent/70 text-center
                            placeholder:text-white/50 placeholder:text-sm placeholder:text-center placeholder:font-geist-mono border
                            border-transparent focus:border-white/20 focus:border-[0.5px] outline-none transition-all duration-300 ease-in`
                        }
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading || !username || !password}
                    className={cn(
                        "bg-secondary/20 text-accent/60 hover:text-accent font-satoshi font-semibold text-xl p-2 mt-4 rounded-xl cursor-pointer transition-all duration-300 ease-in",
                        loading ? 'text-accent' : 'w-65',
                    )}
                >
                    <span className="inline-block hover:scale-101 transition-transform duration-300 ease-in">
                        {loading ? `Creating Your Account${dots}` : 'Get Started'}
                    </span>
                </button>
            </form>
        </>
    )
}

export default DetailsCollection;
