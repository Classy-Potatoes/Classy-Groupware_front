import ProjectTaskReplyItem from "../../items/projectTask/ProjectTaskReplyItem";


function ProjectTaskReplyList({ projectTask }) {

    return(
        <>
            <div className="project-post-reply">
                {projectTask.replies &&
                    projectTask.replies.map((replies, index) =>
                        <ProjectTaskReplyItem key={replies.replyCode || index} replies={replies} projectTask={projectTask}/>)
                }
            </div>
        </>
    );
}

export default ProjectTaskReplyList;