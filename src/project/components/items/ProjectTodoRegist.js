import React, {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callProjectInviteAPI} from "../../apis/ProjectAPICalls";
import tdPlus from "../../../calendar/images/todoPlus.png"
import tdMinus from "../../../calendar/images/todoMinus.png";
import DatePicker from "react-datepicker";
import {ko} from "date-fns/esm/locale";
import {callProjectTodoRegistAPI, callTodoListAPI} from "../../../calendar/apis/SecondProjectAPICalls";
import {toast} from "react-toastify";

function ProjectTodoRegist({projectCode, postSuccess, currentPage}) {

    const [todos, setTodos] = useState([
        {id: 0, todoBody: "", endDate: "", attendant: ""}
    ]);
    const [nextId, setNextId] = useState(1);
    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const {projectMember} = useSelector(state => state.projectReducer);

    useEffect(() => {
        dispatch(callProjectInviteAPI({projectCode}));
        if (postSuccess) {
            setForm({
                todoTitle: "",
                projectTodolistCreateRequestList: todos.map(todo => ({
                    todoBody: "",
                    endDates: "",
                    attendant: ""
                }))
            });
        }
    }, [postSuccess]);

    useEffect(() => {

        if (postSuccess) {
            const initialTodos = [
                {id: 0, todoBody: "", endDate: "", attendant: ""}
            ];
            setTodos(initialTodos);
        }

        document.getElementById("td-manager-selected").value = "";

    }, [postSuccess]);

    const removeTodo = (e) => {
        const targetId = parseInt(e.target.id);
        const updatedTodos = todos.filter(todo => todo.id !== targetId);
        setTodos(updatedTodos);
    };

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const changeTodos = (id, value, type) => {

        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                switch (type) {
                    case 'todoBody':
                        return {...todo, todoBody: value};
                    case 'endDate':
                        return {...todo, endDate: value};
                    case 'attendant':
                        return {...todo, attendant: value}
                    default:
                        return todo;

                }
            } else {
                return todo;
            }
        });
        setTodos(updatedTodos);
    };

    const addOneDay = (date) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
    }

    const clickedAddGuest = () => {
        const newTodos = {id: nextId};
        const updatedTodos = [...todos, newTodos];
        setTodos(updatedTodos);
        setNextId(prevId => prevId + 1);

    }

    const clickedRegist = () => {

        const newData = {
            ...form,
            projectTodolistCreateRequestList: todos.map(todo => ({
                todoBody: todo.todoBody,
                endDates: todo.endDate ? formatDate(addOneDay(todo.endDate)).toLocaleString('ko-KR') : toast.error("마감일이 비었습니다."),
                attendant: todo.attendant ? todo.attendant : toast.error("담당자가 비었습니다.")
            }))

        };

        dispatch(callProjectTodoRegistAPI({registRequest: newData, projectCode: projectCode}));
    }

    return (
        <>
            <div className="sch-title">
                <label htmlFor="sch-regist-header" className="col-form-label"></label>
                <input type="text"
                       className="cal-form-title"
                       id="sch-regist-header"
                       name="todoTitle"
                       onChange={onChangeHandler}
                       placeholder={
                           // schedule ? schedule.title :
                           '제목을 입력하세요(15자 이내)'}
                       value={form.todoTitle}
                       maxLength={15}
                />
            </div>
            {todos.map((todo) => (
                <div className="td-box" key={todo.id}>
                    <div className="td-left-box">
                        <div className="td-left">
                            <div className="td-circle"
                                 id={todo.id}
                                 onClick={removeTodo}
                            ><img src={tdMinus}/></div>
                            <div className="td-regist">
                                <label htmlFor="td-regist-header" className="col-form-label"></label>
                                <input type="text"
                                       className="cal-form-title"
                                       id={todo.id}
                                       name="todoBody"
                                       onChange={(e) => changeTodos(todo.id, e.target.value, 'todoBody')}
                                       placeholder={
                                           // schedule ? schedule.title :
                                           '할일 입력'}
                                       value={todo.todoBody}
                                       maxLength={10}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="td-right-box">
                        <div className="td-date-box">
                            <DatePicker
                                placeholderText={
                                    // schedule ? schedule.start.split('T')[0] :
                                    "마감일"}
                                showIcon
                                locale={ko}
                                icon="fa fa-calendar"
                                closeOnScroll={(e) => e.target === document}
                                selected={todo.endDate}
                                onChange={(date) => changeTodos(todo.id, date, 'endDate')}
                                dateFormat="yyyy-MM-dd"
                                minDate={new Date()}
                            />
                        </div>
                        <div className="td-add-manager">
                            <select
                                id="td-manager-selected"
                                className="sch-manager-selected"
                                onChange={(e) => changeTodos(todo.id, e.target.value, 'attendant')}
                                value={todos.attendant}
                            >
                                <option value="">
                                    이름 조회
                                </option>
                                {projectMember && projectMember.map(member => (
                                    <option
                                        key={member.infoCode}
                                        value={member.infoCode}
                                    >
                                        {member.memberName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            ))}
            <div className="add-td-box">
                <div className="td-add-left-box">
                    <div className="td-add-left">
                        <div onClick={clickedAddGuest} className="td-add-circle"><img src={tdPlus}/></div>
                        <div className="td-regist">
                            할일 추가
                        </div>
                    </div>
                </div>
            </div>
            <div className="td-regist-btn-box">
                <button onClick={clickedRegist} className="sch-regist-btn">등록</button>
            </div>

        </>
    )
        ;
}

export default ProjectTodoRegist;