import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import approvalReducer from "../../appreval/modules/ApprovalModule";
import {callReportWaitingAPI} from "../../appreval/apis/ReportAPICalls";
import DashBoardMyApprevalList from "../components/list/DashBoardMyApprevalList";

function DashBoardMyAppreval() {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { reportWaiting } = useSelector(state => state.approvalReducer);

    useEffect(() => {
        dispatch(callReportWaitingAPI({currentPage}));
    }, [currentPage]);

    return (
        <>
            {
                reportWaiting
                &&
                <DashBoardMyApprevalList data={reportWaiting.data}/>
            }
        </>
    );
}

export default DashBoardMyAppreval;