function DashBoardMyProjectTodoListItem({projectTodo}) {

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }


    const truncatedTitle = truncateText(projectTodo.todoBody, 5);


    return(
        <>
            <div className="dashBoard-project-item">
                <div>[{projectTodo.todoListCode}]</div>
                <div className="dashBoard-project-Title">{truncatedTitle}</div>
                <div>{projectTodo.todoEndDate}</div>
            </div>
        </>
    );
}

export default DashBoardMyProjectTodoListItem;