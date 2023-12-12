function MyProjectTodoListItem() {

    return (
        <>
            <div>
                <div>
                    <table className="myTask-contents">
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td className="truncate">제목</td>
                            <td>생성 날짜</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default MyProjectTodoListItem;