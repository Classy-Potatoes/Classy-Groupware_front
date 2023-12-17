import DashBoardMyProjectTodoListItem from "../item/DashBoardMyProjectTodoListItem";
import DashBoardMyApprevalListItem from "../item/DashBoardMyApprevalListItem";

function DashBoardMyApprevalList({data}) {

    return (
        <>
            <div>
                <div className="dashBoard-project">
                    <img src="/project/Rectangle.png"/>
                    <p>내 기안서</p>
                    <img
                        className="goProjects"
                        src="/project/eva_arrow-left-fill.png"/>
                </div>
                {data &&
                    data.map((myAppreval, index) => (
                        <DashBoardMyApprevalListItem key={myAppreval.approvalCode || index} myAppreval={myAppreval} />
                    ))}
            </div>
        </>
    );
}

export default DashBoardMyApprevalList;