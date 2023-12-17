import {useDispatch, useSelector} from "react-redux";
import ProjectListItem from "../../../project/components/items/project/ProjectListItem";
import DashBoardMyprojectItem from "../item/DashBoardMyprojectItem";
import {useEffect, useState} from "react";
import {callMyProjectListAPI} from "../../../project/apis/ProjectAPICalls";
import {useNavigate} from "react-router-dom";

function DashBoardMyprojectList({data}) {

    const navigate = useNavigate();

    const onClickmoveProjectsHandler = () => {
        navigate('/projects');
    }


    return(
        <>
        <div>
            <div className="dashBoard-project">
                <img src="/project/Rectangle.png"/>
                <p>프로젝트</p>
                <img
                    className="goProjects"
                    onClick={ onClickmoveProjectsHandler }
                    src="/project/eva_arrow-left-fill.png"/>
            </div>
            {
                data &&
                data.map((project, index) => <DashBoardMyprojectItem key={project.projectCode || index} project={project}/>)
            }
        </div>
        </>
    );
}

export default DashBoardMyprojectList;