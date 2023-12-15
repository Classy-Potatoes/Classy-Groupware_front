import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const POST_SUCCESS = 'projectPost/POST_SUCCESS';
const PUT_SUCCESS = 'projectPost/PUT_SUCCESS';
const GET_PROJECT_POST = 'projectPost/GET_PROJECT_POST';

/* 액션 함수 */ /* 액션 객체를 만들어서 반환 */
export const { projectPost : { postSuccess, putSuccess,getProjectPost  }} = createActions({

    [POST_SUCCESS] : () => ({ postSuccess: true}),
    [PUT_SUCCESS] :() => ({ putSuccess : true }),
    [GET_PROJECT_POST] : result => ({ projectPost : result.data }),

});

/* 리듀서 */ /* 액션을 받아서 어떻게 실행할것인지. */
const projectPostReducer = handleActions({
    [POST_SUCCESS] : (state, { payload }) => ({ ...state, ...payload }),
    [PUT_SUCCESS] : (state, {payload}) => payload,
    [GET_PROJECT_POST] : (state, { payload }) => ({ ...state, ...payload }),

}, initialState);

export default projectPostReducer;