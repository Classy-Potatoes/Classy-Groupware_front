
/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션타입 */
const SIGNUP_RESULT = 'member/SIGNUP_RESULT';
const LOGIN_RESULT = 'member/LOGIN_RESULT';
const SEARCH_ID_RESULT = 'member/SEARCH_ID_RESULT';
const SEARCH_PWD_RESULT = 'member/SEARCH_PWD_RESULT';
// const GET_PROFILE = 'member/GET_PROFILE';



/* 액션 함수 */
export const { member : { signupResult, loginResult, searchIdResult,
                           searchPwdResult,
                           getProfile } } = createActions({

   [ SIGNUP_RESULT ] : isSignUpResult => ({ signupResult : isSignUpResult }),
   [ LOGIN_RESULT ] : isLoginResult => ({ loginResult : isLoginResult }),
   [ SEARCH_ID_RESULT ] : result => ({ searchIdResult : result.data }),
   [ SEARCH_PWD_RESULT ] : result => ({ searchPwdResult : result.data }),
   // [ GET_PROFILE ] : ( result ) => ({ profileInfo : result.data })


});


/* 리듀서 함수 */
const memberReducer = handleActions({

   [ SIGNUP_RESULT ] : ( state, { payload } ) => payload,
   [ LOGIN_RESULT ] : ( state, { payload } ) => payload,
   [ SEARCH_ID_RESULT ] : ( state, { payload } ) => payload,
   [ SEARCH_PWD_RESULT ] : ( state, { payload } ) => payload,
   // [ GET_PROFILE ] : ( state, { payload } ) => payload

}, initialState);


export default memberReducer;

