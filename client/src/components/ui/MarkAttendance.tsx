import data from "./test.json"
import { MONTHS } from "../../lib/utils";
import { DAYS } from "../../lib/utils";
import calendar from '../../assets/icons/calendar.svg';

type MarkProps = {
    activeDate: Date,
    switcheroo: Function
}

const MarkAttendanceTable=({activeDate, switcheroo}:MarkProps)=>{
    return(
        <>
            {(activeDate.getDay()!=0 && activeDate.getDay()!=6)?
                <div className="text-center scale-150 backdrop-blur-xs border-accent border-4 rounded-lg p-5">
                    <table className="">
                        <caption className="flex text-accent font-bold font-outfit mb-5 justify-between w-80">
                            <p className="w-6"></p>
                            <p>{`${activeDate.getDate()}-${MONTHS[activeDate.getMonth()]}-${activeDate.getFullYear()}, ${DAYS[activeDate.getDay()]}`}</p>
                            <button className="bg-none cursor-pointer w-6" onClick={()=>{switcheroo()}}>
                                <img src={calendar}/>
                            </button>
                        </caption>
                        {data.weekly_schedule[(activeDate.getDay()).toString() as keyof typeof data.weekly_schedule].map((e:String)=>(
                            <tr className="border-b-2 border-dashed border-amber-50">
                                <td className="text-accent text-left w-50 font-semibold font-satoshi">{e}</td>
                                <td className="text-right"><input type="checkbox" className="cursor-pointer"/></td>
                            </tr>
                        ))}
                    </table>
                    <br/>
                    <button type="submit" className="border-0 rounded-lg bg-[#00c12d] active:bg-[#4ee972] text-[#111111] p-1.5 cursor-pointer text-[12px] font-satoshi font-semibold">Mark Attendance</button>
                </div>
            :
                <div className="text-center scale-150 backdrop-blur-xs border-accent border-4 rounded-lg p-5 w-md pt-7 pb-7">
                    <h3 className="text-accent font-satoshi">Nothing to see here.</h3>
                    <p className="text-accent font-satoshi m-4">It's a Holiday :) </p>
                    <button className="bg-none cursor-pointer w-6" onClick={()=>{switcheroo()}}>
                        <img src={calendar}/>
                    </button>
                </div>
            }
        </>
    )
}

export default MarkAttendanceTable;