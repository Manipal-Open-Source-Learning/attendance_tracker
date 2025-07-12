import Calendar from "../../components/ui/Calendar";
import useAppSeo from "../../lib/hooks/useAppSeo";
import MarkAttendanceTable from "../../components/ui/MarkAttendance";
import useDateStore from "../../stores/useDateStore";
import useVisibilityStore from "../../stores/useVisibilityStore";

const Tracker = () => {
    useAppSeo({
        title: 'Attendance Tracker - Manipal OSL',
        description: 'Track your attendance with the Manipal OSF Attendance Tracker, a student-led initiative to simplify attendance management.',
    });

    const {visibility1, visibility2, switcheroo} = useVisibilityStore();
    const {activeDate, firstOfTheMonth, nextMonth, prevMonth, setDate} = useDateStore();

    return (
        <main>
            <div className="relative h-screen flex items-end pl-[5vw] pb-[10vh]">
                <h1 className="m-0 text-[15vw] font-light bg-gradient-to-r from-[#FF6B4A] to-[#EE441C] bg-[length:250%_100%] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,107,74,0.5)] animate-[shimmer_5s_ease-in-out_infinite]">
                    Tracker
                </h1>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-10 h-130">
                <div className={`text-center ${visibility1}`}>
                    <MarkAttendanceTable activeDate={activeDate} switcheroo={switcheroo}/>
                </div>
                <div className={`text-center ${visibility2}`}>
                    <Calendar activeDate={activeDate} firstOfTheMonth={firstOfTheMonth} nextMonth={nextMonth} prevMonth={prevMonth} setDate={setDate}/>
                    <button className="bg-[#00c12d] cursor-pointer p-2 rounded-lg font-satoshi font-semibold" onClick={switcheroo}>Done</button>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
        </main>
    );
}

export default Tracker;