import useDateStore from "@/stores/useDateStore";

const Days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const extraDays = [3,2,3,2,3,2,3];
const TODAY = new Date();

function checkLeap(n: number){
    if(n%4==0){
        if(n%100==0 && n%400!=0) return 0;
        else return 1;
    }
    return 0;
}

function isToday(activeDate: Date, date: number){
    if(date==TODAY.getDate() && activeDate.getMonth()==TODAY.getMonth() && activeDate.getFullYear()==TODAY.getFullYear()){
        return true;
    }
    return false;
}

const Calendar = ()=>{
    const {activeDate, nextMonth, prevMonth, setDate} = useDateStore();
    return (
        <>
            <div className="max-w-120">

                <div className="flex justify-between bg-amber-600 w-350px p-1 items-center rounded-t-xl">
                    <button id="previous" className="cursor-pointer bg-[#ffb380] text-2xl text-white h-7 w-7 flex justify-center items-center rounded-lg"
                        onClick={prevMonth}>‹</button>
                    <span>{Months[activeDate.getMonth()]}, {activeDate.getFullYear()}</span>
                    <button id="next" className="cursor-pointer bg-[#ffb380] text-2xl text-white h-7 w-7 flex justify-center items-center rounded-lg"
                        onClick={nextMonth}>›</button>
                </div>


                <div className="flex justify-between bg-[#c4c4c4] pl-1 pr-1">
                    {Days.map((e)=>(
                        <p className="w-[calc(100%/7)] text-center">{e}</p>
                    ))}
                </div>


                <div id="dates" className="flex flex-wrap bg-[#ffb380] p-1 pb-2 rounded-b-xl">
                    {[...Array((new Date(activeDate.getFullYear(), activeDate.getMonth(),1)).getDay())].map(()=>(
                            <p className="h-10 w-[calc(100%/7)] border-0"></p>)
                        )
                    }
                    {[...Array(28+((activeDate.getMonth()==1)?checkLeap(activeDate.getFullYear()):extraDays[activeDate.getMonth()%7])).keys()].map((e)=>(
                            <button className="h-15 w-[calc(100%/7)] border-0 cursor-pointer flex justify-center items-center"
                                onClick={()=>setDate(new Date(activeDate.getFullYear(), activeDate.getMonth(), e+1))}>
                                <p className={`w-8 h-8 rounded-full flex justify-center items-center border-amber-600 ${isToday(activeDate, e+1)?"bg-green-500":""} border-${(activeDate.getDate()==e+1)?"3":"0"}`}>
                                    {e+1}
                                </p>
                            </button>)
                        )
                    }
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        </>
    )
}

export default Calendar;