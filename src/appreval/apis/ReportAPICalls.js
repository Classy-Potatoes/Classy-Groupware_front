import {authRequest} from "./approvalAPI";
import {
    getReportApprove, getReportApproveSearch, getReportDetail,
    getReportPaying, getReportPayingSearch,
    getReportRecall, getReportRecallSearch,
    getReportTurnback, getReportTurnbackSearch,
    getReportWaiting, getReportWaitingSearch,
    putApprovalstatusUpdateSuccess
} from "../modules/ApprovalModule";


export const callReportWaitingAPI = ({ currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/approval/report-waiting?page=${currentPage}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                },
            })
        if(result.status === 200) {
            dispatch(getReportWaiting(result));
        }
    }
}

export const callReportPayingAPI = ({ currentPage = 1}) => {
return async (dispatch, getState) => {
    const result = await authRequest.get(`/cg-api/v1/approval/report-paying?page=${currentPage}`,
    {
        headers : {
            'Content-Type' : 'application/json'
        },
    })
    if(result.status === 200) {
        dispatch(getReportPaying(result));
    }
}
}

export const callReportApproveAPI = ({ currentPage = 1}) => {
return async (dispatch, getState) => {
    const result = await authRequest.get(`/cg-api/v1/approval/report-approve?page=${currentPage}`,
    {
        headers : {
            'Content-Type' : 'application/json'
        },
    })
    if(result.status === 200) {
        dispatch(getReportApprove(result));
    }
}
}

export const callReportTurnbackAPI = ({ currentPage = 1}) => {
return async (dispatch, getState) => {
    const result = await authRequest.get(`/cg-api/v1/approval/report-turnback?page=${currentPage}`,
    {
        headers : {
            'Content-Type' : 'application/json'
        },
    })
    if(result.status === 200) {
        dispatch(getReportTurnback(result));
    }
}
}

export const callReportRecallAPI = ({ currentPage = 1}) => {
return async (dispatch, getState) => {
    const result = await authRequest.get(`/cg-api/v1/approval/report-recall?page=${currentPage}`,
    {
        headers : {
            'Content-Type' : 'application/json'
        },
    })
    if(result.status === 200) {
        dispatch(getReportRecall(result));
    }
}
}

/* 체크박스 체크한 기안서 회수 처리 */
export const callApprovalStatusUpdateAPI = ({approvalCode}) => {

    return async (dispatch, getState) => {

            const result = await authRequest.put('/cg-api/v1/approval/report-waiting', approvalCode);

            if (result?.status === 201) {
                dispatch(putApprovalstatusUpdateSuccess());

            }

    };
};

export const callReportWaitingSearchAPI = ({ documentTitle , startDate, endDate, currentPage = 1}) =>{
    return async  (dispatch, getState) => {
        const result = await authRequest.get( `/cg-api/v1/approval/report/search-waiting?documentTitle=${documentTitle}&startDate=${startDate}&endDate=${endDate}&page=${currentPage}`);


        if(result.status === 200) {
            dispatch(getReportWaitingSearch(result));
        }
    }
}

export const callReportPayingSearchAPI = ({ documentTitle , startDate, endDate, currentPage = 1}) =>{
    return async  (dispatch, getState) => {
        const result = await authRequest.get( `/cg-api/v1/approval/report/search-paying?documentTitle=${documentTitle}&startDate=${startDate}&endDate=${endDate}&page=${currentPage}`);


        if(result.status === 200) {
            dispatch(getReportPayingSearch(result));
        }
    }
}

export const callReportApproveSearchAPI = ({ documentTitle , startDate, endDate, currentPage = 1}) =>{
    return async  (dispatch, getState) => {
        const result = await authRequest.get( `/cg-api/v1/approval/report/search-approve?documentTitle=${documentTitle}&startDate=${startDate}&endDate=${endDate}&page=${currentPage}`);


        if(result.status === 200) {
            dispatch(getReportApproveSearch(result));
        }
    }
}

export const callReportTurnbackSearchAPI = ({ documentTitle , startDate, endDate, currentPage = 1}) =>{
    return async  (dispatch, getState) => {
        const result = await authRequest.get( `/cg-api/v1/approval/report/search-turnback?documentTitle=${documentTitle}&startDate=${startDate}&endDate=${endDate}&page=${currentPage}`);


        if(result.status === 200) {
            dispatch(getReportTurnbackSearch(result));
        }
    }
}

export const callReportRecallSearchAPI = ({ documentTitle , startDate, endDate, currentPage = 1}) =>{
    return async  (dispatch, getState) => {
        const result = await authRequest.get( `/cg-api/v1/approval/report/search-recall?documentTitle=${documentTitle}&startDate=${startDate}&endDate=${endDate}&page=${currentPage}`);


        if(result.status === 200) {
            dispatch(getReportRecallSearch(result));
        }
    }
}

export const callReportDetailAPI = ({approvalCode}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/cg-api/v1/approval/report/${approvalCode}`);

        if(result.status === 200) {
            dispatch(getReportDetail(result));
        }
    }
}




