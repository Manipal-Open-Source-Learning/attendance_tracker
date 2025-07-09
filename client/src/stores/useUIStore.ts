import { create } from "zustand";
import ShowToast from "@/components/ui/ShowToast";

type UIState = {
    loading: boolean;
    error: string | null;
    success: string | null;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null, duration?: number) => void;
    setSuccess: (success: string | null, duration?: number) => void;
    resetUI: () => void;
};

const useUIStore = create<UIState>((set) => ({
    loading: false,
    error: null,
    success: null,

    setLoading: (loading) => set({ loading }),

    setError: (error, duration) => {
        set({ error });

        if (error) {
            setTimeout(() => {
                ShowToast({
                    type: "error",
                    children: error,
                    duration
                });
            }, 0);
        }
    },

    setSuccess: (success, duration) => {
        set({ success });

        if (success) {
            setTimeout(() => {
                ShowToast({
                    type: "success",
                    children: success,
                    duration
                });
            }, 0);
        }
    },

    resetUI: () => set({ loading: false, error: null, success: null }),
}));

export default useUIStore;
