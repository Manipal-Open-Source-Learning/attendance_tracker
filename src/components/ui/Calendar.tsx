const Days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const extraDays = [3,2,3,2,3,2,3]

function checkLeap(n: number){
    if(n%4==0){
        if(n%100==0 && n%400!=0) return 0;
        else return 1;
    }
    return 0;
}

const Calendar = ()=>{
    var currDate = new Date();
    var activeDate = currDate;
    return (
        <>
            <div className="max-w-120">
                <div className="flex justify-between bg-amber-600 w-350px p-1 items-center rounded-t-xl">
                    <button id="previous" className="cursor-pointer bg-[#ffb380] text-2xl text-white h-7 w-7 flex justify-center items-center rounded-lg">‹</button>
                    <span>{Months[currDate.getMonth()]}, {currDate.getFullYear()}</span>
                    <button id="next" className="cursor-pointer bg-[#ffb380] text-2xl text-white h-7 w-7 flex justify-center items-center rounded-lg">›</button>
                </div>
                <div className="flex justify-between bg-[#c4c4c4] pl-1 pr-1">
                    {Days.map((e)=>(
                        <p className="w-[calc(100%/7)] text-center">{e}</p>
                    ))}
                </div>
                <div className="flex flex-wrap bg-[#ffb380] p-1 rounded-b-xl">
                    {[...Array((7-currDate.getDate()%7)%7 - currDate.getDay()+1)].map(()=>(
                            <p className="h-10 w-[calc(100%/7)] border-0"></p>)
                        )
                    }
                    {[...Array(28+((currDate.getMonth()==1)?checkLeap(currDate.getFullYear()):extraDays[currDate.getMonth()%6])).keys()].map((e)=>(
                            <button className="h-10 w-[calc(100%/7)] border-0 cursor-pointer flex justify-center items-center">
                                <p className={`w-8 h-8 rounded-full flex justify-center items-center ${currDate.getDate()==e+1?"bg-green-500":""}`}>
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