import { DAYS, MONTHS, NO_OF_DAYS } from "@/lib/utils";
const TODAY = new Date();

function checkLeap(n: number){
    if(n%4==0){
        if(n%100==0 && n%400!=0) return 0;
        else return 1;
    }
    return 0;
}

function isSameDate(date1: Date, date2: Date){
    if(date1.getDate() == date2.getDate() && date1.getMonth()==date2.getMonth() && date1.getFullYear()==date2.getFullYear()){
        return true;
    }
    return false;
}

type CalendarProps = {
    firstOfTheMonth: Date,
    activeDate: Date,
    nextMonth: Function,
    prevMonth: Function,
    setDate: Function
}

const Calendar = ({activeDate, firstOfTheMonth, nextMonth, prevMonth, setDate}:CalendarProps)=>{
    const shownMonth = firstOfTheMonth.getMonth();
    const shownYear = firstOfTheMonth.getFullYear();
    return (
        <>
            <div className="max-w-120 m-3">

                <div className="flex justify-between bg-amber-600 w-350px p-1 items-center rounded-t-xl">
                    <button id="previous" className="cursor-pointer bg-[#ffb380] text-2xl text-white h-7 w-7 flex justify-center items-center rounded-lg"
                        onClick={()=>{prevMonth()}}>‹</button>
                    <p className="font-satoshi font-semibold">{MONTHS[shownMonth]}, {shownYear}</p>
                    <button id="next" className="cursor-pointer bg-[#ffb380] text-2xl text-white h-7 w-7 flex justify-center items-center rounded-lg"
                        onClick={()=>{(TODAY.getMonth()==shownMonth)?{}:nextMonth()}}>›</button>
                </div>


                <div className="flex justify-between bg-[#c4c4c4] pl-1 pr-1">
                    {DAYS.map((e)=>(
                        <p className="w-[calc(100%/7)] text-center font-outfit font-semibold">{e.substring(0,3)}</p>
                    ))}
                </div>


                <div id="dates" className="flex flex-wrap bg-[rgb(0 0 0/0.3)] p-1 pb-2 rounded-b-xl border-4 border-amber-600 backdrop-blur-xs h-95 items-center">
                    {[...Array(firstOfTheMonth.getDay())].map(()=>(
                            <p className="h-10 w-[calc(100%/7)] border-0"></p>)
                        )
                    }
                    {[...Array(NO_OF_DAYS[shownMonth]+(shownMonth==1 && checkLeap(shownYear)?1:0)).keys()].map((e)=>{ 
                        const d = new Date(shownYear, shownMonth, e+1);
                        return(
                            <button className="h-15 w-[calc(100%/7)] border-0 cursor-pointer flex justify-center items-center m-0"
                                onClick={()=>setDate(d)}>
                                <p className={`w-8 h-8 rounded-full flex justify-center text-[#ffffff] font-satoshi font-bold items-center border-amber-600 ${isSameDate(d, TODAY)?"bg-green-500":""} ${isSameDate(d, activeDate)?"border-3":"border-0"}`}>
                                    {e+1}
                                </p>
                            </button>)
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Calendar;