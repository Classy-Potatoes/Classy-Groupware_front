import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const GET_WRITER_INFO = 'approval/GET_WRITER_INFO';
const POST_LETTER_SUCCESS = 'approval/POST_LETTER_SUCCESS';
const POST_VACATION_SUCCESS = 'approval/POST_VACATION_SUCCESS'
/* 액션 함수 */
export const {approval: { getWriterInfo,postLetterSuccess,postVacationSuccess }} = createActions({
    [GET_WRITER_INFO] : result => ({writer : result.data}),
    [POST_LETTER_SUCCESS] : () => ({letterSuccess : true}),
    [POST_VACATION_SUCCESS] : () => ({vacationSuccess : true})
});

/* 리듀서 함수 */
const approvalReducer = handleActions({
    [GET_WRITER_INFO] : (state, {payload}) => payload,
    [POST_LETTER_SUCCESS] : (state, {payload}) => payload,
    [POST_VACATION_SUCCESS] : (state, {payload}) => payload


}, initialState); //리듀서 함수는 초기값을 가지고 진행하는 상태가 좋다

export default approvalReducer;