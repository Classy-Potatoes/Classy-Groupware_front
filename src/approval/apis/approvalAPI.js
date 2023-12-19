import axios from "axios";
import {getAccessTokenHeader, getRefreshTokenHeader, saveToken} from "../utils/TokenUtils";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const DEFAULT_URL = `http://${SERVER_IP}:${SERVER_PORT}`;
// 배포용
// const DEFAULT_URL = `http://${SERVER_IP}`;

/* 인증이 불필요한 기능을 요청할 때 사용하는 메소드 */
export const request = async (method, url, headers, data) => {
    return await axios({
        method,
        url : `${DEFAULT_URL}${url}`,
        headers,
        data
    })
        .catch(error => console.log(error));
}

/* 인증이 필요한 기능을 요청할 때 사용하는 객체 */
export const authRequest = axios.create({
    baseURL : DEFAULT_URL
});
// 인터셉터 요청을 할때는 항상 헤더에 token을 넣어서 한다
authRequest.interceptors.request.use((config) => {
    config.headers['Access-Token'] = getAccessTokenHeader();
    return config;
});
authRequest.interceptors.response.use(
// 첫 번째 인자로 사용 되는 콜백 함수는 정상 수행 시 동작이므로 별도의 동작 없이 진행하도록 한다
    (response) => {
        return response;
        /* 두 번째 인자로 사용 되는 콜백 함수는 오류 발생 시 동작이므로 로직을 작성한다. */
    }, async (error) => {

        console.log("error : ", error);

        const {
            config,
            response : { status }
        } = error;  // 구조분해 할당으로 config, 중첩구조분해할당으로 status를 꺼낸다

        if(status === 401) {
            const originRequest = config;
            // refresh token 전달 후 토큰 재발급 요청
            const response = await postRefreshToken();
            console.log("response : " , response);
            if(response.status === 200) {
                // 토큰 재발급에 성공했을 때
                saveToken(response.headers);
                // 실패했던 요청을 다시 요청
                originRequest.headers['Access-Token'] = getAccessTokenHeader();
                return axios(originRequest);
            }
        }
        // if문을 타지않는다면 발생한 에러는 그대로 넘긴다
        return Promise.reject(error);
    });
/* refresh token 전달하여 토큰 재발급 요청하는 api */
export async function postRefreshToken() {

    return await request(
        'POST',
        '/api/v1/refresh-token', // 인증 필터를 통과할 수 있는 url
        {'Refresh-Token' : getRefreshTokenHeader() }
    )
}
