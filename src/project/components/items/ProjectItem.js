
function ProjectItem({ project }) {

    return (
        <>
            <div>
              <table>
                  <tbody>
                      <tr className="project-detail-tr">
                          <th>프로젝트 명</th>
                          <td>{project.projectTitle}</td>
                      </tr>
                      <tr className="project-detail-tr">
                          <th>시작 날짜</th>
                          <td>{project.projectStartDate}</td>
                      </tr>
                      <tr className="project-detail-tr">
                          <th>마감 날짜</th>
                          <td>{project.projectEndDate}</td>
                      </tr>
                  </tbody>
              </table>

            </div>
        </>
    );


}

export default ProjectItem;