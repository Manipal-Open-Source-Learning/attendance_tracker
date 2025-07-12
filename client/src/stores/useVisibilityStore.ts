import {create} from "zustand";

type VisibilityState = {
    visibility1: string;
    visibility2: string;
    switcheroo: ()=>void;
}

const useVisibilityStore = create<VisibilityState>((set)=>({
    visibility1: "visible",
    visibility2: "hidden",
    switcheroo: ()=>set((state)=>({visibility1:state.visibility2, visibility2:state.visibility1}))
}))

export default useVisibilityStore;