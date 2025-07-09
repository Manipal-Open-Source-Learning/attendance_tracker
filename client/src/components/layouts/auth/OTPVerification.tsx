import { useCallback, useEffect, useRef } from 'react';
import { CircleArrowRightIcon } from 'lucide-react';
import useAuthStore from '@/stores/useAuthStore';
import useUIStore from '@/stores/useUIStore';
import { RESPONSE_MESSAGE } from '@/lib/utils';

const OTPVerification = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const otp = useAuthStore((state) => state.otp);
    const email = useAuthStore((state) => state.email);
    const emailUsername = useAuthStore((state) => state.emailUsername);
    const setOtp = useAuthStore((state) => state.setOtp);
    const setStep = useAuthStore((state) => state.setStep);

    const loading = useUIStore((state) => state.loading);
    const setLoading = useUIStore((state) => state.setLoading);
    const setSuccess = useUIStore((state) => state.setSuccess);
    const setError = useUIStore((state) => state.setError);
    const resetUI = useUIStore((state) => state.resetUI);

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            const isTypingKey = e.key?.length === 1 || e.key === "Backspace";

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

            // Perform login logic here (e.g. API call)
            await new Promise((resolve) => setTimeout(resolve, 2000));
            // await Promise.reject(new Error('failed'))

            console.log("Verifying with OTP: ", otp);

            setSuccess(RESPONSE_MESSAGE.otpSuccess.validated);
            setStep('details');
        } catch (error) {
            console.error("Verification failed: ", error);

            // check error type - api failure, rate-limited, otp-expired (duration: Infinity) etc
            setError(RESPONSE_MESSAGE.otpErrors.invalid);
        } finally {
            setLoading(false);
        }
    }, [loading, otp, setLoading, setOtp, setStep, setSuccess, setError]);

    const handleOtpResend = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (loading) return;

        try {
            setLoading(true);

            const cleanedUsername = emailUsername.replace(/\d*\..*$/, '');

            // Perform login logic here (e.g. API call)
            await new Promise((resolve) => setTimeout(resolve, 2000));
            // await Promise.reject(new Error('failed'))

            console.log("Verifying with: ", email);
            console.log("Cleaned Username: ", cleanedUsername);

            resetUI();
            setOtp('');
            setSuccess(RESPONSE_MESSAGE.otpSuccess.sent);
        } catch (error) {
            console.error("Verification failed: ", error);

            // check error type - api failure, rate-limited, otp-expired (duration: Infinity) etc
            setError(RESPONSE_MESSAGE.otpErrors.serverError);
        } finally {
            setLoading(false);
        }
    }, [loading, email, emailUsername, resetUI, setLoading, setOtp, setSuccess, setError]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value.toUpperCase().trim());
    }, [setOtp]);

    const handleStepBack = useCallback(() => {
        resetUI();
        setOtp('');
        setStep('email');
    }, [resetUI, setOtp, setStep]);

    return (
        <>
            <h1 className='my-5 text-xl font-medium text-white'>
                Verify your Outlook email
            </h1>
            <div className='flex flex-col items-center text-white/70 text-sm '>
                <p>A login code has been sent to your Outlook email address.</p>
                <p>Please check your inbox at</p>
                <p className='text-white/90 font-semibold pt-1'>{email}</p>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col items-center gap-y-0.5'
                    noValidate={false}
                >
                    <div className='flex items-center mt-4 mb-2 ml-10'>
                        <input
                            id="otp"
                            ref={inputRef}
                            autoFocus={true}
                            disabled={loading}
                            type="text"
                            required
                            minLength={6}
                            maxLength={6}
                            value={otp}
                            onChange={handleInputChange}
                            placeholder='Enter Code'
                            aria-label="Enter the 6-digit OTP code"
                            pattern="[A-Za-z0-9]{6}"
                            title="OTP must be 6 characters long and contain only letters and numbers"
                            className={
                                `w-60 p-2 bg-secondary/65 rounded-lg font-geist-mono text-lg text-accent/70 text-center
                                placeholder:text-white/50 placeholder:text-sm placeholder:text-center placeholder:uppercase tracking-widest border
                                border-transparent focus:border-white/20 focus:border-[0.5px] outline-none transition-all duration-300 ease-in`
                            }
                        />
                        <button
                            type='submit'
                            disabled={loading}
                            className='pl-3 cursor-pointer active:scale-95 transition-all duration-200 ease-in'
                            aria-label="Submit OTP"
                        >
                            <CircleArrowRightIcon className='text-accent h-8 w-8 pointer-events-none' />
                        </button>
                    </div>
                </form>
                <div className='flex items-center gap-x-26 mt-px text-white/75'>
                    <button
                        type="button"
                        onClick={handleStepBack}
                        className='cursor-pointer hover:text-white transition-colors duration-300 ease-in bg-transparent border-none p-0'
                        aria-label="Go back to email entry"
                    >
                        Go Back
                    </button>
                    <button
                        type='button'
                        onClick={handleOtpResend}
                        className='cursor-pointer hover:text-accent/70 transition-colors duration-300 ease-in'
                        aria-label='Resend OTP'
                    >
                        Resend Code
                    </button>
                </div>
            </div>
        </>
    )
}

export default OTPVerification;
