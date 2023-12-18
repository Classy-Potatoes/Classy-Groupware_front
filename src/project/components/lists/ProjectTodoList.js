import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callProjectInviteAPI} from "../../apis/ProjectAPICalls";
import ProjectTodoRegist from "../items/ProjectTodoRegist";
import checkStat from "../../../calendar/images/checked.png"
import {
    callCheckedTodoAPI,
    callProjectTodoDeleteAPI,
    todoListForDashboard
} from "../../../calendar/apis/SecondProjectAPICalls";
import ProjectTodoUpdate from "../items/ProjectTodoUpdate";

function ProjectTodoList({todo, projectCode, postSuccess, memberId}) {

    const [modifyMode, setModifyMode] = useState(false);
    const [completedCount, setCompletedCount] = useState();
    const [isChecked, setIsChecked] = useState({});
    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const {projectMember} = useSelector(state => state.projectReducer);
    const [initialValues, setInitialValues] = useState([]);

    useEffect(() => {
        if (todo && todo.todoList) {
            const initialValues = todo.todoList.map(todoItem => ({
                id: todoItem.todoListCode, // 고유한 ID 설정 (필요시)
                todoBody: todoItem.todoListBody, // todoListBody를 todoBody로 설정
                endDate: new Date(todoItem.todoListEndDate), // 날짜 형식으로 endDate 설정
                attendant: todoItem.managerName, // managerName을 attendant로 설정
                infoCode: todoItem.infoCode
                // attendantCode: todoItem.
            }));
            setInitialValues(initialValues);
        }
    }, [todo]);

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

    useEffect(() => {
        const cnt = todo.todoList.filter(item => item.todoStatus === "finished").length;
        setCompletedCount(cnt);
    }, [isChecked, todo]);

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

        dispatch(callCheckedTodoAPI({projectCode: projectCode, todoCode: todo.todoCode, todoListCode: newVal}))
    }

    /* 수정 모드로 변환하는 이벤트 */
    const clickModifyMode = () => {
        setModifyMode(true);
    }

    const clickedDelete = () => {
        dispatch(callProjectTodoDeleteAPI({projectCode: projectCode, todoCode: todo.todoCode}))
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
                            완료 {
                            Object.values(isChecked).filter(status => status).length}
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
                                className="td-left-fir-div" value={todoItem.todoListCode} onClick={clickedCheck}>
                                <img
                                    style={{ backgroundColor: isChecked[todoItem.todoListCode] ? 'cornflowerblue' : 'white' }}
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
                <ProjectTodoUpdate
                    todoTitle={todo.todoTitle}
                    init={initialValues}
                    todoCode={todo.todoCode}
                    projectCode={projectCode}
                />
            }
        </>
    );
}

export default ProjectTodoList;