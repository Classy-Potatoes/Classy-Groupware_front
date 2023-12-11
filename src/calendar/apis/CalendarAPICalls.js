import {
    deleteSuccess,
    getAllSchedule,
    getPersonalSchedule,
    getProjectSchedule,
    getScheduleDetail, postSuccess
} from "../modules/CalendarModule";
import {authRequest, request} from "./Apis";
import {toast} from "react-toastify";

export const callCalendarListAPI = () => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/calendar`);
        console.log('callCalendarListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getAllSchedule(result));
        }
    }
};

export const callProjectListAPI = () => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/calendar-project`);
        console.log('callProjectListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getProjectSchedule(result));
        }

    }
};

export const callPersonalListAPI = () => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/calendar-personal`);
        console.log('callPersonalListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getPersonalSchedule(result));
        }

    }
};

export const callScheduleDetailAPI = ({ scheduleCode }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/cg-api/v1/calendar/${scheduleCode}`);
        console.log('callScheduleDetailAPI result : ', result);

        if(result.status === 200) {
            dispatch(getScheduleDetail(result));
        }

    }
};

export const callScheduleRemoveAPI = ({ personalCode }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.delete(`/cg-api/v1/calendar/${personalCode}`);
        console.log('callScheduleRemoveAPI result : ', result);

        if(result.status === 204) {
            toast.info("일정 삭제가 완료 되었습니다.");
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }
}

export const callScheduleRegistAPI = ({ registRequest }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.post('/cg-api/v1/calendar',
            // {
            //     'Content-Type': 'application/json'
            // },
            // JSON.stringify(registRequest))
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

        console.log('callScheduleRegistAPI result : ', result);
        if (result != undefined) {
            if (result.status === 201) {
                toast.info("일정 등록이 완료 되었습니다.");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        }
    }
}

export const callScheduleModifyAPI = ({ calendarCode, modifyRequest }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.put(`/cg-api/v1/calendar/${calendarCode}`,
            // {
            //     'Content-Type': 'application/json'
            // },
            // JSON.stringify(modifyRequest))
            modifyRequest)
            .catch(res => {
                if (res.response.data.code === 9000) {
                    toast.error("제목을 입력해주세요.");
                } else if (res.response.data.code === 4006) {
                    toast.error("시작일을 입력해주세요.");
                } else if (res.response.data.code === 4008) {
                    toast.error("시작일이 종료일보다 이전이어야 합니다.");
                }
            });

        console.log('callScheduleModifyAPI result : ', result);
        if (result != undefined) {
            if (result.status === 201) {
                toast.info("일정 수정이 완료 되었습니다.");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        }
    }
}

// export const callProductCategoryListAPI = ({ categoryCode, currentPage = 1 }) => {
//
//     return async (dispatch, getState) => {
//
//         const result = await request('GET', `/api/v1/products/categories/${categoryCode}?page=${currentPage}`);
//         console.log('callProductCategoryListAPI result : ', result);
//
//         if(result.status === 200) {
//             dispatch(getProducts(result));
//         }
//
//     }
// };
//
// export const callProductSearchListAPI = ({ productName, currentPage = 1 }) => {
//
//     return async (dispatch, getState) => {
//
//         const result = await request('GET', `/api/v1/products/search?productName=${productName}&page=${currentPage}`);
//         console.log('callProductSearchListAPI result : ', result);
//
//         if(result.status === 200) {
//             dispatch(getProducts(result));
//         }
//
//     }
// };
//
// export const callProductDetailAPI = ({ productCode }) => {
//
//     return async (dispatch, getState) => {
//
//         const result = await request('GET', `/api/v1/products/${productCode}`);
//         console.log('callProductDetailAPI result : ', result);
//
//         if(result.status === 200) {
//             dispatch(getProduct(result));
//         }
//
//     }
// };
//
// export const callAdminProductListAPI = ({ currentPage = 1 }) => {
//
//     return async (dispatch, getState) => {
//
//         const result
//             = await authRequest.get(`/api/v1/products-management?page=${currentPage}`);
//
//         console.log('callAdminProductListAPI result : ', result);
//
//         if(result.status === 200) {
//             dispatch(getAdminProducts(result));
//         }
//
//     }
// };
//
//
// export const callAdminProductAPI = ({ productCode }) => {
//
//     return async (dispatch, getState) => {
//
//         const result = await authRequest.get(`/api/v1/products-management/${productCode}`);
//         console.log('callAdminProductAPI result : ', result);
//
//         if(result.status === 200) {
//             dispatch(getAdminProduct(result));
//         }
//
//     }
// }
//
//
//
//
//
//
//
//
//
//
//
//
