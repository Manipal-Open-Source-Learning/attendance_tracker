import { useState } from "react";
import useAppSeo from "@/lib/hooks/useAppSeo";
import Calendar from "@/components/ui/Calendar";
import MarkAttendanceTable from "@/components/ui/MarkAttendance";
import useDateStore from "@/stores/useDateStore";

const Tracker = () => {
    useAppSeo({
        title: 'Attendance Tracker - Manipal OSL',
        description: 'Track your attendance with the Manipal OSF Attendance Tracker, a student-led initiative to simplify attendance management.',
    });

    const [visibility, setVisibility] = useState<"calendar" | "attendance">("attendance");

    const toggleVisibility = () => {
        {/*TO BE MADE ASYNC ONCE CONNECTED TO DB ??*/ }

        setVisibility((prev) => (prev === "calendar" ? "attendance" : "calendar"));
    };

    const { activeDate, firstOfTheMonth, nextMonth, prevMonth, setDate } = useDateStore();

    return (
        <main>
            <div className="flex flex-wrap justify-center items-center py-40">
                {visibility === 'attendance' && (
                    <div className={`text-center`}>
                        <MarkAttendanceTable activeDate={activeDate} switcheroo={toggleVisibility} />
                    </div>
                )}

                {visibility === 'calendar' && (
                    <div className='flex flex-col items-center gap-y-4'>
                        <Calendar activeDate={activeDate} firstOfTheMonth={firstOfTheMonth} nextMonth={nextMonth} prevMonth={prevMonth} setDate={setDate} />
                        <button
                            type="button"
                            onClick={toggleVisibility}
                            className="w-full bg-green-500/80 cursor-pointer p-2 rounded-lg font-satoshi font-semibold"
                        >
                            Done
                        </button> {/*TO BE MADE ASYNC ONCE CONNECTED TO DB*/}
                    </div>
                )}
            </div>
        </main>
    );
}

export default Tracker;