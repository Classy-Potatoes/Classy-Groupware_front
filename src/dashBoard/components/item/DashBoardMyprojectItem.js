import {useNavigate} from "react-router-dom";

function DashBoardMyprojectItem({project}) {

    const navigate = useNavigate();

    const onClickMoveProjectDetail = (projectCode) => {
         navigate(`/projects/${projectCode}`);
    }

    return(
        <>
            <div className="dashBoard-project-item">
                <div>[{project.deptName}]</div>
                <div
                    className="dashBoard-project-Title"
                    onClick={ () => onClickMoveProjectDetail(project.projectCode) }
                >{project.projectTitle}</div>
                <div>
                    <label>마감 날짜 : </label>
                    {project.projectEndDate}
                </div>
            </div>
        </>
    );
}

export default DashBoardMyprojectItem;