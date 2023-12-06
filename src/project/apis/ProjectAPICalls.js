import async from "async";
import {authRequest} from "../../common/apis/Api";

export const callProjectRegisAPI = ({projectCode}) => {

    return async (dispatch, getState ) => {

        const result = await authRequest.get(`/cg-api/v1/projects/${projectCode}`);
        console.log('callProjectRegistAPI result : ', result);

        // if(result.status === 200) {
        //     dispatch(getNewProject(result));
        // }
    }
}