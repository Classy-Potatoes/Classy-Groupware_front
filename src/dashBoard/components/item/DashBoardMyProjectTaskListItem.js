import {useNavigate} from "react-router-dom";

function DashBoardMyProjectTaskListItem({ projectTask }) {

    const navigate = useNavigate();
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }


    const truncatedTitle = truncateText(projectTask.taskTitle, 5);

    const goDetailHandler = (projectCode) => {
        navigate(`/projects/${projectCode}`);
    }

    return (
        <>
            <div className="dashBoard-project-item">
                <div>
                    [{projectTask.taskCode}]
                </div>
                <div
                    onClick={ () => goDetailHandler(projectTask.projectCode) }

                    className="dashBoard-project-Title">
                    {truncatedTitle}
                </div>
                <div>
                    <label>마감 날짜 : </label>
                    {projectTask.taskEndDate}
                </div>
            </div>
        </>
    );
}

export default DashBoardMyProjectTaskListItem;