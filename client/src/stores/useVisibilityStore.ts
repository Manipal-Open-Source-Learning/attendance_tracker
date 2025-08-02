import { create } from "zustand";

type VisibilityState = {
    visibility: "visible" | "hidden";
    toggleVisibility: () => void;
}

const useVisibilityStore = create<VisibilityState>((set) => ({
    visibility: "visible",
    toggleVisibility: () => set((state) => ({
        visibility: state.visibility === 'visible'
            ? 'hidden'
            : 'visible'
    }))
}));

export default useVisibilityStore;
