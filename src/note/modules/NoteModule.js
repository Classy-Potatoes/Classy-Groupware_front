import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const POST_SUCCESS = 'note/POST_SUCCESS';
const GET_NOTES = 'note/GET_NOTES';
const GET_NOTE = 'note/GET_NOTE';
const GET_NOTE_MEMBER = 'note/GET_NOTE_MEMBER';
const SET_RECIPIENT_MEMBER = 'note/SET_RECIPIENT_MEMBER';
const GET_NOTE_LIST_MEMBERS = 'note/GET_NOTE_LIST_MEMBERS';
const SET_NOTE_RECEIVER = 'note/SET_NOTE_RECEIVER';
const PUT_SUCCESS = 'note/PUT_SUCCESS';
const GET_SEARCH_SUCCESS = 'note/GET_SEARCH_SUCCESS';

/* 액션 함수 */
export const { note : { postSuccess, getNotes, getNote, getNoteMember, setRecipientMember, getNoteListMembers, setNoteReceiver, putSuccess, getSearchSuccess } } = createActions({
    [POST_SUCCESS] : () => ({ postSuccess : true }),
    [GET_NOTES] : result => ({ notes : result.data }), /*data 속성이 사용하려고 하는 정보가 담긴 속성 */
    [GET_NOTE] : result => ({ note : result.data }), /*data 속성이 사용하려고 하는 정보가 담긴 속성 */
    [GET_NOTE_MEMBER]: result => ({ note : result.data }),
    [SET_RECIPIENT_MEMBER]: member => ({ recipientMember : member }),
    [GET_NOTE_LIST_MEMBERS] : result => ({ getNoteListMembers : result.data }),
    [SET_NOTE_RECEIVER] : noteReceiver =>({ noteReceiver: noteReceiver }),
    [PUT_SUCCESS] : ()=>({putSuccess : true}),
    [GET_SEARCH_SUCCESS] : result => ({ getSearchSuccess: result.data }),
});

/* 리듀서 */
const noteReducer = handleActions({
    [POST_SUCCESS] : (state, { payload }) => ({ ...state, ...payload }),
    [GET_NOTES] : (state, { payload }) => payload,
    [GET_NOTE] : (state, { payload }) => ({ ...state, ...payload }),
    [GET_NOTE_MEMBER] : (state, { payload }) => ({ ...state, ...payload }),
    [SET_RECIPIENT_MEMBER] : (state, { payload }) => ({ ...state, ...payload }),
    [GET_NOTE_LIST_MEMBERS] : (state, { payload }) => ({ ...state, ...payload }),
    [SET_NOTE_RECEIVER] : (state, { payload }) => ({ ...state, ...payload }),
    [PUT_SUCCESS] :(state,{payload}) =>  ({ ...state, ...payload }),
    [GET_SEARCH_SUCCESS] :(state,{payload}) =>  ({ ...state, ...payload }),
}, initialState);

export default noteReducer;