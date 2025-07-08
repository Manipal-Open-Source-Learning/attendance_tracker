import { create } from 'zustand';

type Step = 'email' | 'otp' | 'details';

type AuthState = {
  step: Step;
  email: string;
  otp: string;
  emailUsername: string;
  password: string;

  setStep: (value: Step) => void;
  setEmail: (value: string) => void;
  setOtp: (value: string) => void;
  setEmailUsername: (value: string) => void;
  setPassword: (value: string) => void;

  resetAuth: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  step: 'email',
  email: '',
  otp: '',
  emailUsername: '',
  password: '',

  setStep: (value) => set({ step: value }),
  setEmail: (value) => set({ email: value }),
  setOtp: (value) => set({ otp: value }),
  setEmailUsername: (value) => set({ emailUsername: value }),
  setPassword: (value) => set({ password: value }),

  resetAuth: () =>
    set({
      step: 'email',
      email: '',
      otp: '',
      emailUsername: '',
      password: '',
    }),
}));

export default useAuthStore;
