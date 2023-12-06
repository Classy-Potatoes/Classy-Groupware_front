
import {authRequest} from "../../common/apis/Api";
import {toast} from "react-toastify";
import {postSuccess} from "../modules/ProjectModule";

export const callProjectRegistAPI = ({ projectRegistRequest }) => {

    return async (dispatch, getState ) => {

        const result = await authRequest.post(`/cg-api/v1/projects`,
            JSON.stringify(projectRegistRequest),
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
                    toast.error("프로젝트 생성이 불가합니다. ");
                    console.error('Error:', e);
        });

        console.log('callProjectRegistAPI result : ', result);

        if(result?.status === 201) {
            dispatch(postSuccess());
            toast.info("새 프로젝트 생성이 완료 되었습니다.");
        }
    }
}
