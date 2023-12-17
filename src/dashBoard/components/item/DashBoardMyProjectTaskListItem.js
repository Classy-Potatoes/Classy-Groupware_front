function DashBoardMyProjectTaskListItem({ projectTask }) {
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }


    const truncatedTitle = truncateText(projectTask.taskTitle, 5);

    return (
        <>
            <div className="dashBoard-project-item">
                <div>
                    [{projectTask.taskCode}]
                </div>
                <div  className="dashBoard-project-Title">
                    {truncatedTitle}
                </div>
                <div>
                    {projectTask.taskRequestDate}
                </div>
            </div>
        </>
    );
}

export default DashBoardMyProjectTaskListItem;