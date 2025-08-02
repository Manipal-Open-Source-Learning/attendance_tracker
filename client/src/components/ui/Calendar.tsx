import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { CalendarProps, checkLeap, cn, DAYS, isSameDate, MONTHS, NO_OF_DAYS } from "@/lib/utils";
const TODAY = new Date();

const Calendar = ({ activeDate, firstOfTheMonth, nextMonth, prevMonth, setDate }: CalendarProps) => {
    const shownMonth = firstOfTheMonth.getMonth();
    const shownYear = firstOfTheMonth.getFullYear();

    const highlightToday = (d: Date) => cn(`${isSameDate(d, TODAY) ? "bg-green-700" : "bg-none"}`);
    const highlightActive = (d: Date) => cn(`${isSameDate(d, activeDate) ? "border-2" : "border-0"}`);
    const dateColor = (d: Date) => cn(`${d > TODAY ? "text-white/40 cursor-default" : "text-white cursor-pointer"}`);

    return (
        <>
            <div className="w-200 gap-2 mt-10">

                <div className="flex justify-between bg-accent/70 w-full p-2 items-center rounded-t-2xl">
                    <ChevronLeftIcon id="previous" className="cursor-pointer bg-black/100 text-2xl pr-0.5 text-white h-7 w-7 flex justify-center items-center rounded-[10px]"
                        onClick={() => { prevMonth() }} />
                    <p className="font-geist-sans font-semibold">{MONTHS[shownMonth]}, {shownYear}</p>
                    <ChevronRightIcon id="next" className="cursor-pointer bg-black/100 text-2xl pl-0.5 text-white h-7 w-7 flex justify-center items-center rounded-[10px]"
                        onClick={() => { (TODAY.getMonth() == shownMonth) ? {} : nextMonth() }} />
                </div>

                <div className="h-[1px]" />

                <div className="flex justify-between bg-red-500/60">
                    {
                        DAYS.map((e, i) => (
                            <p
                                key={i}
                                className="w-[calc(100%/7)] text-center font-satoshi font-bold"
                            >
                                {e.substring(0, 3)}
                            </p>
                        ))
                    }
                </div>

                <div
                    id="dates"
                    className="grid grid-cols-7 bg-black/30 border-t-0 border-2 rounded-b-3xl border-accent/70 h-100 items-center"
                >
                    {
                        [...Array(firstOfTheMonth.getDay())].map((_, i) => (
                            <div key={`empty-${i}`} className="w-[calc(100%/7)] border-0" />)
                        )
                    }
                    {
                        [...Array(NO_OF_DAYS[shownMonth] + (shownMonth === 1 && checkLeap(shownYear) ? 1 : 0)).keys()].map((e) => {
                            const d = new Date(shownYear, shownMonth, e + 1);
                            return (
                                <div
                                    key={`day-${e + 1}`}
                                    className="max-w-full h-9 border-0 flex justify-center items-center"
                                >
                                    <button
                                        onClick={() => { (d < TODAY) ? setDate(d) : {} }}
                                        className={`w-8 h-8 p-4 rounded-full flex justify-center ${dateColor(d)} font-satoshi font-bold items-center border-yellow-500 ${highlightToday(d)} ${highlightActive(d)}`}
                                    >
                                        {e + 1}
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Calendar;