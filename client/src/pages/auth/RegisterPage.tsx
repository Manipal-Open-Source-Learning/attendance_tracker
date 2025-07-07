import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAppSeo from "@/lib/hooks/useAppSeo";
import { cn } from "@/lib/utils";
import useUIStore from "@/stores/useUIStore";

const LogIn = () => {
    useAppSeo({
        title: 'Register - Manipal OSL',
        description: 'Join Manipal OSL and start tracking your attendance with powerful tools made for students.',
    });

    const [username, setUsername] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    const loading = useUIStore((state) => state.loading);
    const setLoading = useUIStore((state) => state.setLoading);

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            const isTypingKey = (e.key?.length === 1 || e.key === "Backspace") && e.key !== "@";

            if (inputRef.current && document.activeElement !== inputRef.current && isTypingKey) inputRef.current?.focus();

            if (e.key === "Enter" && document.activeElement !== inputRef.current && inputRef.current?.validity.valid) inputRef.current.form?.requestSubmit();
        };

        window.addEventListener("keydown", handleKeydown);

        return () => window.removeEventListener("keydown", handleKeydown);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();

            if (loading) return;

            setLoading(true);
            setUsername(username.trim().split('@')[0]);

            const fullEmail = `${username}@learner.manipal.edu`;

            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log("Verifying with:", fullEmail);
            // Perform login logic here (e.g. API call)
        } catch (error) {
            console.error("Verification failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <div className="flex flex-col items-center justify-center min-h-screen font-outfit -translate-y-13">
                <Link
                    to="/"
                    className="mb-4"
                >
                    <img src="/logo.png" className="h-10" />
                </Link>
                <label
                    htmlFor="label"
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
                            value={username}
                            onChange={(e) => setUsername(e.target.value.toLowerCase())}
                            onKeyDown={(e) => {
                                if (e.key === "@") {
                                    e.preventDefault();
                                    inputRef.current?.blur();
                                }
                            }}
                            placeholder="Enter your email address"
                            className={cn(
                                `w-44 p-2 bg-secondary/65 rounded-lg font-geist-sans text-[15px] text-white
                                placeholder:text-white/50 placeholder:text-[14px] placeholder:text-center placeholder:font-outfit border border-transparent
                                focus:border-white/20 focus:border-[0.5px] outline-none transition-all duration-300 ease-in`,
                                username ? 'text-center' : 'text-left'
                            )}
                        />
                        <span className="pl-2 text-white/50 text-sm">
                            @learner.manipal.edu
                        </span>
                    </div>
                    <button
                        type="submit"
                        className="bg-secondary/20 text-accent font-jetbrains-mono tracking-tighter p-2 mt-4 w-80 rounded-md cursor-pointer"
                    >
                        {loading ? 'Verifying...' : 'Verify'}
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
        </main>
    );
}

export default LogIn;