import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import DashBoardMyProjectTodoList from "../components/list/DashBoardMyProjectTodoList";
import {callDashBoardMyTodoListAPI} from "../../project/apis/ProjectAPICalls";
import projectReducer from "../../project/modules/ProjectModule";


function DashBoardMyTodo() {

    const dispatch = useDispatch();
    const { myTodoList } = useSelector(state => state.projectReducer);
    const [currentPage, setCurrentPage] = useState(1);

    console.log("allMyTOdoList", myTodoList);


    useEffect(() => {

        dispatch(callDashBoardMyTodoListAPI({currentPage}));
    }, [currentPage]);

    return (
        <>
            {   myTodoList
                &&
                <DashBoardMyProjectTodoList data={myTodoList.data}/>
            }
        </>
    );
}

export default DashBoardMyTodo;