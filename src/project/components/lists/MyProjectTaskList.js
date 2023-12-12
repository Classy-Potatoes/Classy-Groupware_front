import MyProjectTaskListItem from "../items/MyProjectTaskListItem";
import ProjectListItem from "../items/ProjectListItem";

function MyProjectTaskList ({ data}) {

    return (
        <>
            <div className="myTask-div">
                <div>
                    <p>내 업무</p>
                </div>
                <div className="myTask-Tilte">
                    <table className="myTask-contents">
                        <thead>
                        <tr>
                            <th>번호</th>
                            <th>글제목</th>
                            <th>작성날짜</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                {data &&
                    data.map((projectTask, index) => (
                        <MyProjectTaskListItem key={projectTask.taskCode || index} projectTask={projectTask} />
                    ))}
            </div>
        </>
    );
}

export default MyProjectTaskList;