import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const POST_SUCCESS = 'project/POST_SUCCESS';
const GET_PROJECTS = 'project/GET_PROJECTS';
const GET_MYDEPTPROJECTS = 'project/GET_MYDEPTPROJECTS';
const GET_PROJECT = 'project/GET_PROJECT';
const GET_PROJECTMEMBER = 'project/GET_PROJECTMEMBER';
const GET_MYTASK = 'project/GET_MYTASK';
const PUT_SUCCESS = 'project/PUT_SUCCESS';
const GET_MYDEPTMEMBER = 'project/GET_MYDEPTMEMBER';


/* 액션 함수 */ /* 액션 객체를 만들어서 반환 */
export const { project :  { postSuccess, getProjects, getMydeptprojects, getProject, getProjectmember, getMytask, putSuccess, getMydeptmember } } = createActions({
    [POST_SUCCESS] : () => ({ postSuccess: true}),
    [GET_PROJECTS] : result => ({ projects : result.data }),
    [GET_MYDEPTPROJECTS] : result => ({ myDeptProjects : result.data }),
    [GET_PROJECT] : result => ({ project : result.data }),
    [GET_PROJECTMEMBER] : result => ({ projectMember : result.data }),
    [GET_MYTASK] : result => ({ myTask : result.data }),
    [PUT_SUCCESS] :() => ({ putSuccess : true }),
    [GET_MYDEPTMEMBER] : result => ({ myDeptMember : result.data }),
});

/* 리듀서 */ /* 액션을 받아서 어떻게 실행할것인지. */
const projectReducer = handleActions({
    [POST_SUCCESS] : (state, { payload }) => ({ ...state, ...payload }),
    [GET_PROJECTS] : (state, { payload }) => ({ ...state, ...payload }),
    [GET_MYDEPTPROJECTS] : (state, { payload }) => ({ ...state, ...payload }),
    [GET_PROJECT] : (state, { payload }) => ({ ...state, ...payload }),
    [GET_PROJECTMEMBER] : (state, { payload }) => ({ ...state, ...payload }),
    [GET_MYTASK] : (state, {payload}) => ({ ...state, ...payload }),
    [PUT_SUCCESS] : (state, {payload}) => payload,
    [GET_MYDEPTMEMBER] : (state, { payload }) => ({ ...state, ...payload }),
}, initialState);

/* (state, { payload }) => payload 가  projectReducer에 저장되는 값 */

export default projectReducer;