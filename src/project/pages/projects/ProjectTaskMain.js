import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {callProjectTaskListAPI} from "../../apis/ProjectTaskAPICalls";
import PagingBar from "../../../dashBoard/components/common/PagingBar";
import ProjectTaskList from "../../components/lists/ProjectTask/ProjectTaskList";
import {toast} from "react-toastify";


function ProjectTaskMain() {

    const dispatch = useDispatch();
    const { projectCode } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const { projectTask, postSuccess, putSuccess } = useSelector(state => state.projectTaskReducer);

    useEffect(() => {
        dispatch(callProjectTaskListAPI({projectCode, currentPage}));
    }, [dispatch, projectCode, currentPage]);

    /* 작성 성공시 */
    useEffect(() => {
        if (postSuccess === true) {
            dispatch(callProjectTaskListAPI({projectCode, currentPage}));
            toast.info("댓글 작성 완료 되었습니다.",);
        }
    }, [dispatch,postSuccess]);

    /* 수정 성공시 */
    useEffect(() => {
        if (putSuccess === true) {
            // navigate(`/projects`, { replace : true });
            dispatch(callProjectTaskListAPI({projectCode, currentPage}));
        }
    }, [dispatch, putSuccess]);

    return(
        <>
            { projectTask
                &&
                <>
                    <div>
                        <ProjectTaskList data={projectTask.data}/>
                    </div>
                    <div className="project-post-paging">
                        <PagingBar pageInfo={projectTask.pageInfo} setCurrentPage={setCurrentPage} />
                    </div>
                </>

            }
        </>
    );
}

export default ProjectTaskMain;