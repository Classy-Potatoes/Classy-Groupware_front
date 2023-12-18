import {useNavigate} from "react-router-dom";

function DashBoardMyApprevalListItem({ myAppreval }) {

    const navigate = useNavigate();

    const onClickMoveProjectDetail = (approvalCode, documentType) => {
        switch (documentType){
            case "품의서" :
                return navigate(`/approval/report/letter/${approvalCode}`);
            case "지출결의서" :
                return  navigate(`/approval/report/expense/${approvalCode}`);
            case "휴가신청서" :
                return  navigate(`/approval/report/vacation/${approvalCode}`);
        }
    }

    return (
        <>
            <div className="dashBoard-project-item">
                <div>
                    [{myAppreval.approvalStatusType}]
                </div>
                <div className="dashBoard-project-Title">
                <span onClick={() => onClickMoveProjectDetail(myAppreval.approvalCode, myAppreval.documentType)}>
                    {myAppreval.documentTitle}
                </span>
                </div>
                <div>
                    {myAppreval.approvalRegistDate}
                </div>
            </div>

        </>
    );
}

export default DashBoardMyApprevalListItem;