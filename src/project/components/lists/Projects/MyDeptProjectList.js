import ProjectListItem from "../../items/project/ProjectListItem";


function MyDeptProjectList({ data }) {

    return(
        <div>
            <div className="projects-div">
                <p>내 부서 프로젝트</p>
                {
                    data &&
                    data.map((project, index) => <ProjectListItem key={project.projectCode || index} project={project}/>)
                }
            </div>
        </div>
    );
}

export default MyDeptProjectList;