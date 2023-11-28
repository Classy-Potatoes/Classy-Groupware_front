
import {getAllSchedule, getPersonalSchedule, getProjectSchedule} from "../modules/CalendarModule";
import {request} from "./Apis";

export const callCalendarListAPI = () => {

    return async (dispatch, getState) => {

        const result = await request('GET', `/cg-api/v1/calendar`);
        console.log('callCalendarListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getAllSchedule(result));
        }

    }
};

export const callProjectListAPI = () => {

    return async (dispatch, getState) => {

        const result = await request('GET', `/cg-api/v1/calendar-project`);
        console.log('callProjectListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getProjectSchedule(result));
        }

    }
};

export const callPersonalListAPI = () => {

    return async (dispatch, getState) => {

        const result = await request('GET', `/cg-api/v1/calendar-personal`);
        console.log('callPersonalListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getPersonalSchedule(result));
        }

    }
};

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
// export const callAdminProductRegistAPI = ({ registRequest }) => {
//
//     return async (dispatch, getState) => {
//
//         const result = await authRequest.post('/api/v1/products', registRequest);
//         console.log('callAdminProductRegistAPI result : ', result);
//
//         if(result.status === 201) {
//             dispatch(postSuccess());
//             toast.info("상품 등록이 완료 되었습니다.");
//         }
//
//     }
// }
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
// export const callAdminProductModifyAPI = ({ productCode, modifyRequest }) => {
//
//     return async (dispatch, getState) => {
//
//         const result = await authRequest.put(`/api/v1/products/${productCode}`, modifyRequest);
//         console.log('callAdminProductModifyAPI result : ', result);
//
//         if(result.status === 201) {
//             dispatch(putSuccess());
//             toast.info("상품 수정이 완료 되었습니다.");
//         }
//
//     }
// }
//
// export const callAdminProductRemoveAPI = ({ productCode }) => {
//
//     return async (dispatch, getState) => {
//
//         const result = await authRequest.delete(`/api/v1/products/${productCode}`);
//         console.log('callAdminProductRemoveAPI result : ', result);
//
//         if(result.status === 204) {
//             window.location.replace("/product-management");
//             toast.info("상품 삭제가 완료 되었습니다.");
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
