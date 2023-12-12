import {authRequest} from "../../common/apis/Api";
import {postSuccess} from "../modules/ProjectModule";
import async from "async";



/* 프로젝트 업무 작성 */
export const callProjectTaskRegistAPI = ({ projecttaskRequest }) => {

    return async (disPatch, getState ) => {

        const result = await authRequest.post(`/cg-api/v1/task`, projecttaskRequest);

        console.log('callProjectTaskRegistAPI :', result);

        if(result?.status === 201) {
            disPatch(postSuccess());
        }
    }
}