import MyProjectTodoListItem from "../items/MyProjectTodoListItem";

function MyProjectTodoList ({data}) {

    return (
        <>
            <div className="myTask-div">
                <div>
                    <p>내 할일</p>
                </div>
                <div className="myTask-Tilte">
                    <table className="myTask-contents">
                        <thead>
                        <tr>
                            <th>번호</th>
                            <th>글제목</th>
                            <th>마감일</th>
                        </tr>
                        </thead>
                    </table>
                </div>{data &&
                data.map((todo, index) => (
                    <MyProjectTodoListItem key={todo.todoListCode || index} todo={todo} />
                ))}
            </div>
        </>
    );
}
export default MyProjectTodoList;