import ProjectTaskListItem from "../../items/projectTask/ProjectTaskListItem";

function ProjectTaskList({ data }) {

    return(
        <div>
            {
                data &&
                data.map((projectTask, index) => <ProjectTaskListItem key={projectTask.taskCode || index} projectTask={projectTask}/>)
            }
        </div>
    );
}

export default ProjectTaskList;