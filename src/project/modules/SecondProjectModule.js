import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const GET_ALL_MANAGERS = 'project/GET_ALL_MANAGERS';
const GET_SCHEDULE_LIST = 'project/GET_SCHEDULE_LIST';
const GET_TODO_LIST = 'project/GET_TODO_LIST';

/* 액션 함수 */
export const { project : {getAllManagers, getScheduleList, getTodoList} } = createActions({
    [GET_ALL_MANAGERS] : (result) => ({ allManagers : result.data }),
    [GET_SCHEDULE_LIST] : (result) => ({ allSchedules : result.data }),
    [GET_TODO_LIST] : (result) => ({ allTodoList : result.data })
});

/* 리듀서 */
const secondProjectReducer = handleActions({
    [GET_ALL_MANAGERS] : (state, { payload }) => payload,
    [GET_SCHEDULE_LIST] : (state, { payload }) => payload,
    [GET_TODO_LIST] : (state, { payload }) => payload,

}, initialState);

export default secondProjectReducer;