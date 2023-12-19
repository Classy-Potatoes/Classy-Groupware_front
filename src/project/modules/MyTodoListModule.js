import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const GET_MY_TODO_LIST = 'project/GET_MY_TODO_LIST';

/* 액션 함수 */
export const { project : {getMyTodoList} } = createActions({
    [GET_MY_TODO_LIST] : (result) => ({ myTodoList: result.data })
});

/* 리듀서 */
const thirdProjectReducer = handleActions({
    [GET_MY_TODO_LIST] : (state, { payload }) => ({ ...state, ...payload }),

}, initialState);

export default thirdProjectReducer;