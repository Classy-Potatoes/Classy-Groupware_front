import {authRequest} from "../../common/apis/Api";
import {postSuccess} from "../modules/ProjectModule";
import async from "async";



/* 프로젝트 글 작성 */
export const callProjectPostRegistAPI = ({ projectPostRequest }) => {

    return async (disPatch, getState ) => {

        const result = await authRequest.post(`/cg-api/v1/post`, projectPostRequest);

        console.log('callProjectPostRegistAPI :', result);

        if(result?.status === 201) {
            disPatch(postSuccess());
        }
    }
}