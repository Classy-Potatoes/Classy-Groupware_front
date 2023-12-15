import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const GET_ALL_MANAGERS = 'project/GET_ALL_MANAGERS';
const GET_SCHEDULE_LIST = 'project/GET_SCHEDULE_LIST';
const GET_TODO_LIST = 'project/GET_TODO_LIST';
const POST_SUCCESS = 'project/POST_SUCCESS';
const GET_MY_TODO_LIST = 'project/GET_MY_TODO_LIST';

/* 액션 함수 */
export const { project : {getAllManagers, getScheduleList, getTodoList, postSuccess, putSuccess, getMyTodoList} } = createActions({
    [GET_ALL_MANAGERS] : (result) => ({ allManagers : result.data }),
    [GET_SCHEDULE_LIST] : (result) => ({ allSchedules : result.data }),
    [GET_TODO_LIST] : (result) => ({ allTodoList : result.data }),
    [POST_SUCCESS] : () => ({ postSuccess: true }),
    [POST_SUCCESS] : () => ({ putSuccess: true }),
    [GET_MY_TODO_LIST] : (result) => ({ myTodoList: result.data }),
});

/* 리듀서 */
const secondProjectReducer = handleActions({
    [GET_ALL_MANAGERS] : (state, { payload }) => payload,
    [GET_SCHEDULE_LIST] : (state, { payload }) => payload,
    [GET_TODO_LIST] : (state, { payload }) => payload,
    [POST_SUCCESS] : (state, { payload }) => payload,
    [POST_SUCCESS] : (state, { payload }) => ({...state, ...payload}),
    [GET_MY_TODO_LIST] : (state, { payload }) => payload

}, initialState);

export default secondProjectReducer;