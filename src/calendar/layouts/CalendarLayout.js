import Header from "../../dashBoard/components/common/Header";
import React, {useEffect, useState} from "react";
import CalendarNavbar from "../pages/CalendarNavbar";
import {CalendarMain} from "../components/CalendarMain";
import {useDispatch, useSelector} from "react-redux";
import {callCalendarListAPI, callPersonalListAPI, callProjectListAPI} from "../apis/CalendarAPICalls";

function CalendarLayout() {

    const dispatch = useDispatch();
    const {allSchedule, projectSchedule, personalSchedule} = useSelector(state => state.scheduleReducer);

    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        dispatch(callCalendarListAPI()).then(() => {
            setSchedule(allSchedule);
        });
    }, [dispatch]);

    const onClickedProject = () => {
        dispatch(callProjectListAPI());
        setSchedule(projectSchedule);
    }

    const onClickedPersonal = () => {
        dispatch(callPersonalListAPI());
        setSchedule(personalSchedule);
    }

    return (
        <>
            <Header/>
            <div className="cal-all-box">
                <CalendarNavbar/>
                <div className="cal-container">
                    <CalendarMain allSchedule={schedule}/>
                </div>
                <div className="cal-button-area">
                    <div className="cal-add-button">일정 추가</div>
                    <div className="cal-project-button" onClick={onClickedProject}>프로젝트</div>
                    <div className="cal-personal-button" onClick={onClickedPersonal}>개인일정</div>
                </div>
            </div>
        </>
    );
}

export default CalendarLayout;