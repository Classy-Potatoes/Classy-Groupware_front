
/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션타입 */
const GET_NON_MEMBERS = 'admin/GET_NON_MEMBERS';
const GET_JOBS = 'admin/GET_JOBS';
const GET_DEPTS = 'admin/GET_DEPTS';
const INFO_REGIST_RESULT = 'admin/INFO_REGIST_RESULT';



/* 액션 함수 */
export const { admin : {
   getNonMembers, getJobs,
   getDepts, infoRegistResult, } } = createActions({

   [ GET_NON_MEMBERS ] : result => ({ getNonMembers : result.data }),
   [ GET_JOBS ] : result => ({ getJobs : result.data }),
   [ GET_DEPTS ] : result => ({ getDepts : result.data }),
   [ INFO_REGIST_RESULT ] : isRegiResult => ({ infoRegistResult : isRegiResult }),

});


/* 리듀서 함수 */
const adminReducer = handleActions({

   [ GET_NON_MEMBERS ] : ( state, { payload } ) => payload,
   [ GET_JOBS ] : ( state, { payload } ) => ({...state, ...payload}),
   [ GET_DEPTS ] : ( state, { payload } ) => ({...state, ...payload}),
   [ INFO_REGIST_RESULT ] : ( state, { payload } ) => ({...state, ...payload}),

}, initialState);


export default adminReducer;

