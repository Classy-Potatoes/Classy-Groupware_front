
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



/* 액션 함수 */
export const { member : { signupResult, loginResult, searchIdResult,
                            duplicateIdResult, searchInfoCodeResult, pwdChangeResult
                            } } = createActions({

   [ SIGNUP_RESULT ] : isSignUpResult => ({ signupResult : isSignUpResult }),
   [ LOGIN_RESULT ] : isLoginResult => ({ loginResult : isLoginResult }),
   [ SEARCH_ID_RESULT ] : result => ({ searchIdResult : result.data }),
   [ DUPLICATE_ID_RESULT ] : result => ({ duplicateIdResult : { isCheck : result.data } }),
   [ SEARCH_INFO_CODE_RESULT ] : result => ({ searchInfoCodeResult : result.data }),
   [ PWD_CHANGE_RESULT ] : result => ({ pwdChangeResult : result.data  }),

});


/* 리듀서 함수 */
const memberReducer = handleActions({

   [ SIGNUP_RESULT ] : ( state, { payload } ) => payload,
   [ LOGIN_RESULT ] : ( state, { payload } ) => payload,
   [ SEARCH_ID_RESULT ] : ( state, { payload } ) => payload,
   [ DUPLICATE_ID_RESULT ] : ( state, { payload } ) => ({...state, ...payload}),
   [ SEARCH_INFO_CODE_RESULT ] : ( state, { payload } ) => payload,
   [ PWD_CHANGE_RESULT ] : ( state, { payload } ) => payload,

}, initialState);


export default memberReducer;

