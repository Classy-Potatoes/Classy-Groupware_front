import Header from "../../dashBoard/components/common/Header";
import React, {useEffect, useState} from "react";
import CalendarNavbar from "../pages/CalendarNavbar";
import {CalendarMain} from "../components/CalendarMain";
import {useDispatch, useSelector} from "react-redux";
import {callCalendarListAPI, callPersonalListAPI, callProjectListAPI} from "../apis/CalendarAPICalls";
import CalendarRegistModal from "../modals/CalendarRegistModal";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";

function CalendarLayout() {


    const [scheduleRegistModal, setScheduleRegistModal] = useState(false);
    const dispatch = useDispatch();
    const {allSchedule} = useSelector(state => state.scheduleReducer);

    useEffect(() => {
        dispatch(callCalendarListAPI());
    }, []);

    const clickedNewSchedule = () => {
        setScheduleRegistModal(true);
    }

    const clickedProject = () => {
        dispatch(callProjectListAPI());
    }

    const clickedPersonal = () => {
        dispatch(callPersonalListAPI());
    }

    const clickAllSchedule = () => {
        dispatch(callCalendarListAPI());
    }

    return (
        <>
            <Header/>
            <div className="cal-all-box">
                <CalendarNavbar/>
                {true
                    &&
                    <>
                        <ToastContainer
                            hideProgressBar={true}
                            position="top-center"
                        />
                        <div className="cal-container">
                            <CalendarMain allSchedule={allSchedule}/>
                        </div>
                        <div className="cal-button-area">
                            <div className="cal-add-button cal-select-button" onClick={clickedNewSchedule}>일정 추가</div>
                            <div className="cal-all-button cal-select-button" onClick={clickAllSchedule}>전체일정</div>
                            <div className="cal-project-button cal-select-button" onClick={clickedProject}>프로젝트</div>
                            <div className="cal-personal-button cal-select-button" onClick={clickedPersonal}>개인일정</div>
                        </div>
                    </>
                }
                {
                    scheduleRegistModal &&
                    <CalendarRegistModal
                        setScheduleRegist={setScheduleRegistModal}
                    />
                }
            </div>
        </>
    );
}

export default CalendarLayout;