import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const POST_SUCCESS = 'projectTask/POST_SUCCESS';
const PUT_SUCCESS = 'projectTask/PUT_SUCCESS';
const GET_PROJECT_TASK = 'projectTask/GET_PROJECT_TASK';

/* 액션 함수 */ /* 액션 객체를 만들어서 반환 */
export const { projectTask : { postSuccess, putSuccess, getProjectTask  }} = createActions({

    [POST_SUCCESS] : () => ({ postSuccess: true}),
    [PUT_SUCCESS] :() => ({ putSuccess : true }),
    [GET_PROJECT_TASK] : result => ({ projectTask : result.data }),
});

/* 리듀서 */ /* 액션을 받아서 어떻게 실행할것인지. */
const projectTaskReducer = handleActions({
    [POST_SUCCESS] : (state, { payload }) => payload,
        // ({ ...state, ...payload }),
    [PUT_SUCCESS] : (state, {payload}) => payload,
    [GET_PROJECT_TASK] : (state, { payload }) => payload,

}, initialState);

export default projectTaskReducer;
