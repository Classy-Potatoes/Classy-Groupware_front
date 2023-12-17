import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import {useEffect, useState} from "react";
import CalendarDetailModal from "../modals/CalendarDetailModal";
import {ko} from "date-fns/esm/locale";
import {useDispatch, useSelector} from "react-redux";
import {callCalendarListAPI} from "../apis/CalendarAPICalls";

export function CalendarMain({allSchedule}) {

    const dispatch = useDispatch();
    const [scheduleDetailModal, setScheduleDetailModal] = useState(false);
    const [schedule, setSchedule] = useState({});
    const {postSuccess} = useSelector(state => state.scheduleReducer);

    useEffect(() => {
        if (postSuccess) {
            dispatch(callCalendarListAPI());
            setScheduleDetailModal(false);
        }
    }, [postSuccess]);

    const clickedEvent = (e) => {

            const scheduleCode = e.event.extendedProps.calendarCode;
            const isPersonal = e.event.extendedProps.personal;
            const newSchedule = allSchedule.find(schedule => schedule.scheduleCode === scheduleCode && schedule.personal === isPersonal);

            if (newSchedule) {
                setSchedule(newSchedule);
                setScheduleDetailModal(true);
            }
    }

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                locale={ko}
                moreLinkContent={"+ 더보기"}
                handleWindowResize={true}
                height={800}
                events={
                    allSchedule &&
                    allSchedule.map(schedule => (
                        {
                            title: schedule.title,
                            start: schedule.start,
                            end: schedule.end,
                            color: schedule.personal ? '#00BA34' : '#ADD8E6',
                            calendarCode: schedule.scheduleCode,
                            personal: schedule.personal
                        }
                    )).sort((a, b) => {
                        if (a.personal && !b.personal) {
                            return -1; // 개인 일정(a)은 프로젝트 일정(b)보다 뒤로 정렬
                        } else if (!a.personal && b.personal) {
                            return 1; // 프로젝트 일정(b)은 개인 일정(a)보다 앞으로 정렬
                        } else {
                            return 0; // 서로 같은 유형의 일정은 순서를 유지
                        }
                    })
                }
                displayEventTime={true}
                eventClick={clickedEvent}
                dayMaxEvents={3}
            />
            {
                scheduleDetailModal &&
                <CalendarDetailModal
                    allSchedule={allSchedule}
                    schedule={schedule}
                    setScheduleDetailModal={setScheduleDetailModal}
                    postSuccess={postSuccess}
                />
            }
        </>
    );
}