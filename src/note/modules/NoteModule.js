import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const POST_SUCCESS = 'note/POST_SUCCESS';
const GET_NOTES = 'note/GET_NOTES';
const GET_NOTE = 'note/GET_NOTE';
const SELECT_RECIPIENT = 'note/SELECT_RECIPIENT';

/* 액션 함수 */
export const { note : { postSuccess, getNotes, getNote, selectRecipient } } = createActions({
    [POST_SUCCESS] : () => ({ postSuccess : true }),
    [GET_NOTES] : result => ({ notes : result.data }), /*data 속성이 사용하려고 하는 정보가 담긴 속성 */
    [GET_NOTE] : result => ({ note : result.data }), /*data 속성이 사용하려고 하는 정보가 담긴 속성 */
    [SELECT_RECIPIENT]: (selectedRecipient) => ({ selectedRecipient }),
});

/* 리듀서 */
const noteReducer = handleActions({
    [POST_SUCCESS] : (state, { payload }) => ({ ...state, ...payload }),
    [GET_NOTES] : (state, { payload }) => ({ ...state, ...payload }),
    [GET_NOTE] : (state, { payload }) => ({ ...state, ...payload }),
    [SELECT_RECIPIENT]: (state, { payload }) => ({
        ...state,
        selectedRecipient: payload.selectedRecipient,
    }),
}, initialState);

export default noteReducer;