import ProjectPostReplyItem from "../../items/projectPost/ProjectPostReplyItem";


function ProjectPostReplyList({ projectPost}) {

    return (
        <>
            <div className="project-post-reply">
                {projectPost.replies &&
                    projectPost.replies.map((replies, index) =>
                        <ProjectPostReplyItem key={replies.replyCode || index} replies={replies} projectPost={projectPost}/>)
                  }
            </div>
        </>
    );
}

export default ProjectPostReplyList;