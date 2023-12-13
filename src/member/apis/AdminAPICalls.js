import {authRequest } from "../../common/apis/Api";
import {toast} from "react-toastify";
import {
    getNonMembers,
    getJobs, getDepts, infoRegistResult,
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


// 미분류 회원 목록 조회
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



