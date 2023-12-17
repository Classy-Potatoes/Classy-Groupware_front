import DatePicker from "react-datepicker";
import {ko} from "date-fns/esm/locale";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callProjectInviteAPI} from "../../apis/ProjectAPICalls";
import {
    callProjectScheduleDeleteAPI,
    callProjectScheduleModifyAPI
} from "../../../calendar/apis/SecondProjectAPICalls";
import Select from "react-select";

function ProjectScheduleList({postSuccess, projectCode, schedule, memberId}) {

    const [modifyMode, setModifyMode] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [attendants, setAttendants] = useState([]);
    const [attendantsCode, setAttendantsCode] = useState([]);
    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const {projectMember} = useSelector(state => state.projectReducer);

    const createdDate = schedule.modifiedDate.split('T')[0];

    useEffect(() => {
        dispatch(callProjectInviteAPI({projectCode}));
        if (postSuccess) {
            setStartDate(null);
            setEndDate(null);
            setStartTime(null);
            setEndTime(null);
            setAttendants([]);
            setAttendantsCode([]);
            setForm({
                scheduleTitle: "",
                scheduleContent: ""
            });
            setModifyMode(false);
        }
    }, [schedule, postSuccess])
    ;
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

    /* 수정 모드로 변환하는 이벤트 */
    const clickModifyMode = () => {
        setModifyMode(true);
    }

    const clickedDelete = () => {
        dispatch(callProjectScheduleDeleteAPI({projectCode: projectCode, scheduleCode: schedule.scheduleCode}))
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

        dispatch(callProjectScheduleModifyAPI({registRequest: newData, projectCode: projectCode, scheduleCode: schedule.scheduleCode}));
    }

    return (
        <>
            {!modifyMode &&
                <div className="sch-list-header">
                    <div className="sch-list-first">
                        <div className="sch-list-top">{schedule.memberName}</div>
                        {schedule.memberId === memberId &&
                            <div className="sch-list-bottom">
                                <button onClick={clickModifyMode} className="sch-list-modify">수정</button>
                                <button onClick={clickedDelete} className="sch-list-delete">삭제</button>
                            </div>
                        }
                    </div>
                    <div className="sch-list-created">{createdDate}</div>
                </div>
            }
            <div className="sch-title">
                <label htmlFor="sch-regist-header" className="col-form-label"></label>
                <input type="text"
                       className="cal-form-title"
                       id="sch-regist-header"
                       name="scheduleTitle"
                       onChange={onChangeHandler}
                       placeholder={
                           schedule && schedule.scheduleTitle
                       }
                       value={modifyMode ? form.scheduleTitle : schedule.scheduleTitle}
                       maxLength={15}
                       readOnly={!modifyMode}
                />
                {modifyMode &&
                    <button className="sch-unmodi" onClick={() => setModifyMode(false)}>X</button>
                }
            </div>
            <div className="sch-date-box">
                <img src="/project/calender-icon2.png"/>
                <DatePicker
                    placeholderText={
                        schedule && schedule.scheduleStartDate.split('T')[0]
                    }
                    showIcon
                    locale={ko}
                    icon="fa fa-calendar"
                    closeOnScroll={(e) => e.target === document}
                    selected={modifyMode && startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                    readOnly={!modifyMode}
                    minDate={new Date()}
                />
                <DatePicker
                    placeholderText={
                        schedule && schedule.scheduleStartDate.split('T')[1]
                    }
                    selected={modifyMode && startTime}
                    onChange={(time) => setStartTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    readOnly={!modifyMode}
                />
                <div>ㅡ</div>
                <DatePicker
                    placeholderText={
                        schedule && schedule.scheduleEndDate.split('T')[0]
                    }
                    showIcon
                    locale={ko}
                    icon="fa fa-calendar"
                    closeOnScroll={(e) => e.target === document}
                    selected={modifyMode && endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="yyyy-MM-dd"
                    readOnly={!modifyMode}
                    minDate={new Date()}
                />
                <DatePicker
                    placeholderText={
                        schedule && schedule.scheduleEndDate.split('T')[1]
                    }
                    selected={modifyMode && endTime}
                    onChange={(time) => setEndTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    readOnly={!modifyMode}
                />
            </div>
            {modifyMode &&
                <div className="sch-add-manager">
                    {/* 담당자 이미지 */}
                    <img src="/project/담당자.png" />

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
            }
            {!modifyMode &&
                <div className="sch-managers-area">
                    <img className="sch-manager-img" src="/project/담당자.png"/>
                    <div className="sch-managers-box">
                        <div className="sch-managers-cnt">
                            참석자 {schedule.managers.length} 명
                        </div>
                        <div className="sch-managers-name-area">
                            {schedule && schedule.managers.map(
                                manager => <div className="sch-managers-name">
                                    {manager.memberName}&nbsp;
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
            }
            <div className="sch-body-box">
                <label htmlFor="sch-body" className="col-form-label"></label>
                <textarea type="text"
                          className="sch-body"
                          id="sch-body"
                          name="scheduleContent"
                          onChange={onChangeHandler}
                          placeholder={
                              schedule && schedule.scheduleBody
                          }
                          value={modifyMode ? form.scheduleBody : schedule.scheduleBody}
                          readOnly={!modifyMode}
                />
            </div>
            {modifyMode &&
                <div className="sch-regist-btn-box">
                    <button onClick={clickedRegist} className="sch-regist-btn">등록</button>
                </div>
            }
        </>
    );
}

export default ProjectScheduleList;