import data from "./test.json"
import { MONTHS } from "@/lib/utils";
import { DAYS } from "@/lib/utils";
import calendar from '@/assets/icons/calendar.svg';
import "@/index.css"

//THIS IS A VERY ROUGH LAYOUT OF HOW THIS PAGE MIGHT LOOK, WORKING HAS TO BE CHANGED ONCE CONNECTED TO BACKEND 
//CURRENT WORKING REPRESENTS WHAT WILL BE SHOWN WHEN CURRENT DAY IS LOADED UP (ATTENDANCE YET TO BE MARKED)
//SUBJECTS ARE BY DEFAULT MARKED ALL PRESENT IF NOT INTERACTED WITH, IF ANYTHING IS CHANGED AND MARKED BY USER, CHANGES MUST BE SHOWN AT ROLLBACK

type MarkProps = {
    activeDate: Date,
    switcheroo: Function
}

type SubmitObj = {
    date: Date,
    present: string[],
    absent: string[],
    cancelled: string[]
}

const handleCancel = (e : React.MouseEvent<HTMLButtonElement>)=>{
    var button = e.currentTarget;
    var checkbox = button.closest("tr")?.querySelector('input[type="checkbox"]') as HTMLInputElement;
    if(button.value=="1"){
        if(checkbox) checkbox.disabled=true;
        button.value = "0";
        button.innerText = "Uncancel"
    }
    else{
        if(checkbox) checkbox.disabled=false;
        button.value = "1";
        button.innerText = "Cancel"
    }
}

const handleSubstitute = (e : React.MouseEvent<HTMLAnchorElement>)=>{
    var sub = e.currentTarget;
    var activeSub = sub.closest("tr")?.firstChild as HTMLTableCellElement;
    activeSub.innerText = sub.innerText;
}

const handleSubmit = (targetDate:Date) => {
    const obj : SubmitObj = {
        date:targetDate,
        present:[],
        absent:[],
        cancelled:[]
    };
    document.querySelectorAll("tr").forEach((tableRow)=>{
        let sub = (tableRow.firstChild as HTMLTableCellElement).innerText;
        let checkbox = tableRow.querySelector("input");
        if(checkbox?.disabled){
            obj.cancelled.push(sub);
        }
        else if(checkbox?.checked){
            obj.present.push(sub);
        }
        else{
            obj.absent.push(sub);
        }
    });
    var objString = JSON.stringify(obj);
    console.log(objString);
}

const MarkAttendanceTable=({activeDate, switcheroo}:MarkProps)=>{

    return(
        <>
            {(activeDate.getDay()!=0 && activeDate.getDay()!=6)?
                <div className="text-center scale-150 backdrop-blur-xs border-accent border-4 rounded-lg p-5">
                    <div className="flex text-accent font-bold font-outfit mb-5 justify-between w-full">
                        <p className="w-6"></p>
                        <p>{`${activeDate.getDate()}-${MONTHS[activeDate.getMonth()]}-${activeDate.getFullYear()}, ${DAYS[activeDate.getDay()]}`}</p>
                        <button className="bg-none cursor-pointer w-6" onClick={()=>{switcheroo()}}>
                            <img src={calendar}/>
                        </button>
                    </div>
                    <table>
                        <tbody>
                        {data.weekly_schedule[(activeDate.getDay()).toString() as keyof typeof data.weekly_schedule].map((e:String)=>(
                            <tr className="border-b-2 border-dashed border-amber-50">
                                <td className="text-accent text-left w-50 font-semibold font-satoshi">{e}</td>
                                <td className="text-right pr-4"><input type="checkbox" defaultChecked className="cursor-pointer"/></td>
                                <td className="w-18 text-center"><button value="1" className="cancelButton" onClick={(e)=>{handleCancel(e)}}>Cancel</button></td>
                                <td>
                                    <DropDown/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <br/>
                    <button onClick={()=>{handleSubmit(activeDate)}} type="submit" className="border-0 rounded-lg bg-[#00c12d] active:bg-[#4ee972] text-[#111111] p-1.5 cursor-pointer text-[12px] font-satoshi font-semibold">Mark Attendance</button>
                </div>
            :
                <div className="text-center scale-150 backdrop-blur-xs border-accent border-4 rounded-lg p-5 w-md pt-7 pb-7">
                    <h3 className="text-accent font-satoshi">Nothing to see here.</h3>
                    <p className="text-accent font-satoshi m-4">It's a Holiday nigga</p>
                    <button className="bg-none cursor-pointer w-6" onClick={()=>{switcheroo()}}>
                        <img src={calendar}/>
                    </button>
                </div>
            }
        </>
    )
}

const DropDown = () => {
    return (
        <>
            <div className="relative flex dropdown gap-8 w-fit">
                <button className="substituteButton">Substitute</button>
                <div className="dropdownItems absolute hidden max-h-20 overflow-y-scroll min-w-25 z-10 rounded-lg ml-18">
                    {data.subjects.map((e)=>(
                        <a className="bg-[#333333] hover:bg-[#444444] text-accent p-1 block text-xs border-b-2 border-[#111111] cursor-pointer"
                           onClick={(event)=>{handleSubstitute(event)}}>{e}</a>
                    ))}
                </div>
            </div>
        </>
    );
}

export default MarkAttendanceTable;