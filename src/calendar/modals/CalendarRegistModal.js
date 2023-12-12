import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {callScheduleModifyAPI, callScheduleRegistAPI} from "../apis/CalendarAPICalls";
import DatePicker from "react-datepicker";
import {ko} from "date-fns/esm/locale";

function CalendarRegistModal({setScheduleRegist, schedule}) {

    const initTitle = schedule ? schedule.title : '';
    const initContent = schedule ? schedule.content : '';
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [form, setForm] = useState({
        calendarTitle: initTitle,
        calendarContent: initContent
    });
    const [modify, setModify] = useState(!!schedule);
    const [showEndDatePicker, setShowEndDatePicker] = useState(true);

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    }

    const formatTime = (time) => {
        return time.toISOString().split('T')[1].slice(0, 5);
    };

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const addOneDay = (date) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
    }

    const clickedRegist = () => {
        const formattedStartDate = startDate ? formatDate(addOneDay(startDate)) : schedule?.start.split('T')[0];
        const formattedEndDate = endDate ? formatDate(addOneDay(endDate)) : schedule?.end.split('T')[0];
        const formattedStartTime = startTime ? formatTime(startTime) : schedule?.start.split('T')[1].slice(0, 5);
        const formattedEndTime = endTime ? formatTime(endTime) : schedule?.end.split('T')[1].slice(0, 5);
        console.log(formattedStartDate, "1231231232131313")
        const newData = {
            ...form,
            calendarStartedDate: formattedStartDate,
            calendarEndDate: formattedEndDate,
            calendarStartedTime: formattedStartTime,
            calendarEndTime: formattedEndTime,
        };

        if (modify) {
            dispatch(callScheduleModifyAPI({calendarCode: schedule.scheduleCode, modifyRequest: newData}))
        } else {
            dispatch(callScheduleRegistAPI({registRequest: newData}));
        }
    }

    return (
        <>
            <div className="cal-detail-modal">
                <div className="cal-regist-modal-container">
                    <div className="cal-header">일정 생성</div>
                    <div className="cal-form-group">
                        <div className="cal-regist-first-box">
                            <label htmlFor="cal-regist-header" className="col-form-label"></label>
                            <input type="text"
                                   className="cal-form-title"
                                   id="cal-regist-header"
                                   name="calendarTitle"
                                   onChange={onChangeHandler}
                                   placeholder={schedule ? schedule.title : '제목을 입력하세요(15자 이내)'}
                                   value={form.calendarTitle}
                                   maxLength={15}
                            />
                        </div>
                        <div className="cal-show-second-datebox">
                            <button className="cal-oneday-button" onClick={() => setShowEndDatePicker(!showEndDatePicker)}>당일일정</button>
                        </div>
                        <div className="cal-datepicker-box">
                            <div className="cal-first-date-box">
                                <DatePicker
                                    placeholderText={schedule ? schedule.start.split('T')[0] : "YYYY.MM.DD"}
                                    showIcon
                                    locale={ko}
                                    icon="fa fa-calendar"
                                    closeOnScroll={(e) => e.target === document}
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="yyyy-MM-dd"
                                />
                                <DatePicker
                                    placeholderText={schedule ? schedule.start.split('T')[1] : "HH:MM"}
                                    selected={startTime}
                                    onChange={(time) => setStartTime(time)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                            </div>
                            {showEndDatePicker && (
                                <>
                                    <div>-</div>
                                    <div className="cal-second-date-box">
                                        <DatePicker
                                            placeholderText={schedule ? schedule.end.split('T')[0] : "YYYY.MM.DD"}
                                            showIcon
                                            locale={ko}
                                            icon="fa fa-calendar"
                                            closeOnScroll={(e) => e.target === document}
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            dateFormat="yyyy-MM-dd"
                                        />
                                        <DatePicker
                                            placeholderText={schedule ? schedule.end.split('T')[1] : "HH:MM"}
                                            selected={endTime}
                                            onChange={(time) => setEndTime(time)}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        <label htmlFor="cal-regist-body" className="col-form-label"></label>
                        <textarea
                            className="cal-form-content"
                            id="cal-regist-body"
                            name="calendarContent"
                            onChange={onChangeHandler}
                            placeholder={schedule ? schedule.content : '내용을 입력하세요'}
                            value={form.calendarContent}
                        />
                    </div>
                    <div className="cal-detail-button-area">
                        <button className="cal-detail-delete-button cal-detail-add-button" onClick={clickedRegist}>저장
                        </button>
                        <button className="cal-detail-modify-button cal-detail-reset-button"
                                onClick={() => setScheduleRegist(false)}>취소
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
}

export default CalendarRegistModal;