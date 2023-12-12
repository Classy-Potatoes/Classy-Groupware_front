
import {authRequest, request} from "../../common/apis/Api";
import {toast} from "react-toastify";
import {
    getMydeptmember,
    getMydeptprojects, getMytask,
    getProject,
    getProjectmember,
    getProjects,
    postSuccess, putSuccess
} from "../modules/ProjectModule";
import async from "async";

/* 프로젝트 생성 */
export const callProjectRegistAPI = ({ projectRegistRequest }) => {

    return async (dispatch, getState ) => {

        const result = await authRequest.post(`/cg-api/v1/projects`,
            JSON.stringify(projectRegistRequest),
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
                    toast.error("프로젝트 생성이 불가합니다. ");
                    console.error('Error:', e);
        });

        console.log('callProjectRegistAPI result : ', result);

        if(result?.status === 201) {
            dispatch(postSuccess());
        }
    }
};

/* 내가 참여한 프로젝트 조회 */
export const callMyProjectListAPI = ({ currentPage = 1 }) => {

    return async (dispatch, getState) => {

        const result
            = await authRequest.get(`/cg-api/v1/projects/myProjects?page=${currentPage}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
            console.log(e);
        });

        console.log('callMyProjectListAPI : ', result);

        if(result?.status === 200) {
            dispatch(getProjects(result));
        }
    }
};

/* 내 부서 프로젝트 조회 */
export const callMyDeptProjectListAPI = ({ currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result
            = await authRequest.get(`/cg-api/v1/projects/myDept?page=${currentPage}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
            console.log(e);
        });

        console.log('callMyDeptProjectListAPI : ', result);

        if(result?.status === 200) {
            dispatch(getMydeptprojects(result));
        }
    }
};

/* 프로젝트 디테일 */
export const callProjectDetailAPI = ({ projectCode }) => {

    return async (disPatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/projects/${projectCode}`);

        console.log('callProjectDetailAPI :', result);

       if(result?.status === 200) {
            disPatch(getProject(result));
       }
    }
};


/* 프로젝트 참여자 조회 */
export const callProjectInviteAPI = ({ projectCode }) =>{

    return async (disPatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/projects/${projectCode}/searchMember`);

        console.log('callProjectInviteAPI :', result);
        if(result?.status === 200) {
            disPatch(getProjectmember(result));
        }
    }
};

/* 내 업무 조회 */
export const callProjectMyTasktListAPI = ({currentPage = 1}) => {

    return async (disPatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/task/myTask?page=${currentPage}`);

        console.log('callProjectMyTasktListAPI :' , result);

        if(result?.status === 200) {
            disPatch(getMytask(result));
        }
    }
}

/* 프로젝트 수정 */
export const callProjectModifyAPI = ({projectCode, projectModifyRequest}) => {

    return async (disPatch, getState) => {

        const result = await authRequest.put(`/cg-api/v1/projects/${projectCode}`, projectModifyRequest);

        if(result.status === 201) {
            disPatch(putSuccess());
            toast.info("프로젝트 수정이 완료 되었습니다.");
        }
    }
}

/* 프로젝트 삭제 */
export const callProjectRemoveAPI =({projectCode}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.delete(`/cg-api/v1/projects/${projectCode}`);

        console.log('callProjectRemoveAPI result : ', result);

        if(result.status === 204) {
            window.location.replace("/projects");
            toast.info("프로젝트 삭제가 완료 되었습니다.");
        }

    }
}

/* 부서별 회원 조회 */
export const callMyDeptMemberAPI = ({ deptCode }) =>{

    return async (disPatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/dept/${deptCode}/member`);

        console.log('callMyDeptMemberAPI :', result);

        console.log('callMyDeptMemberAPI - deptCode:', deptCode);

        if(result?.status === 200) {
            disPatch(getMydeptmember(result));
        }
    }
};

/* 부서별 회원 검색하기 */
export const callDeptMemberSearchAPI = ({ deptCode,infoName }) => {

    return async (disPatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/dept/${deptCode}/search?infoName=${infoName}`);

        console.log('callDeptMemberAPI :', result);

        if(result?.status === 200) {
            disPatch(getMydeptmember(result));
        }
    }
}

/* 프로젝트 초대하기 */
export const callInviteMemberAPI = ({ projectInviteMemberRequests }) => {

    return async (disPatch, getState ) => {

        const result = await authRequest.post(`/cg-api/v1/invite`, projectInviteMemberRequests);

        console.log('callInviteMemberAPI :', result);

        if(result?.status === 201) {
            disPatch(postSuccess());
        }

    }
}


