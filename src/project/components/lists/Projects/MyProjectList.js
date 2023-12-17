import ProjectListItem from "../../items/project/ProjectListItem";

function MyProjectList({ data }) {

    return(
        <div>
            <div className="projects-div">
                <p>내가 참여중인 프로젝트</p>
                {
                    data &&
                    data.map((project, index) => <ProjectListItem key={project.projectCode || index} project={project}/>)
                }
            </div>
        </div>
    );
}

export default MyProjectList;