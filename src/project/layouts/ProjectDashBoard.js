import ProjectNavList from "../components/common/ProjectNavList";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callMyProjectListAPI, callProjectMyTasktListAPI, callProjectPostListAPI} from "../apis/ProjectAPICalls";
import MyProjectTaskList from "../components/lists/Projects/MyProjectTaskList";
import MyProjectTodoList from "../components/lists/MyProjectTodoList";
import {useParams} from "react-router-dom";
import {callProjectMyTodoListAPI} from "../../calendar/apis/SecondProjectAPICalls";

function ProjectDashBoard() {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { myTask } = useSelector(state => state.projectReducer);
    const { myTodoList} = useSelector(state => state.thirdProjectReducer);
    const {projectCode} = useParams();

    useEffect(() => {
        /* 내가 참여한 프로젝트 정보 요청 */
        dispatch(callProjectMyTasktListAPI({currentPage}));
    }, [currentPage]);

    useEffect(() => {
        /* 내가 참여한 프로젝트 정보 요청 */
        dispatch(callProjectMyTodoListAPI({projectCode}));
    }, [currentPage]);

    return (
            <>
                <div>
                        <div className="project-dashBoard">
                            <div className="project-dashBoard-list">
                                {   myTask
                                    &&
                                    <MyProjectTaskList data={myTask.data}/>
                                }
                                {   myTodoList
                                    &&
                                    <MyProjectTodoList data={myTodoList}/>
                                }
                            </div>
                        </div>
                            <ProjectNavList/>
                </div>

            </>

    );
}


export default ProjectDashBoard;