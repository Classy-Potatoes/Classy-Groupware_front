import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const POST_SUCCESS = 'project/POST_SUCCESS';
const GET_PROJECTS = 'project/GET_PROJECTS';
const GET_MYDEPTPROJECTS = 'project/GET_MYDEPTPROJECTS'

/* 액션 함수 */ /* 액션 객체를 만들어서 반환 */
export const { project :  { postSuccess, getProjects, getMydeptprojects } } = createActions({
    [POST_SUCCESS] : () => ({ postSuccess: true}),
    [GET_PROJECTS] : result => ({ projects : result.data }),
    [GET_MYDEPTPROJECTS] : result => ({ myDeptProjects : result.data }),
});

/* 리듀서 */ /* 액션을 받아서 어떻게 실행할것인지. */
const projectReducer = handleActions({
    [POST_SUCCESS] : (state, { payload }) => ({ ...state, ...payload }),
    [GET_PROJECTS] : (state, { payload }) => ({ ...state, ...payload }),
    [GET_MYDEPTPROJECTS] : (state, { payload }) => ({ ...state, ...payload }),
}, initialState);

/* (state, { payload }) => payload 가  projectReducer에 저장되는 값 */

export default projectReducer;