import DatePicker from "react-datepicker";
import {ko} from "date-fns/esm/locale";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callProjectScheduleRegistAPI} from "../../../calendar/apis/SecondProjectAPICalls";
import {callProjectInviteAPI} from "../../apis/ProjectAPICalls";
import Select from 'react-select';

function ProjectScheduleRegist({projectCode, postSuccess}) {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [attendants, setAttendants] = useState([]);
    const [attendantsCode, setAttendantsCode] = useState([]);
    const [form, setForm] = useState({

    });
    const dispatch = useDispatch();
    const {projectMember} = useSelector(state => state.projectReducer);

    useEffect(() => {
        dispatch(callProjectInviteAPI({projectCode}));
        if (postSuccess) {
            // postSuccess가 true일 때 form 상태 초기화
            setStartDate(null);
            setEndDate(null);
            setStartTime(null);
            setEndTime(null);
            setAttendants([]);
            setAttendantsCode([]);
            setForm({
                scheduleTitle: "",
                scheduleContent: ""
            }); // form 상태 초기화
        }
        
    }, [postSuccess]);

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
        const members = attendants.map((attendMem) =>
            attendMem.value
        )

        const newData = {
            ...form,
            attendants: members,
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
                    minDate={new Date()}
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
                    minDate={new Date()}
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
                {/* 담당자 이미지 */}
                <img src="/project/담당자.png"/>

                {/* react-select을 사용한 다중 선택 셀렉트 박스 */}
                <Select
                    placeholder="담당자 추가"
                    isMulti
                    options={projectMember.map((member) => ({
                        value: member.infoCode,
                        label: member.memberName,
                    }))}
                    value={attendants}
                    onChange={(selectedOptions) => {
                        setAttendants(selectedOptions);
                    }}
                />
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