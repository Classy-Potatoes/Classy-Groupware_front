import axios from "axios";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const DEFAULT_URL = `http://${SERVER_IP}:${SERVER_PORT}`;


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
