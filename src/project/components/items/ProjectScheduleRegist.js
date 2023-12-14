import DatePicker from "react-datepicker";
import {ko} from "date-fns/esm/locale";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callProjectScheduleRegistAPI} from "../../../calendar/apis/SecondProjectAPICalls";
import {callProjectInviteAPI} from "../../apis/ProjectAPICalls";

function ProjectScheduleRegist({projectCode}) {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [attendants, setAttendants] = useState([]);
    const [attendantsCode, setAttendantsCode] = useState([]);
    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const {projectMember} = useSelector(state => state.projectReducer);

    useEffect(() => {
        dispatch(callProjectInviteAPI({projectCode}));
    }, []);
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

    const clickedDeleteManager = (index) => {
        const newAttendants = attendants.filter((_, i) => i !== index);
        const newAttendantsCode = attendantsCode.filter((_, i) => i !== index);
        setAttendants(newAttendants);
        setAttendantsCode(newAttendantsCode);
    }

    const addOneDay = (date) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
    }

    const clickedRegist = () => {
        const formattedStartDate = startDate ? formatDate(addOneDay(startDate)) : "";
        // schedule?.start.split('T')[0];
        const formattedEndDate = endDate ? formatDate(addOneDay(endDate)) : "";
        // schedule?.end.split('T')[0];
        const formattedStartTime = startTime ? formatTime(startTime) : "";
        // schedule?.start.split('T')[1].slice(0, 5);
        const formattedEndTime = endTime ? formatTime(endTime) : "";
        // schedule?.end.split('T')[1].slice(0, 5);

        const newData = {
            ...form,
            attendants: attendantsCode,
            scheduleStartedDate: formattedStartDate,
            scheduleEndDate: formattedEndDate,
            scheduleStartedTime: formattedStartTime,
            scheduleEndTime: formattedEndTime
        };

        dispatch(callProjectScheduleRegistAPI({registRequest: newData, projectCode: projectCode}));
    }

    return (
        <>
            <div className="sch-title">
                <label htmlFor="sch-regist-header" className="col-form-label"></label>
                <input type="text"
                       className="cal-form-title"
                       id="sch-regist-header"
                       name="scheduleTitle"
                       onChange={onChangeHandler}
                       placeholder={
                           // schedule ? schedule.title :
                           '제목을 입력하세요(15자 이내)'}
                       value={form.scheduleTitle}
                       maxLength={15}
                />
            </div>
            <div className="sch-date-box">
                <img src="/project/calender-icon2.png"/>
                <DatePicker
                    placeholderText={
                        // schedule ? schedule.start.split('T')[0] :
                        "YYYY.MM.DD"}
                    showIcon
                    locale={ko}
                    icon="fa fa-calendar"
                    closeOnScroll={(e) => e.target === document}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                />
                <DatePicker
                    placeholderText={
                        // schedule ? schedule.start.split('T')[1] :
                        "HH:MM"}
                    selected={startTime}
                    onChange={(time) => setStartTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                />
                <div className="sch-space">-</div>
                <DatePicker
                    placeholderText={
                        // schedule ? schedule.end.split('T')[0] :
                        "YYYY.MM.DD"}
                    showIcon
                    locale={ko}
                    icon="fa fa-calendar"
                    closeOnScroll={(e) => e.target === document}
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="yyyy-MM-dd"
                />
                <DatePicker
                    placeholderText={
                        // schedule ? schedule.end.split('T')[1] :
                        "HH:MM"}
                    selected={endTime}
                    onChange={(time) => setEndTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                />
            </div>
            <div className="sch-add-manager">
                {projectMember && projectMember.map(
                    member => (
                        <>
                            <img className="sch-manager-img" src="/project/담당자.png"/>
                            <select className="sch-manager-selected" key={projectMember.infoCode}
                                    onChange={(e) => {
                                        const selected = e.target.value;
                                        if (selected !== '참석자추가' && !attendants.includes(selected) && !attendantsCode.includes(e.target.name)) {
                                            setAttendants([...attendants, e.target.value]);
                                            setAttendantsCode([...attendantsCode, member.infoCode]);
                                        }
                                    }
                                    }>
                                <option name={member.infoCode} value={member.memberName}>{member.memberName}</option>
                                <option value="참석자추가"
                                        selected="selected"
                                >참석자추가
                                </option>
                            </select>
                        </>
                    ))
                }
                {attendants.map((attendant, index) => (
                    <div className="sch-added-manager">
                        <div className="sch-added-box">
                            <div className="sch-manager-name" key={index}>
                                {attendant}
                            </div>
                            <button onClick={() => clickedDeleteManager(index)} className="sch-x-button">
                                X
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="sch-body-box">
                <label htmlFor="sch-body" className="col-form-label"></label>
                <textarea type="text"
                          className="sch-body"
                          id="sch-body"
                          name="scheduleContent"
                          onChange={onChangeHandler}
                          placeholder={
                              // schedule ? schedule.title :
                              '내용을 입력하세요.'}
                          value={form.scheduleContent}
                />
            </div>
            <div className="sch-regist-btn-box">
                <button onClick={clickedRegist} className="sch-regist-btn">등록</button>
            </div>
        </>
    );
}

export default ProjectScheduleRegist;