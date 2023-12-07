import {authRequest, request} from "../../common/apis/Api";
import {toast} from "react-toastify";
import {
    getProfile, loginResult, searchIdResult,
    signupResult,
} from "../modules/MemberModule";
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
            dispatch( signupResult(true) );
            toast.success('회원가입이 완료되었습니다.');
        } else {
            dispatch( signupResult(false) );
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
            dispatch( loginResult( true ) );

        } else {
            dispatch( loginResult( false ) );
        }

    }

};


// 아이디 찾기
export const callSearchIdAPI = ( { searchIdRequest } ) => {

    return async (dispatch, getState) => {

        const result = await request(
            'POST',
            '/cg-api/v1/non/member/search',
            {'Content-Type':'application/json'},
            JSON.stringify( searchIdRequest )
        );

        console.log('callSearchIdAPI result : ', result);

        if( result?.status === 200 ) {
            dispatch( searchIdResult( result ) );
        } else {
            // 기존 메시지 모두 삭제.
            toast.dismiss();
            toast.warning('일치하는 아이디가 없습니다.', {
                autoClose : 1000
            });
        }

    }

};


// 비밀번호(임시비번) 찾기
export const callEmailSearchPwdAPI = ( { searchPwdRequest } ) => {

    const modifiedRequest = {
        ...searchPwdRequest,
        infoEmail: searchPwdRequest.infoEmail + searchPwdRequest.emailUrl
    };

    // 필요없는 필드 삭제
    delete modifiedRequest.emailUrl;

    return async (dispatch, getState) => {

        const result = await request(
            'POST',
            '/cg-api/v1/non/member/pwdSearch/sendEmail',
            {'Content-Type':'application/json'},
            JSON.stringify( modifiedRequest )
        );

        console.log('callSearchPwdAPI result : ', result);

        if( result?.status === 200 ) {

            toast.success('입력해주신 이메일로\n 임시비밀번호를 전송했습니다.', {
                autoClose : 3000,
                onClose : () => {
                    window.location.replace("/");
                },
                style: { whiteSpace: 'pre-line' }
            });
        } else {
            // 기존 메시지 모두 삭제.
            toast.dismiss();
            toast.error('아이디와 사번이 일치하지 않습니다.', {
                autoClose : 1000
            });
        }

    }

};


export const callMemberAPI = () => {

    return async (dispatch, getState) => {

        // 인증이 필요하기 때문에 authRequest를 사용 (일반적인건 Request 사용했다)
        const result = await authRequest.get('/api/v1/member');

        console.log('callMemberAPI result : ', result);

        if ( result.status === 200 ) {
            dispatch( getProfile( result ) );
        }

    }

}
