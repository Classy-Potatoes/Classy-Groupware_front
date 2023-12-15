import {authRequest, request} from "../../common/apis/Api";
import {toast} from "react-toastify";
import {
    loginResult, searchIdResult,
    signupResult, duplicateIdResult, searchInfoCodeResult,
    pwdChangeResult, memberReturnResult, getProfile, updateProfile,
} from "../modules/MemberModule";
import {saveToken} from "../utils/TokenUtils";
import {getAdminMembers} from "../modules/AdminModule";

// 회원가입
export const callSignupAPI = ( { signupRequest, signupImgRequest } ) => {

    const modifiedRequest = {
        ...signupRequest,
        infoEmail: signupRequest.infoEmail + signupRequest.emailUrl
    };

    // 필요없는 필드 삭제
    delete modifiedRequest.emailUrl;

    // 폼과 파일 합치는 부분
    const formData = new FormData();
    formData.append("profileImg", signupImgRequest );
    formData.append("memberRequest", new Blob([ JSON.stringify( modifiedRequest ) ], { type : 'application/json' }));


    return async (dispatch, getState) => {

        const result = await request(
            'POST',
            '/cg-api/v1/non/member/regist',
            {},
            formData
        );

        console.log('callSignupAPI result : ', result);

        if( result.status === 201 ) {

            toast.success('회원가입이 완료 되었습니다.', {
                autoClose : 1000,
                onClose : () => {
                    dispatch( signupResult( true ) );
                }
            });
        } else {
            toast.success('가입 실패', {
                autoClose : 1000
            });
        }

    }

};


// 로그인
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

        if( result?.status === 200 ) {

            saveToken( result.headers );
            dispatch( loginResult( true ) );

        } else {
            dispatch( loginResult( false ) );
        }

    }

};


// 사번 찾기
export const callSearchInfoCodeAPI = ( { searchInfoCodeRequest } ) => {

    return async (dispatch, getState) => {

        const result = await request(
            'POST',
            '/cg-api/v1/non/member/info/search',
            {'Content-Type':'application/json'},
            JSON.stringify( searchInfoCodeRequest )
        );

        console.log('callSearchInfoCodeAPI result : ', result);

        if( result?.status === 200 ) {
            dispatch( searchInfoCodeResult( result ) );
            toast.dismiss();
            toast.success('사번 확인, 계속 진행해주세요.', {
                autoClose : 1000
            });


        } else {
            toast.dismiss();
            toast.error(
                <div>일치하는 사번이 없습니다.<br />
                    관리자에게 문의하세요.
                </div>,
                {
                    autoClose : 1000
                }
            );
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

// 아이디 중복검사
export const callDuplicateIdAPI = ( { duplicateIdRequest } ) => {

    return async (dispatch, getState) => {

        const result = await request(
            'POST',
            '/cg-api/v1/non/member/duplicateId',
            {'Content-Type':'application/json'},
            JSON.stringify( duplicateIdRequest )
        );

        console.log('callDuplicateIdAPI result : ', result);

        if( result?.status === 200 ) {
            dispatch( duplicateIdResult( result ) );
        } else {
            toast.dismiss();
            toast.warning('검사 에러입니다. 다시 시도해주세요.', {
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

            toast.success(
                <div>입력해주신 이메일로<br />
                    임시비밀번호를 전송했습니다.
                </div>,
                {
                    autoClose : 1000,
                    onClose : () => {
                        window.location.replace("/");
                    },
                    style: { whiteSpace: 'pre-line' }
                }
            );
        } else {
            // 기존 메시지 모두 삭제.
            toast.dismiss();
            toast.error('아이디와 사번이 일치하지 않습니다.', {
                autoClose : 1000
            });
        }

    }

};


// 비밀번호 번경(마이페이지)
export const callPwdChangeAPI = (  { memberPwdRequest } ) => {

    return async (dispatch, getState) => {

        const result =
            await authRequest.put(`/cg-api/v1/member/pwdUpdate`, memberPwdRequest, {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
            }).catch(e => {
                console.log(e);
            });

        console.log('callPwdChangeAPI result : ', result);

        if( result?.status === 200 ) {
            if ( result.data === true ) {
                dispatch( pwdChangeResult( result ) );
            } else {
                toast.error('현재 비밀번호 불일치',
                    {
                        autoClose : 1000,
                    }
                );
            }
        }

    }

};


// 회원 반납(마이페이지)
export const callMemberReturnAPI = ( ) => {

    return async (dispatch, getState) => {

        const result =
            await authRequest.put(`/cg-api/v1/member/returnUser`, {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
                console.log(e);
            });

        console.log('callMemberReturnAPI result : ', result);

        if( result?.status === 201 ) {
            dispatch( memberReturnResult( true ) );
        }

    }

};



// 회원 조회(마이페이지)
export const callMyProfileAPI = () => {

    return async (dispatch, getState) => {

        const result =
            await authRequest.get(`/cg-api/v1/member/myProfile`,
                {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).catch(e => {
                console.log(e);
            });

        console.log('callMyProfileAPI result : ', result);

        if( result?.status === 200 ) {
            dispatch( getProfile( result ) );
        }

    }

};


// 회원 수정(마이페이지)
export const callMyProfileUpdateAPI = ( { updateRequest, updateImgRequest } ) => {

    const modifiedRequest = {
        ...updateRequest,
        infoEmail: updateRequest.infoEmail + updateRequest.emailUrl
    };

    // 필요없는 필드 삭제
    delete modifiedRequest.emailUrl;


    // 폼과 파일 합치는 부분
    const formData = new FormData();

    if ( updateImgRequest ) {
        formData.append("profileImage", updateImgRequest );
        formData.append("memberUpdateRequest", new Blob([ JSON.stringify( modifiedRequest ) ], { type : 'application/json' }));
    } else {
        formData.append("memberUpdateRequest", new Blob([ JSON.stringify( modifiedRequest ) ], { type : 'application/json' }));
    }


    return async (dispatch, getState) => {

        const result =
            await authRequest.put(`/cg-api/v1/member/myProfileUpdate`, formData).catch(e => {
                console.log(e);
            });

        console.log('callMyProfileUpdateAPI result : ', result);


        if( result?.status === 201 ) {

            toast.success('회원 정보가 수정되었습니다.', {
                autoClose : 1000,
                onClose : () => {
                    dispatch( updateProfile( true ) );
                }
            });
        } else {
            toast.success('수정 실패', {
                autoClose : 1000
            });
        }


    }

};



