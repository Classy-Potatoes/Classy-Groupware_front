import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const POST_SUCCESS = 'project/POST_SUCCESS';

/* 액션 함수 */
export const { project :  { postSuccess } } = createActions({
    [POST_SUCCESS] : () => ({ postSuccess: true}),
});

/* 리듀서 */
const projectReducer = handleActions({
    [POST_SUCCESS] : (state, { payload }) => ({ ...state, ...payload }),
}, initialState);

export default projectReducer;