import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {callProjectDetailAPI} from "../../apis/ProjectAPICalls";
import {callProjectPostListAPI} from "../../apis/ProjectPostAPICalls";
import PagingBar from "../../../dashBoard/components/common/PagingBar";
import ProjectPostItem from "../items/ProjectPostItem";

function ProjectPostList() {
    const dispatch = useDispatch();
    const { projectCode } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const { projectPost } = useSelector(state => state.projectReducer);

    useEffect(() => {
        dispatch(callProjectPostListAPI({projectCode, currentPage}));
    }, [dispatch, projectCode, currentPage]);

    return (
        <>
            <div>
                {projectPost && projectPost.data.map((post, index) => (
                    <ProjectPostItem key={post.postCode || index} projectPost={post} />
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