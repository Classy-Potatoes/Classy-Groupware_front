import {authRequest} from "../../common/apis/Api";
import {getNotes} from "../modules/NoteModule";
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

/* 받은 쪽지 삭제 */
export const callNoteReceivedRemoveAPI = ({ noteCode }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.delete(`/cg-api/v1/note/received/${ noteCode }`);
        console.log('callNoteReceivedRemoveAPI result:', result);

        if (result && result.status === 204) {
            toast.info("🗑️쪽지가 삭제되었습니다.");
        }

    }

}

export const callNoteReceivedAPI = ({ currentPage }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/note/received?page=${ currentPage }`);
        console.log('callNoteListAPI result : ', result)

        if (result.status === 200) {
            dispatch(getNotes(result))
        }

    }

};

export const callNoteReceivedBodyAPI = ({ searchCondition, searchValue }) => {

    return async (dispatch, getState) => {

        const result =
            await authRequest.get(`/cg-api/v1/note/received/search?searchCondition=${ searchCondition }&searchValue=${ searchValue }`);
        console.log('callNoteReceivedBodyAPI result : ', result)

        if (result.status === 200) {
            dispatch(getNotes(result))
        }

    }

}