import {authRequest} from "../../common/apis/Api";
import {getProjectTask, postSuccess, putSuccess} from "../modules/ProjectTaskModule";
import async from "async";



/* 업무 조회 */
export const callProjectTaskListAPI = ({ projectCode, currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/projects/${projectCode}/task?page=${currentPage}`);

        console.log('callProjectTaskListAPI' , result);

        if(result?.status === 200) {
            dispatch(getProjectTask(result));
        }
    }
};

/* 업무 수정 */
export const callProjectTaskModifyAPI = ({ taskCode, TaskUpdateRequest}) => {

    return async (disPatch, getState) => {

        const result = await authRequest.put(`/cg-api/v1/task/${taskCode}`, TaskUpdateRequest);

        if(result.status === 201) {
            disPatch(putSuccess());
        }
    }
}

/* 업무 삭제 */
export const callProjectTaskDeleteAPI = ({ taskCode })=> {

    return async (dispatch, getState) => {

        const result = await authRequest.delete(`/cg-api/v1/task/${taskCode}`);

        if(result.status === 204) {
            window.location.reload();
        }
    }
}

/* 업무 댓글 작성 */
export const callProjectTaskReplyRegistAPI = ({ replyCreateRequest }) => {

    return async (disPatch, getState ) => {

        const result = await authRequest.post(`/cg-api/v1/task/reply`, replyCreateRequest);


        if(result?.status === 201) {
            disPatch(postSuccess());
        }
    }
};


/* 업무 댓글 수정 */

export const callPeojectTaskReplyModifyAPI = ({replyCode, replyRequest }) => {

    return async (disPatch, getState) => {

        const result = await authRequest.put(`/cg-api/v1/reply/${replyCode}`, replyRequest);

        if(result.status === 201) {
            disPatch(putSuccess());
        }
    }
};

/* 업무 댓글 삭제 */
export const callProjectTaskReplyDeleteAPI = ({ replyCode })=> {

    return async (dispatch, getState) => {

        const result = await authRequest.delete(`/cg-api/v1/reply/${replyCode}`);

        if(result?.status === 204) {
            window.location.reload();
        }
    }
}
