import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {callProjectDetailAPI} from "../../apis/ProjectAPICalls";
import ProjectItem from "../../components/items/project/ProjectItem";

function ProjectDetail () {

    const dispatch = useDispatch();
    const { projectCode } =useParams();
    const { project } = useSelector(state => state.projectReducer);

    useEffect(() => {
        dispatch(callProjectDetailAPI({projectCode}));
    }, []);

    return (
        <>
            {
                project &&
                <div className="project-detail-div">
                    <ProjectItem project={project}/>
                </div>
            }
        </>
    )
}

export default ProjectDetail;