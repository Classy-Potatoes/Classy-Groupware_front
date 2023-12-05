import {authRequest, request} from "../../common/apis/Api";
import {toast} from "react-toastify";
import {getProfile, loginFailure, loginSuccess, signupFailure, signupSuccess} from "../modules/MemberModule";
import {saveToken} from "../utils/TokenUtils";

export const callSignupAPI = ( { signupRequest } ) => {

    return async (dispatch, getState) => {

        const result = await request(
            'POST',
            '/member/signup',
            {'Content-Type':'application/json'},
            JSON.stringify( signupRequest )
            // javascript 에서 JSON 문자열 방식으로 바꿔줘야한다.
        );

        console.log('callSignupAPI result : ', result);

        // ? 하나 붙여주는게 undefined가 아닐 경우에만 가져온다.
        if(result?.status === 201) {
            dispatch( signupSuccess() );
        } else {
            dispatch( signupFailure() );
            toast.warning("회원 가입에 실패했습니다. 다시 시도해주세요.");
        }


    }

};



export const callLoginAPI = ( { loginRequest } ) => {

    return async (dispatch, getState) => {

        const result = await request(
            'POST',
            '/member/login',
            {'Content-Type':'application/json'},
            JSON.stringify( loginRequest )
            // javascript 에서 JSON 문자열 방식으로 바꿔줘야한다.
        );

        console.log('callLoginAPI result : ', result);
        // console.log('callLoginAPI result.headers : ', result.headers);
        // console.log('callLoginAPI result.headers[\'Access-Token\'] : ', result.headers['Access-Token']);
        // console.log('callLoginAPI result.headers[\'Refresh-Token\'] : ', result.headers['Refresh-Token']);

        if( result?.status === 200 ) {

            saveToken( result.headers );
            dispatch( loginSuccess() );

        } else {
            dispatch( loginFailure() );
        }

    }

};


// export const callMemberAPI = () => {
//
//     return async (dispatch, getState) => {
//
//         // 인증이 필요하기 때문에 authRequest를 사용 (일반적인건 Request 사용했다)
//         const result = await authRequest.get('/api/v1/member');
//
//         console.log('callMemberAPI result : ', result);
//
//         if ( result.status === 200 ) {
//             dispatch( getProfile( result ) );
//         }
//
//     }
//
// }
