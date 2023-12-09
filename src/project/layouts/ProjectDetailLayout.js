import Header from "../../dashBoard/components/common/Header";
import ProjectNavBar from "../components/common/ProjectNavBar";
import {Outlet} from "react-router-dom";
import ProjectDetail from "../pages/projects/ProjectDetail";
import ProjectInvite from "../pages/projects/ProjectInvite";
import ProjectRight from "../components/common/ProjectRight";

function ProjectDetailLayout() {


    return (
        <>
            <div className="project-rayout-div" >
                <main className="projectsView">
                    <Outlet/>
                </main>
                <ProjectRight/>
            </div>
        </>
    );
}

export default ProjectDetailLayout;