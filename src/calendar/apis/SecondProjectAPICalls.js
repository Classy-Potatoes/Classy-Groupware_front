import {authRequest, request} from "./Apis";
import {toast} from "react-toastify";
import {
    getMyTodoList,
    getScheduleList,
    getTodoList,
    postSuccess,
    putSuccess
} from "../../project/modules/SecondProjectModule";

/* 일정 APIS */
export const callProjectScheduleRegistAPI = ({ registRequest, projectCode }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.post(`/cg-api/v1/projects/${projectCode}/schedule`,
            JSON.stringify(registRequest),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .catch(res => {
                if (res.response.data.code === 9000) {
                    toast.error("제목을 입력해주세요.");
                } else if (res.response.data.code === 4006) {
                    toast.error("시작일을 입력해주세요.");
                } else if (res.response.data.code === 4008) {
                    toast.error("시작일이 종료일보다 이전이어야 합니다.");
                }
            })

        console.log('callProjectScheduleRegistAPI result : ', result);
        if (result != undefined) {
            if (result.status === 201) {
                toast.info("일정 등록이 완료 되었습니다.");
                dispatch(postSuccess());
            }
        }
    }
};
export const callScheduleListAPI = ({ projectCode, currentPage = 1 }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/projects/${projectCode}/schedule?page=${currentPage}`);
        console.log('callScheduleListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getScheduleList(result));
        }

    }
};

export const callProjectScheduleModifyAPI = ({ registRequest, projectCode, scheduleCode }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.put(`/cg-api/v1/projects/${projectCode}/schedule/${scheduleCode}`,
            registRequest)
            .catch(res => {
                if (res.response.data.code === 9000) {
                    toast.error("제목을 입력해주세요.");
                } else if (res.response.data.code === 4006) {
                    toast.error("시작일을 입력해주세요.");
                } else if (res.response.data.code === 4008) {
                    toast.error("시작일이 종료일보다 이전이어야 합니다.");
                }
            })

        console.log('callProjectScheduleModifyAPI result : ', result);
        if (result != undefined) {
            if (result.status === 201) {
                toast.info("일정 수정이 완료 되었습니다.");
                dispatch(postSuccess());
            }
        }
    }
};

export const callProjectScheduleDeleteAPI = ({ projectCode, scheduleCode }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.delete(`/cg-api/v1/projects/${projectCode}/schedule/${scheduleCode}`);
        console.log('callProjectScheduleDeleteAPI result : ', result);

        if(result.status === 204) {
            toast.info("일정 삭제가 완료 되었습니다.");
            dispatch(postSuccess())
        }
    }
}

export const callProjectScheduleReplyRegistAPI = ({ registRequest, projectCode, scheduleCode }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.post(`/cg-api/v1/projects/${projectCode}/schedule/${scheduleCode}/reply`,
            registRequest)
            .catch(res => {
                if (res.response.data.code === 4013) {
                    toast.error("작성된 댓글 내용이 없습니다.");
                }
            })

        console.log('callProjectScheduleReplyRegistAPI result : ', result);
        if (result != undefined) {
            if (result.status === 201) {
                toast.info("댓글 등록이 완료 되었습니다.");
                dispatch(postSuccess())
            }
        }
    }
};

export const callProjectReplyUpdateAPI = ({ projectCode, scheduleCode, replyCode, registRequest }) => {

    return async (dispatch, getState) => {

        console.log("확인 : ", registRequest)

        const result = await authRequest.put(`/cg-api/v1/projects/${projectCode}/schedule/${scheduleCode}/reply/${replyCode}`,
            JSON.stringify(registRequest),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .catch(res => {
                console.log(res,"res")
                if (res.response.data.code === 4013) {
                    toast.error("작성된 댓글 내용이 없습니다.");
                }
            })

        console.log('callProjectReplyUpdateAPI result : ', result);
        if (result === undefined) {
            toast.error("작성된 댓글 내용이 없습니다.");
        }
        if (result != undefined) {
            if (result.status === 201) {
                toast.info("일정 수정이 완료 되었습니다.");
                dispatch(postSuccess())
            }
        }
    }
};

export const callProjectReplyDeleteAPI = ({ replyCode }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.delete(`/cg-api/v1/reply/${replyCode}`);
        console.log('callProjectReplyDeleteAPI result : ', result);

        if(result.status === 204) {
            toast.info("일정 삭제가 완료 되었습니다.");
            dispatch(postSuccess())
        }
    }
}

/* 할일 APIS */
export const callTodoListAPI = ({ projectCode, currentPage = 1 }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/projects/${projectCode}/todo?page=${currentPage}`);
        console.log('callTodoListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getTodoList(result));
        }

    }
};

export const callProjectTodoRegistAPI = ({ registRequest, projectCode }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.post(`/cg-api/v1/projects/${projectCode}/todo`,
            JSON.stringify(registRequest),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .catch(res => {
                if (res.response.data.code === 9000) {
                    toast.error("제목을 입력해주세요.");
                } else if (res.response.data.code === 4006) {
                    toast.error("시작일을 입력해주세요.");
                }
            })

        console.log('callProjectTodoRegistAPI result : ', result);
        if (result != undefined) {
            if (result.status === 201) {
                toast.info("일정 등록이 완료 되었습니다.");
                dispatch(putSuccess());
            }
        }
    }
};

export const callCheckedTodoAPI = ({ projectCode, todoCode, todoListCode }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.put(`/cg-api/v1/projects/${projectCode}/todo/${todoCode}/${todoListCode}`
        )
            .catch(res => {
                if (res.response.data.code === 9000) {
                    toast.error("제목을 입력해주세요.");
                } else if (res.response.data.code === 4006) {
                    toast.error("시작일을 입력해주세요.");
                } else if (res.response.data.code === 4008) {
                    toast.error("시작일이 종료일보다 이전이어야 합니다.");
                }
            })

        console.log('callCheckedTodoAPI result : ', result);
        if (result != undefined) {
            if (result.status === 201) {
            }
        }
    }
};

export const callProjectTodoDeleteAPI = ({ projectCode, todoCode }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.delete(`/cg-api/v1/projects/${projectCode}/todo/${todoCode}`);
        console.log('callProjectTodoDeleteAPI result : ', result);

        if(result.status === 204) {
            toast.info("일정 삭제가 완료 되었습니다.");
            dispatch(postSuccess())
        }
    }
}

export const callProjectMyTodoListAPI = ({ projectCode }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/projects/${projectCode}/myTodoList`);
        console.log('callProjectMyTodoListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getMyTodoList(result));
        }

    }
};


