function MyProjectTaskListItem({ projectTask }) {


    return (
        <>
            <div>
                <div>
                    <table className="myTask-contents">
                        <tbody>
                        <tr>
                            <td>{projectTask.taskCode}</td>
                            <td className="truncate">{projectTask.taskTitle}</td>
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