
/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션타입 */
const GET_NON_MEMBERS = 'admin/GET_NON_MEMBERS';
const GET_ADMIN_MEMBERS = 'admin/GET_ADMIN_MEMBERS';
const GET_JOBS = 'admin/GET_JOBS';
const GET_DEPTS = 'admin/GET_DEPTS';
const INFO_REGIST_RESULT = 'admin/INFO_REGIST_RESULT';
const INFO_DELETE_RESULT = 'admin/INFO_DELETE_RESULT';
const GET_PROFILE_ADMIN = 'admin/GET_PROFILE_ADMIN';
const ADMIN_UPDATE_PROFILE = 'admin/ADMIN_UPDATE_PROFILE';
const HISTORY_DELETE_RESULT = 'admin/HISTORY_DELETE_RESULT';



/* 액션 함수 */
export const { admin : {
   getNonMembers, getAdminMembers, getJobs, getDepts, infoRegistResult,
   infoDeleteResult, getProfileAdmin, adminUpdateProfile, historyDeleteResult,
} } = createActions({

   [ GET_NON_MEMBERS ] : result => ({ getNonMembers : result.data }),
   [ GET_ADMIN_MEMBERS ] : result => ({ getAdminMembers : result.data }),
   [ GET_JOBS ] : result => ({ getJobs : result.data }),
   [ GET_DEPTS ] : result => ({ getDepts : result.data }),
   [ INFO_REGIST_RESULT ] : isRegiResult => ({ infoRegistResult : isRegiResult }),
   [ INFO_DELETE_RESULT ] : isDeleteResult => ({ infoDeleteResult : isDeleteResult }),
   [ GET_PROFILE_ADMIN ] : result => ({ getProfileAdmin : result.data }),
   [ ADMIN_UPDATE_PROFILE ] : isUpdateResult => ({ adminUpdateProfile : isUpdateResult }),
   [ HISTORY_DELETE_RESULT ] : isHistoryDeleteResult => ({ historyDeleteResult : isHistoryDeleteResult }),

});


/* 리듀서 함수 */
const adminReducer = handleActions({

   [ GET_NON_MEMBERS ] : ( state, { payload } ) => payload,
   [ GET_ADMIN_MEMBERS ] : ( state, { payload } ) => payload,
   [ GET_JOBS ] : ( state, { payload } ) => ({...state, ...payload}),
   [ GET_DEPTS ] : ( state, { payload } ) => ({...state, ...payload}),
   [ INFO_REGIST_RESULT ] : ( state, { payload } ) => ({...state, ...payload}),
   [ INFO_DELETE_RESULT ] : ( state, { payload } ) => ({...state, ...payload}),
   [ GET_PROFILE_ADMIN ] : ( state, { payload } ) => ({...state, ...payload}),
   [ ADMIN_UPDATE_PROFILE ] : ( state, { payload } ) => ({...state, ...payload}),
   [ HISTORY_DELETE_RESULT ] : ( state, { payload } ) => ({...state, ...payload}),

}, initialState);


export default adminReducer;

