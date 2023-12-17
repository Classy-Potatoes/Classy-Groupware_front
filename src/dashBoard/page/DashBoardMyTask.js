import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callProjectMyTasktListAPI} from "../../project/apis/ProjectAPICalls";
import MyProjectTaskList from "../../project/components/lists/Projects/MyProjectTaskList";
import DashBoardMyProjectTaskList from "../components/list/DashBoardMyProjectTaskList";

function DashBoardMyTask() {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { myTask } = useSelector(state => state.projectReducer);

    useEffect(() => {
        dispatch(callProjectMyTasktListAPI({currentPage}));
    }, [currentPage]);

    return (
        <>
            {   myTask
                &&
                <DashBoardMyProjectTaskList data={myTask.data}/>
            }
        </>
    );
}

export default DashBoardMyTask;