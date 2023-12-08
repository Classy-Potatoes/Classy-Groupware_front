import {getWriterInfo, postLetterSuccess} from "../modules/ApprovalModule";
import {authRequest} from "./approvalAPI";
import {toast} from "react-toastify";

export const callWriterInfoAPI = () => {

    return async (dispatch, getState) => {

        const result = await authRequest.get("/cg-api/v1/approval/letter");
        console.log('callLoginUserAPI result : ', result);

        if (result.status === 200) {
            dispatch(getWriterInfo(result))
        }
    }
}

export const callRegistLetterAPI = ({letterRequest}) => {

    return async (dispatch, getState) => {
        const result = await authRequest.post('/cg-api/v1/approval/letter', letterRequest);

        console.log('callLetterAPI result : ', result);

        if (result?.status === 201) {
            dispatch(postLetterSuccess());
            toast.success('품의서 작성이 완료 되었습니다.', {
                onClose: () => {
                    /* 상신함을 만들고 작성완료되면 상신함으로 이동 예정 */
                    window.location.reload(); // 임시코드

                },
            });
        }
    };
};