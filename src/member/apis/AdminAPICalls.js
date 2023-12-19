import {authRequest } from "../../common/apis/Api";
import {toast} from "react-toastify";
import {
    getNonMembers, getAdminMembers, adminUpdateProfile,
    getJobs, getDepts, infoRegistResult, infoDeleteResult, getProfileAdmin, historyDeleteResult,
} from "../modules/AdminModule";


// 부서 목록 조회
export const callDeptListAPI = () => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/deptList`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
            console.log(e);
        });

        console.log('callDeptListAPI result : ', result);

        if( result?.status === 200 ) {
            dispatch( getDepts( result ) );
        }

    }

};


// 직급 목록 조회
export const callJobListAPI = () => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/jobList`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
            console.log(e);
        });

        console.log('callJobListAPI result : ', result);

        if( result?.status === 200 ) {
            dispatch( getJobs( result ) );
        }

    }

};


// 회원 목록 조회
export const callAdminMembersAPI = ( { currentPage } ) => {

    return async (dispatch, getState) => {

        const result =
            await authRequest.get(`/cg-api/v1/ad/members?page=${currentPage}`,
                {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).catch(e => {
                console.log(e);
            });

        console.log('callAdminMembersAPI result : ', result);

        if(result?.status === 200) {
            dispatch( getAdminMembers( result ) );
        }

    }

};


// 회원 목록 조회(search)
export const callAdminMembersSearchAPI = ( { infoName, currentPage } ) => {

    return async (dispatch, getState) => {

        const result =
            await authRequest.get(`/cg-api/v1/ad/members/search?infoName=${infoName}&page=${currentPage}`,
                {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).catch(e => {
                console.log(e);
            });

        console.log('callAdminMembersSearchAPI result : ', result);

        if(result?.status === 200) {
            dispatch( getAdminMembers( result ) );
        }

    }

};


// 회원 조회(관리자)
export const callAdminMemberProfileAPI = ( memberCode ) => {

    return async (dispatch, getState) => {

        const result =
            await authRequest.get(`/cg-api/v1/ad/members/${ memberCode }`,
                {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).catch(e => {
                console.log(e);
            });

        console.log('callAdminMemberProfileAPI result : ', result);

        if( result?.status === 200 ) {
            dispatch( getProfileAdmin( result ) );
        }

    }

};


// 회원 수정(관리자)
export const callAdminProfileUpdateAPI = ( { updateRequest, updateImgRequest, selectMemberCode } ) => {

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
            await authRequest.put(`/cg-api/v1/ad/member/update/${ selectMemberCode }`, formData).catch(e => {
                console.log(e);
            });

        console.log('callAdminProfileUpdateAPI result : ', result);


        if( result?.status === 201 ) {

            toast.success('회원 정보가 수정되었습니다.', {
                autoClose : 1000,
                onClose : () => {
                    dispatch( adminUpdateProfile( true ) );
                }
            });
        } else {
            toast.success('수정 실패', {
                autoClose : 1000
            });
        }


    }

};


// 미등록 회원 목록 조회
export const callNonMembersAPI = ( { currentPage } ) => {

    return async (dispatch, getState) => {

        const result =
            await authRequest.get(`/cg-api/v1/ad/nonMembers?page=${currentPage}`,
                {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).catch(e => {
                console.log(e);
            });

        console.log('callNonMembersAPI result : ', result);

        if(result?.status === 200) {
            dispatch( getNonMembers( result ) );
        }

    }

};


// 미분류 회원 목록 조회(search)
export const callNonMembersSearchAPI = ( { infoName, currentPage } ) => {

    return async (dispatch, getState) => {

        const result =
            await authRequest.get(`/cg-api/v1/ad/nonMembers/search?infoName=${infoName}&page=${currentPage}`,
                {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).catch(e => {
                console.log(e);
            });

        console.log('callNonMembersSearchAPI result : ', result);

        if(result?.status === 200) {
            dispatch( getNonMembers( result ) );
        }

    }

};


// 회원 사전 등록
export const callInfoRegistAPI = ({ registRequest }) => {

    return async (dispatch, getState) => {

        const result
            = await authRequest.post('/cg-api/v1/ad/member/info/regist', registRequest);

        console.log('callInfoRegistAPI result : ', result);

        if( result.status === 201 ) {
            toast.success('회원 사전 등록 완료', {
                autoClose : 1000
            });
           dispatch( infoRegistResult(true) );
        } else {
            toast.error('회원 등록 실패', {
                autoClose : 1000
            });
        }

    }
}

// 미등록 회원 삭제
export const callInfoDeleteAPI = ( infoCode ) => {

    return async (dispatch, getState) => {

        const result
            = await authRequest.delete(`/cg-api/v1/ad/nonMembers/delete?infoCode=${infoCode}`);

        console.log('callInfoDeleteAPI result : ', result);

        if( result.status === 204 ) {

            dispatch( infoDeleteResult( true ) );
        } else {
            toast.error('회원 삭제 실패', {
                autoClose : 1000
            });
        }

    }
}

// 히스토리 삭제
export const callDeleteHistoryAPI = ( historyCode ) => {

    return async (dispatch, getState) => {

        const result
            = await authRequest.delete(`/cg-api/v1/ad/history/delete?historyCode=${historyCode}`);

        console.log('onClickDeleteHistory result : ', result);

        if( result.status === 204 ) {
            toast.success('히스토리 삭제 완료', {
                autoClose : 1000,
                onClose: () => {
                    dispatch( historyDeleteResult( true ) )
                }
            });

        } else {
            toast.error('히스토리 삭제 실패', {
                autoClose : 1000
            });
        }

    }
}



