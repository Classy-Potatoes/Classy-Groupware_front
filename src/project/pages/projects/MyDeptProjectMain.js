import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callMyDeptProjectListAPI} from "../../apis/ProjectAPICalls";
import MyDeptProjectList from "../../components/lists/Projects/MyDeptProjectList";
import PagingBar from "../../../dashBoard/components/common/PagingBar";

function MyDeptProjectMain() {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { myDeptProjects  } = useSelector(state => state.projectReducer);


    useEffect(() => {
        /* 내가 참여한 프로젝트 정보 요청 */
        dispatch(callMyDeptProjectListAPI({currentPage}));
    }, [currentPage]);

    return(
        <>
            { myDeptProjects
                &&
                <>
                    <PagingBar pageInfo={myDeptProjects.pageInfo} setCurrentPage={setCurrentPage}/>
                    <MyDeptProjectList data={myDeptProjects.data}/>
                </>
            }
        </>
    )
}

export default MyDeptProjectMain;