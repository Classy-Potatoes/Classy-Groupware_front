
/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션타입 */
const SIGNUP_RESULT = 'member/SIGNUP_RESULT';
const LOGIN_RESULT = 'member/LOGIN_RESULT';
const SEARCH_ID_RESULT = 'member/SEARCH_ID_RESULT';
const DUPLICATE_ID_RESULT = 'member/DUPLICATE_ID_RESULT';
const SEARCH_INFO_CODE_RESULT = 'member/SEARCH_INFO_CODE_RESULT';
const PWD_CHANGE_RESULT = 'member/PWD_CHANGE_RESULT';
const MEMBER_RETURN_RESULT = 'member/MEMBER_RETURN_RESULT';
const GET_PROFILE = 'member/GET_PROFILE';
const UPDATE_PROFILE = 'member/UPDATE_PROFILE';
const GET_NETWORK_MEMBERS = 'member/GET_NETWORK_MEMBERS';
const GET_PROFILE_NETWORK = 'member/GET_PROFILE_NETWORK';



/* 액션 함수 */
export const { member : { signupResult, loginResult, searchIdResult,
                            duplicateIdResult, searchInfoCodeResult, pwdChangeResult,
                           memberReturnResult, getProfile, updateProfile, getNetworkMembers,
                           getProfileNetwork,
                            } } = createActions({

   [ SIGNUP_RESULT ] : isSignUpResult => ({ signupResult : isSignUpResult }),
   [ LOGIN_RESULT ] : isLoginResult => ({ loginResult : isLoginResult }),
   [ SEARCH_ID_RESULT ] : result => ({ searchIdResult : result.data }),
   [ DUPLICATE_ID_RESULT ] : result => ({ duplicateIdResult : { isCheck : result.data } }),
   [ SEARCH_INFO_CODE_RESULT ] : result => ({ searchInfoCodeResult : result.data }),
   [ PWD_CHANGE_RESULT ] : result => ({ pwdChangeResult : result.data  }),
   [ MEMBER_RETURN_RESULT ] : isReturnResult => ({ memberReturnResult : isReturnResult  }),
   [ GET_PROFILE ] : result => ({ getProfile : result.data  }),
   [ UPDATE_PROFILE ] : isUpdateResult => ({ updateProfile : isUpdateResult  }),
   [ GET_NETWORK_MEMBERS ] : result => ({ getNetworkMembers : result.data  }),
   [ GET_PROFILE_NETWORK ] : result => ({ getProfileNetwork : result.data  }),

});


/* 리듀서 함수 */
const memberReducer = handleActions({

   [ SIGNUP_RESULT ] : ( state, { payload } ) => payload,
   [ LOGIN_RESULT ] : ( state, { payload } ) => payload,
   [ SEARCH_ID_RESULT ] : ( state, { payload } ) => payload,
   [ DUPLICATE_ID_RESULT ] : ( state, { payload } ) => ({...state, ...payload}),
   [ SEARCH_INFO_CODE_RESULT ] : ( state, { payload } ) => payload,
   [ PWD_CHANGE_RESULT ] : ( state, { payload } ) => payload,
   [ MEMBER_RETURN_RESULT ] : ( state, { payload } ) => payload,
   [ GET_PROFILE ] : ( state, { payload } ) => payload,
   [ UPDATE_PROFILE ] : ( state, { payload } ) => payload,
   [ GET_NETWORK_MEMBERS ] : ( state, { payload } ) => ({...state, ...payload}),
   [ GET_PROFILE_NETWORK ] : ( state, { payload } ) => ({...state, ...payload}),

}, initialState);


export default memberReducer;

