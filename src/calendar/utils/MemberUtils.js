import {jwtDecode} from "jwt-decode";

const getAccessToken = () => window.localStorage.getItem('access-token');
const getDecodeAccessToken = () => {
    return getAccessToken() && jwtDecode(getAccessToken()); // getAccessToken 가 있으면 decode 한다
}
export const getMemberId = () => {
    return getDecodeAccessToken().memberId;
}