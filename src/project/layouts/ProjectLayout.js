import Header from "../../dashBoard/components/common/Header";
import ProjectNavBar from "../components/common/ProjectNavBar";
import {Outlet} from "react-router-dom";

function ProjectLayout() {


    return (
        <>
            <Header/>
            <div className="projectsContainer">
                <ProjectNavBar/>
                <main className="projectsView">
                    <Outlet/>
                </main>
            </div>
        </>
    );
}

export default ProjectLayout;