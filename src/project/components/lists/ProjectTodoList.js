import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callProjectInviteAPI} from "../../apis/ProjectAPICalls";
import ProjectTodoListItem from "../items/ProjectTodoListItem";

function ProjectTodoList({todo, projectCode, memberId}) {

    console.log(todo, "todddddd");
    // todo.todoList

    const [modifyMode, setModifyMode] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [checked, setCheckec] = useState(null);
    const [attendantsCode, setAttendantsCode] = useState([]);
    const [form, setForm] = useState({});
    const [listForm, setListForm] = useState({})
    const dispatch = useDispatch();
    const {projectMember} = useSelector(state => state.projectReducer);

    useEffect(() => {
        dispatch(callProjectInviteAPI({projectCode}));
    }, [todo]);
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
        // dispatch(callProjectScheduleDeleteAPI({projectCode: projectCode, scheduleCode: todo.scheduleCode}))
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

        // dispatch(callProjectScheduleModifyAPI({registRequest: newData, projectCode: projectCode, scheduleCode: schedule.scheduleCode}));
    }

    return (
        <>
            {!modifyMode &&
                <div className="sch-list-header">
                    <div className="sch-list-first">
                        <div className="sch-list-top">{todo.memberName}</div>
                        {todo.memberId === memberId &&
                            <div className="sch-list-bottom">
                                <button onClick={clickModifyMode} className="sch-list-modify">수정</button>
                                <button onClick={clickedDelete} className="sch-list-delete">삭제</button>
                            </div>
                        }
                    </div>
                    <div className="sch-list-created">{todo.createdDate}</div>
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
                           todo && todo.todoTitle
                       }
                       value={modifyMode ? form.todoTitle : todo.todoTitle}
                       maxLength={15}
                       readOnly={!modifyMode}
                />
                {modifyMode &&
                    <button className="sch-unmodi" onClick={() => setModifyMode(false)}>X</button>
                }
                <div className="td-finished-box">
                    <div className="td-cnt-finished">
                        완료
                    </div>
                    <div className="td-cnt-finished">
                        전체 {todo.todoList.length}
                    </div>
                </div>
            </div>
            {todo && todo.todoList.map(todoItems => (
                    <div className="td-list-box" key={todoItems.todoListCode}>
                        <ProjectTodoListItem setListForm={setListForm} todoItems={todoItems}/>
                    </div>
                )
            )}
            <div className="sch-body-box">
                <label htmlFor="sch-body" className="col-form-label"></label>
                <textarea type="text"
                          className="sch-body"
                          id="sch-body"
                          name="scheduleContent"
                          onChange={onChangeHandler}
                          placeholder={
                              todo && todo.todoBody
                          }
                          value={modifyMode ? form.todoBody : todo.todoBody}
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

export default ProjectTodoList;