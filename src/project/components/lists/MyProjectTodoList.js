import MyProjectTodoListItem from "../items/MyProjectTodoListItem";

function MyProjectTodoList () {

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
                            <th>작성날짜</th>
                        </tr>
                        </thead>
                    </table>
                </div>
               <MyProjectTodoListItem/>
            </div>
        </>
    );
}
export default MyProjectTodoList;