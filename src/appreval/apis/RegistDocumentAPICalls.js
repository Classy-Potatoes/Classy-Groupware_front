import {getWriterInfo, postExpenseSuccess, postLetterSuccess, postVacationSuccess} from "../modules/ApprovalModule";
import {authRequest} from "./approvalAPI";
import {toast} from "react-toastify";


export const callWriterInfoAPI = () => {
    return async (dispatch, getState) => {

        const result = await authRequest.get("/cg-api/v1/approval/letter");

        if (result.status === 200) {
            dispatch(getWriterInfo(result))
        }
    }
}

export const callRegistLetterAPI = ({letterRequest, navigate}) => {

    return async (dispatch, getState) => {
        const result = await authRequest.post('/cg-api/v1/approval/letter', letterRequest);


        if (result?.status === 201) {
            dispatch(postLetterSuccess());
            toast.success('품의서 작성이 완료 되었습니다.', {
                onClose: () => {

                    navigate('/approval/report-waiting');
                },
            });
        }
    };
};

export const callRegistVacationAPI = ({vacationRequest, navigate}) => {

    return async (dispatch, getState) => {
        const result = await authRequest.post('/cg-api/v1/approval/vacation', vacationRequest);


        if (result?.status === 201) {
            dispatch(postVacationSuccess());
            toast.success('휴가신청서 작성이 완료 되었습니다.', {
                onClose: () => {
                    navigate('/approval/report-waiting');

                },
            });
        }
    };
};

export const callRegistExpenseAPI = ({expenseRequest, navigate}) => {

    return async (dispatch, getState) => {
        const result = await authRequest.post('/cg-api/v1/approval/expense', expenseRequest);


        if (result?.status === 201) {
            dispatch(postExpenseSuccess());
            toast.success('지출결의서 작성이 완료 되었습니다.', {
                onClose: () => {
                    navigate('/approval/report-waiting');

                },
            });
        }
    };
};

