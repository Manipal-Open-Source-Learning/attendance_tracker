import {create } from "zustand";

var TODAY = new Date();
var first = new Date(TODAY); first.setDate(1);

type DateState = {
    activeDate: Date;
    /* WAKE UP, it's the */ firstOfTheMonth: Date;
    nextMonth: ()=>void;
    prevMonth: ()=>void;
    setDate: (newDate:Date)=>void;
}

const useDateStore = create<DateState>((set)=>({
    activeDate: TODAY,
    firstOfTheMonth: first,
    nextMonth: ()=>set((state)=>({firstOfTheMonth: new Date(state.firstOfTheMonth.getFullYear()+((state.firstOfTheMonth.getMonth()==11)?1:0),(state.firstOfTheMonth.getMonth()+1)%12, 1)})),
    prevMonth: ()=>set((state)=>({firstOfTheMonth: new Date(state.firstOfTheMonth.getFullYear()-((state.firstOfTheMonth.getMonth()==0)?1:0),(state.firstOfTheMonth.getMonth()==0)?11:state.firstOfTheMonth.getMonth()-1, 1)})),
    setDate: (newDate)=>set({activeDate:newDate})
}));

export default useDateStore;