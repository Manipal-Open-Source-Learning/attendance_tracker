import { create } from "zustand";

type UIState = {
    loading: boolean;
    error: string | null;
    success: string | null;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setSuccess: (success: string | null) => void;
    resetUI: () => void;
}

const useUIStore = create<UIState>((set) => ({
    loading: false,
    error: null,
    success: null,
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setSuccess: (success) => set({ success }),
    resetUI: () => set({ loading: false, error: null, success: null })
}));

export default useUIStore;