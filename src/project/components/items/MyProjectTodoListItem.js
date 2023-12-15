function MyProjectTodoListItem({todo}) {

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }


    const truncatedTitle = truncateText(todo.todoBody, 5);


    return (
        <>
            <div>
                <div>
                    <table className="myTask-contents">
                        <tbody>
                        <tr>
                            <td>{todo.todoListCode}</td>
                            <td className="truncate">{truncatedTitle}</td>
                            <td>{todo.endDate}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default MyProjectTodoListItem;