import ProjectDetail from "../../pages/projects/ProjectDetail";
import ProjectInvite from "../../pages/projects/ProjectInvite";

function ProjectRight() {

    return (
        <div className="project-rayout-right">
            <div className= "project-detail-div">
                <ProjectDetail/>
            </div>
            <div className="project-invite-div">
                <ProjectInvite/>
            </div>
        </div>
    );
}

export default ProjectRight;