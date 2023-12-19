import {authRequest} from "./approvalAPI";
import {
    getSignApprove,
    getSignApproveSearch,
    getSignPaying,
    getSignPayingSearch,
    getSignTurnback,
    getSignTurnbackSearch,
    getSignWaiting,
    getSignWaitingSearch, postExpenseSuccess, putSignupSuccess
} from "../modules/ApprovalModule";
import {toast} from "react-toastify";

export const callSignWaitingAPI = ({ currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/approval/sign-waiting?page=${currentPage}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                },
            })
        if(result.status === 200) {
            dispatch(getSignWaiting(result));
        }
    }
}

export const callSignPayingAPI = ({ currentPage = 1}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/cg-api/v1/approval/sign-paying?page=${currentPage}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                },
            })
        if(result.status === 200) {
            dispatch(getSignPaying(result));
        }
    }
}

export const callSignApproveAPI = ({ currentPage = 1}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/cg-api/v1/approval/sign-approve?page=${currentPage}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                },
            })
        if(result.status === 200) {
            dispatch(getSignApprove(result));
        }
    }
}

export const callSignTurnbackAPI = ({ currentPage = 1}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/cg-api/v1/approval/sign-turnback?page=${currentPage}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                },
            })
        if(result.status === 200) {
            dispatch(getSignTurnback(result));
        }
    }
}

export const callSignWaitingSearchAPI = ({ documentTitle , startDate, endDate, currentPage = 1}) =>{
    return async  (dispatch, getState) => {
        const result = await authRequest.get( `/cg-api/v1/approval/sign/search-waiting?documentTitle=${documentTitle}&startDate=${startDate}&endDate=${endDate}&page=${currentPage}`);


        if(result.status === 200) {
            dispatch(getSignWaitingSearch(result));
        }
    }
}

export const callSignPayingSearchAPI = ({ documentTitle , startDate, endDate, currentPage = 1}) =>{
    return async  (dispatch, getState) => {
        const result = await authRequest.get( `/cg-api/v1/approval/sign/search-paying?documentTitle=${documentTitle}&startDate=${startDate}&endDate=${endDate}&page=${currentPage}`);


        if(result.status === 200) {
            dispatch(getSignPayingSearch(result));
        }
    }
}

export const callSignApproveSearchAPI = ({ documentTitle , startDate, endDate, currentPage = 1}) =>{
    return async  (dispatch, getState) => {
        const result = await authRequest.get( `/cg-api/v1/approval/sign/search-approve?documentTitle=${documentTitle}&startDate=${startDate}&endDate=${endDate}&page=${currentPage}`);


        if(result.status === 200) {
            dispatch(getSignApproveSearch(result));
        }
    }
}

export const callSignTurnbackSearchAPI = ({ documentTitle , startDate, endDate, currentPage = 1}) =>{
    return async  (dispatch, getState) => {
        const result = await authRequest.get( `/cg-api/v1/approval/sign/search-turnback?documentTitle=${documentTitle}&startDate=${startDate}&endDate=${endDate}&page=${currentPage}`);


        if(result.status === 200) {
            dispatch(getSignTurnbackSearch(result));
        }
    }
}

export const callReportSingUpAPI = ({signRequest, approvalCode, navigate}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.put(`/cg-api/v1/approval/report/${approvalCode}`, signRequest)

        if (result?.status === 201) {
            dispatch(putSignupSuccess())


        }
    }
}

