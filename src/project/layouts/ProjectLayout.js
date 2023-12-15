import Header from "../../dashBoard/components/common/Header";
import ProjectNavBar from "../components/common/ProjectNavBar";
import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import React from "react";

function ProjectLayout() {


    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center" />
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