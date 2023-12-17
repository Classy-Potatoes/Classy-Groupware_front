import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callProjectInviteAPI} from "../../apis/ProjectAPICalls";
import ProjectTodoRegist from "../items/ProjectTodoRegist";
import checkStat from "../../../calendar/images/checked.png"
import {callCheckedTodoAPI, callProjectTodoDeleteAPI} from "../../../calendar/apis/SecondProjectAPICalls";

function ProjectTodoList({todo, projectCode, postSuccess, memberId}) {

    console.log(todo, "Toddd")
    const cnt = todo.todoList.filter(item => item.todoStatus === "finished").length;

    const [modifyMode, setModifyMode] = useState(false);
    const [isChecked, setIsChecked] = useState({});
    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const {projectMember} = useSelector(state => state.projectReducer);

    useEffect(() => {
        dispatch(callProjectInviteAPI({projectCode}));

    }, [todo]);

    useEffect(() => {
        const initialCheckState = {};
        todo.todoList.forEach(item => {
            initialCheckState[item.todoListCode] = item.todoStatus === 'finished';
        });
        setIsChecked(initialCheckState);
    }, [todo]);
    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    }

    const addOneDay = (date) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const clickedCheck = (e) => {
        const newVal = e.currentTarget.value;

        console.log(newVal, "newwwww")
        setIsChecked(prevState => ({
            ...prevState,
            [newVal]: !prevState[newVal] // 특정 todoListCode의 상태를 토글
        }));

        // const todoItem = todo.todoList.find(item => item.todoListCode == newVal);
        // console.log(todoItem, "itemmmmmm")
        // const stat = todoItem.todoStatus;
        // console.log(stat, "stat")
        dispatch(callCheckedTodoAPI({projectCode: projectCode, todoCode: todo.todoCode, todoListCode: newVal}))
    }

    /* 수정 모드로 변환하는 이벤트 */
    const clickModifyMode = () => {
        setModifyMode(true);
    }

    const clickedDelete = () => {
        dispatch(callProjectTodoDeleteAPI({projectCode: projectCode, todoCode: todo.todoCode}))
    }

    const clickedRegist = () => {

        // const newData = {
        //     ...form,
        //     projectTodolistCreateRequestList: todos.map(todo => ({
        //         todoBody: todo.todoBody,
        //         endDates: formatDate(addOneDay(todo.endDate)).toLocaleString('ko-KR'),
        //         attendant: todo.attendant
        //     }))
        //
        // };
        //
        // dispatch(callProjectTodoRegistAPI({registRequest: newData, projectCode: projectCode}));
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
                {!modifyMode &&
                    <div className="td-finished-box">
                        <div className="td-cnt-finished">
                            완료 {cnt}
                        </div>
                        <div className="td-cnt-finished">
                            전체 {todo.todoList.length}
                        </div>
                    </div>
                }
            </div>
            {!modifyMode &&
                todo.todoList.map(todoItem => (
                    <div className="td-list-box">
                        <div className="td-list-left-box">
                            <button
                                style={{ backgroundColor: isChecked[todoItem.todoListCode] ? 'blue' : 'white' }}
                                className="td-left-fir-div" value={todoItem.todoListCode} onClick={clickedCheck}>
                                <img
                                    src={checkStat}
                                />
                            </button>
                            <div className="td-left-sec-div">{todoItem.todoListBody}</div>
                        </div>
                        <div className="td-list-right-box">
                            <div>{todoItem.todoListEndDate}</div>
                            <div>{todoItem.managerName}</div>
                        </div>
                    </div>
                ))
            }
            {modifyMode &&
                <ProjectTodoRegist/>
            }
        </>
    );
}

export default ProjectTodoList;