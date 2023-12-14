import {authRequest} from "../../common/apis/Api";
import async from "async";
import {toast} from "react-toastify";
import {getProjectPost, postSuccess, putSuccess} from "../modules/ProjectPostMedule";



/* 프로젝트 글 작성 */
export const callProjectPostRegistAPI = ({ projectPostRequest }) => {

    return async (disPatch, getState ) => {

        const result = await authRequest.post(`/cg-api/v1/post`, projectPostRequest);

        console.log('callProjectPostRegistAPI :', result);

        if(result?.status === 201) {
            disPatch(postSuccess());
        }
    }
};

/* 프로젝트 글 조회 */
export const callProjectPostListAPI = ({ projectCode, currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/projects/${projectCode}/post?page=${currentPage}`);

        console.log('callProjectPostListAPI' , result);

        if(result?.status === 200) {
            dispatch(getProjectPost(result));
        }
    }
};

/* 프로젝트 글 수정 */
export const callProjectPostModifyAPI = ({postCode, postUpdateRequest}) => {

    return async (disPatch, getState) => {

        const result = await authRequest.put(`/cg-api/v1/post/${postCode}`, postUpdateRequest);

        if(result.status === 201) {
            disPatch(putSuccess());
            toast.info("게시글 수정이 완료 되었습니다.");
        }
    }
}

/* 프로젝트 글 삭제 */
export const callProjectPostDeleteAPI = ({ postCode })=> {

    return async (dispatch, getState) => {

        const result = await authRequest.delete(`/cg-api/v1/post/${postCode}`);

        console.log('callProjectPostDeleteAPI result : ', result);

        if(result.status === 204) {
            window.location.reload();
            toast.info("게시글 삭제가 완료 되었습니다.");
        }

    }
}

/* 프로젝트 글 댓글 작성 */
export const callProjectPostReplyRegistAPI = ({ replyCreateRequest }) => {

    return async (disPatch, getState ) => {

        const result = await authRequest.post(`/cg-api/v1/post/reply`, replyCreateRequest);

        console.log('callProjectPostReplyRegistAPI :', result);

        if(result?.status === 201) {
            disPatch(postSuccess());
        }
    }
};


/* 프로젝트 글 댓글 수정 */

export const callPeojectPostReplyModifyAPI = ({replyCode, replyRequest }) => {

    return async (disPatch, getState) => {

        const result = await authRequest.put(`/cg-api/v1/reply/${replyCode}`, replyRequest);

        if(result.status === 201) {
            disPatch(putSuccess());
            toast.info("댓글 수정이 완료 되었습니다.");
        }
    }
};

/* 프로젝트 글 댓글 삭제 */
export const callProjectPostReplyDeleteAPI = ({ replyCode })=> {

    return async (dispatch, getState) => {

        const result = await authRequest.delete(`/cg-api/v1/reply/${replyCode}`);

        console.log('callProjectPostReplyDeleteAPI result : ', result);

        if(result?.status === 204) {
            window.location.reload();
            toast.info("댓글 삭제가 완료 되었습니다.");
        }

    }
}

