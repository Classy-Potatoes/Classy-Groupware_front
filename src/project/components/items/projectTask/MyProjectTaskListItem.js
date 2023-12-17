function MyProjectTaskListItem({ projectTask }) {

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }


    const truncatedTitle = truncateText(projectTask.taskTitle, 5);


        return (
        <>
            <div>
                <div>
                    <table className="myTask-contents">
                        <tbody>
                        <tr>
                            <td>{projectTask.taskCode}</td>
                            <td className="truncate">{truncatedTitle}</td>
                            <td>{projectTask.taskRequestDate}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default MyProjectTaskListItem;