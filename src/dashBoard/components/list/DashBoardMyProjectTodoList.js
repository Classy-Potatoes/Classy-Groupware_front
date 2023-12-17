import DashBoardMyProjectTaskListItem from "../item/DashBoardMyProjectTaskListItem";
import DashBoardMyProjectTodoListItem from "../item/DashBoardMyProjectTodoListItem";

function DashBoardMyProjectTodoList({data}) {

    return(
        <>
            <div>
                <div className="dashBoard-project">
                    <img src="/project/Rectangle.png"/>
                    <p>내 할일</p>
                    <img
                        className="goProjects"
                        src="/project/eva_arrow-left-fill.png"/>
                </div>
                {data &&
                    data.map((projectTodo, index) => (
                        <DashBoardMyProjectTodoListItem key={projectTodo.todoListCode || index} projectTodo={projectTodo} />
                    ))}
            </div>
        </>
    );
}

export default DashBoardMyProjectTodoList;