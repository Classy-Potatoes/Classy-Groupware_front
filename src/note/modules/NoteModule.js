import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const POST_SUCCESS = 'note/POST_SUCCESS';
const GET_NOTES = 'note/GET_NOTES';

/* 액션 함수 */
export const { note : { postSuccess, getNotes } } = createActions({
    [POST_SUCCESS] : () => ({ postSuccess : true }),
    [GET_NOTES] : result => ({ notes : result.data }), /*data 속성이 사용하려고 하는 정보가 담긴 속성 */
});

/* 리듀서 */
const noteReducer = handleActions({
    [POST_SUCCESS] : (state, { payload }) => payload,
    [GET_NOTES] : (state, { payload }) => payload,
}, initialState);

export default noteReducer;