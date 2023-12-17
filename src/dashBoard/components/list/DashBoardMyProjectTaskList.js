import MyProjectTaskListItem from "../../../project/components/items/projectTask/MyProjectTaskListItem";
import DashBoardMyProjectTaskListItem from "../item/DashBoardMyProjectTaskListItem";
import {useNavigate} from "react-router-dom";

function DashBoardMyProjectTaskList({data}) {

    const navigate = useNavigate();

    const onClickmoveProjectsHandler = () => {
        navigate('/projects/myTask');
    }

    return (
        <>
            <div>
                <div className="dashBoard-project">
                    <img src="/project/Rectangle.png"/>
                    <p>요청받은 업무</p>
                    <img
                        className="goProjects"
                        onClick={ onClickmoveProjectsHandler }
                        src="/project/eva_arrow-left-fill.png"/>
                </div>
                {data &&
                    data.map((projectTask, index) => (
                        <DashBoardMyProjectTaskListItem key={projectTask.taskCode || index} projectTask={projectTask} />
                ))}
            </div>
        </>
    );
}

export default DashBoardMyProjectTaskList;