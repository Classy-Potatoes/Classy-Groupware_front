import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callProjectMyTasktListAPI} from "../../apis/ProjectAPICalls";
import DashBoardMyProjectTaskList from "../../../dashBoard/components/list/DashBoardMyProjectTaskList";

function ProjectMyTask() {

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
                <div className="myTask-List">
                    <DashBoardMyProjectTaskList data={myTask.data}/>
                </div>
            }
        </>
    );
}

export default ProjectMyTask;