import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callMyProjectListAPI} from "../../project/apis/ProjectAPICalls";
import DashBoardMyprojectList from "../components/list/DashBoardMyprojectList";

function DashBoardMyproject() {

    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const { projects } =useSelector(state => state.projectReducer);

    console.log("projects", projects);

    useEffect(() => {
        /* 내가 참여한 프로젝트 정보 요청 */
        dispatch(callMyProjectListAPI({currentPage}));
    }, [currentPage]);

    return(
        <>
            {projects &&
                <>
                    <DashBoardMyprojectList data={projects.data}/>
                </>
            }
        </>
    );
}

export default DashBoardMyproject;