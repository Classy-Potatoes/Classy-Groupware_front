import {jwtDecode} from "jwt-decode";

const BEARER = 'Bearer ';

export const saveToken = (headers) =>  {
    localStorage.setItem("access-token", headers['access-token'])
    localStorage.setItem("refresh-token", headers['refresh-token'])
}                           // 키                      벨류

export const removeToken = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
}

// 로그인을 했는지 안했는지 판단하기 위해 토큰이 있는지 없는지 확인한다
const getAccessToken = () => window.localStorage.getItem('access-token');
const getRefreshToken = () => window.localStorage.getItem('refresh-token');

const getDecodeAccessToken = () => {
    return getAccessToken() && jwtDecode(getAccessToken()); // getAccessToken 가 있으면 decode 한다
}

const getDecodeRefreshToken = () => {
    return getRefreshToken() && jwtDecode(getRefreshToken());
}

export const getAccessTokenHeader = () => BEARER + getAccessToken();
export const getRefreshTokenHeader = () => BEARER + getRefreshToken();

export const isLogin = () => {

    return getAccessToken() && getRefreshToken() && (Date.now() < getDecodeRefreshToken().exp * 1000);// 밀리세컨으로 만들기위해 1000을 곱함
}

export const isAdmin = () => {

    return isLogin() && (getDecodeAccessToken().memberRole === 'ADMIN');
}
