import {authRequest} from "../../common/apis/Api";
import {getNoteListMembers, getNoteMember, getNotes, postSuccess} from "../modules/NoteModule";
import {getNote} from "../modules/NoteModule";
import {toast} from "react-toastify";

export const callNoteReceivedListAPI = ({ currentPage }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/note/received?page=${ currentPage }`);
        console.log('callNoteReceivedListAPI result : ', result)

        if (result.status === 200) {
            dispatch(getNotes(result))
        }

    }

};

export const callNoteSentListAPI = ({ currentPage }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/note/sent?page=${ currentPage }`);
        console.log('callNoteSentListAPI result : ', result)

        if (result.status === 200) {
            dispatch(getNotes(result))
        }

    }

};

export const callNoteImportantListAPI = ({ currentPage }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/note/important?page=${ currentPage }`);
        console.log('callNoteImportantListAPI result : ', result)

        if (result.status === 200) {
            dispatch(getNotes(result))
        }

    }

};

export const callNoteReceivedSearchAPI = ({ searchCondition, searchValue, currentPage }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/note/received/search?searchCondition=${searchCondition}&searchValue=${searchValue}&page=${currentPage}`);

        console.log('callNoteReceivedSearchAPI result: ', result);

        if (result.status === 200) {
            dispatch(getNotes(result));
        }

    };

};

/* 받은 쪽지 삭제 */
export const callNoteReceivedRemoveAPI = ({ noteCode }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.delete(`/cg-api/v1/note/received/${ noteCode }`);
        console.log('callNoteReceivedRemoveAPI result:', result);

        if(result.status === 204) {
            window.location.replace("/note/received");
        }

    }

}

/* 보낸 쪽지 삭제 */
export const callNoteSentRemoveAPI = ({ noteCode }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.delete(`/cg-api/v1/note/sent/${ noteCode }`);
        console.log('callNoteSentRemoveAPI result:', result);

        if(result.status === 204) {
            window.location.replace("/note/sent");
        }

    }

}

export const callNoteReceivedAPI = ({ noteCode }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/note/received/${ noteCode }`);
        console.log('callNoteReceivedAPI result : ', result)

        if (result.status === 200) {
            dispatch(getNote(result))
        }

    }

};

/* 쪽지 전송 */
export const callNoteSendAPI = ({ sendRequest }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.post('/cg-api/v1/note/send', JSON.stringify(sendRequest),
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
                toast.error("쪽지 발송이 불가합니다.");
        })
        console.log('callNoteSendAPI result : ', result);

        if (result.status === 201) {
            dispatch(postSuccess());
            toast.info("💌쪽지 전송 완료!");
        }

    }

}


export const callNoteRecipientAPI = ({ currentPage = 1, infoName }) => {

    return async (dispatch, getState) => {

        try {
            const result = await authRequest.get(`/cg-api/v1/note/member/search?page=${ currentPage }&infoName=${ infoName }`);
            console.log('callNoteRecipientAPI: ', result);

            if (result.status === 200) {
                dispatch(getNoteMember(result));
            }
        } catch (error) {
            console.error('API 호출 오류:', error);
        }
    };

}

/* 쪽지 작성 시 회원 목록 조회 */
export const callNoteListMembersAPI = ({ currentPage })  => {

    return async (dispatch, getState) => {

        const result =
            await authRequest.get(`/cg-api/v1/note/member/list?page=${currentPage}`,
                {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).catch(e => {
                console.log(e);
            });

        console.log('callNoteListMembersAPI result : ', result);

        if(result?.status === 200) {
            dispatch( getNoteListMembers( result ) );
        }

    }

};