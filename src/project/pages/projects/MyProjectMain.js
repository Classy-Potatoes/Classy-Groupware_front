import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callMyProjectListAPI} from "../../apis/ProjectAPICalls";
import MyProjectList from "../../components/lists/MyProjectList";
import PagingBar from "../../../dashBoard/components/common/PagingBar";

function MyProjectMain() {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { projects } =useSelector(state => state.projectReducer);

    useEffect(() => {
        /* 내가 참여한 프로젝트 정보 요청 */
        dispatch(callMyProjectListAPI({currentPage}));
    }, [currentPage]);

    return(
        <>
                { projects
                    &&
                    <>
                        <PagingBar pageInfo={projects.pageInfo} setCurrentPage={setCurrentPage}/>
                        <MyProjectList data={projects.data}/>
                    </>
                }
        </>
    )
}

export default MyProjectMain