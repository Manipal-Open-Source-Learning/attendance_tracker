import { create } from 'zustand';

type Step = 'email' | 'otp' | 'details';

type AuthState = {
  step: Step;
  email: string;
  otp: string;
  username: string;
  emailUsername: string;
  password: string;

  setStep: (value: Step) => void;
  setEmail: (value: string) => void;
  setOtp: (value: string) => void;
  setUsername: (value: string) => void;
  setEmailUsername: (value: string) => void;
  setPassword: (value: string) => void;

  resetAuth: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  step: 'email',
  email: '',
  otp: '',
  username: '',
  emailUsername: '',
  password: '',

  setStep: (value) => set({ step: value }),
  setEmail: (value) => set({ email: value }),
  setOtp: (value) => set({ otp: value }),
  setUsername: (value) => set({ username: value }),
  setEmailUsername: (value) => set({ emailUsername: value }),
  setPassword: (value) => set({ password: value }),

  resetAuth: () =>
    set({
      step: 'email',
      email: '',
      otp: '',
      username: '',
      emailUsername: '',
      password: '',
    }),
}));

export default useAuthStore;
