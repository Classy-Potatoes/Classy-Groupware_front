import {authRequest, request} from "../../common/apis/Api";
import {getNotes, postSuccess} from "../modules/NoteModule";

export const callNoteListAPI = ({ currentPage }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/note/received?page=${ currentPage }`);
        console.log('callNoteListAPI result : ', result)

        if (result.status === 200) {
            dispatch(getNotes(result))
        }

    }

};