import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {callProjectPostListAPI} from "../../apis/ProjectPostAPICalls";
import PagingBar from "../../../dashBoard/components/common/PagingBar";
import ProjectPostItem from "../items/ProjectPostItem";

function ProjectPostList() {
    const dispatch = useDispatch();
    const { projectCode } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const { projectPost, putSuccess } = useSelector(state => state.projectPostReducer);


    useEffect(() => {
        dispatch(callProjectPostListAPI({projectCode, currentPage}));
    }, [dispatch, projectCode, currentPage]);


    /* 수정 성공시 */
    useEffect(() => {
        if (putSuccess === true) {
            //navigate(`/projects`, { replace : true });
            dispatch(callProjectPostListAPI({projectCode, currentPage}));
        }
    }, [putSuccess]);

    return (
        <>
            <div>
                {projectPost && projectPost.data.map((post, index) => (
                    <ProjectPostItem key={post.postCode || index} projectPost={post}/>
                ))}
                {projectPost && projectPost.pageInfo && (
                    <div className="project-post-paging">
                        <PagingBar pageInfo={projectPost.pageInfo} setCurrentPage={setCurrentPage} />
                    </div>
                )}
            </div>
        </>
    );
}

export default ProjectPostList;