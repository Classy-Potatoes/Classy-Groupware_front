function DashBoardMyApprevalListItem({ myAppreval }) {

    return (
        <>
            <div className="dashBoard-project-item">
                <div>
                    [{myAppreval.approvalStatusType}]
                </div>
                <div className="dashBoard-project-Title">
                    {myAppreval.documentTitle}
                </div>
                <div>
                    {myAppreval.approvalRegistDate}
                </div>
            </div>

        </>
    );
}

export default DashBoardMyApprevalListItem;