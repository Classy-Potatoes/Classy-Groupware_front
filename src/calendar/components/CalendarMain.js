import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'

export function CalendarMain({allSchedule}) {
    console.log(allSchedule,"!2312312312")
    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                events={
                    allSchedule &&
                    allSchedule.map(schedule => (
                        {
                            title: schedule.title,
                            start: schedule.start,
                            end: schedule.end,
                            color: schedule.personal ? 'green' : 'blue'
                        }
                    ))
                }
                displayEventTime={false}
            />
        </>
    );
}