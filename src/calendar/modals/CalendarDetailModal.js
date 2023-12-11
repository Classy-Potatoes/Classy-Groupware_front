import {useDispatch} from "react-redux";
import {callScheduleRemoveAPI} from "../apis/CalendarAPICalls";
import CalendarRegistModal from "./CalendarRegistModal";
import {useState} from "react";

function CalendarDetailModal({schedule, setScheduleDetailModal}) {

    const personalCode = schedule.scheduleCode;
    const dispatch = useDispatch();
    const startDate = schedule.start.replace('T', ' ');
    const endDate = schedule.end.replace('T', ' ');
    const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);

    const clickedDelete = () => {
        dispatch(callScheduleRemoveAPI({personalCode}))
    }

    const clickedModify = () => {
        setIsModifyModalOpen(true);
    }

    return (
        <>
            {isModifyModalOpen ? (
                <CalendarRegistModal schedule={schedule} setScheduleRegist={setIsModifyModalOpen}/>
            ) : (
                schedule && (
                    <div className="cal-detail-modal">
                        <div className="cal-detail-modal-container">
                            <div className="cal-detail-first-box">
                                <div className="cal-detail-title">{schedule.title}</div>
                                <div className="cal-detail-x-button-box">
                                    <button className="cal-detail-x-button" onClick={() => setScheduleDetailModal(false)}>X</button>
                                </div>
                            </div>
                            <div className="cal-detail-date-range-box">일시
                                <div className="cal-detail-start">{startDate}</div>
                                -
                                <div className="cal-detail-end">{endDate}</div>
                            </div>
                            <div className="cal-detail-content-box">{schedule.content}</div>
                            {schedule.personal && (
                                <div className="cal-detail-button-area">
                                    <button className="cal-detail-delete-button" onClick={clickedDelete}>삭제</button>
                                    <button className="cal-detail-modify-button" onClick={clickedModify}>수정</button>
                                </div>
                            )}
                        </div>
                    </div>
                )
            )}
        </>
    );
}

export default CalendarDetailModal;