import {jwtDecode} from "jwt-decode";

const BEARER = 'Bearer ';

export const saveToken = ( headers ) => {

    // key , value로 저장
    localStorage.setItem("access-token", headers['access-token']);
    localStorage.setItem("refresh-token", headers['refresh-token']);
}

/* 토큰이 지워져야할때 */
export const removeToken = () => {

    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
}

const getAccessToken = () => window.localStorage.getItem('access-token');
const getRefreshToken = () => window.localStorage.getItem('refresh-token');

const getDecodeAccessToken = () => {
    // 액세스 토큰이 있는지 확인후 jwtDecode 된 함수 반환
    return getAccessToken() && jwtDecode( getAccessToken() )
}

const getDecodeRefreshToken = () => {
    // 리프래쉬 토큰이 있는지 확인후 jwtDecode 된 함수 반환
    return getRefreshToken() && jwtDecode( getRefreshToken() )
}

/* 앞쪽에 Bearer_ 붙여준다. */
export const getAccessTokenHeader = () => BEARER + getAccessToken();
export const getRefreshTokenHeader = () => BEARER + getRefreshToken();


export const isLogin = () => {

    // console.log( getDecodeAccessToken() );
    // console.log( getDecodeRefreshToken() );

    return getAccessToken() && getRefreshToken() && ( Date.now() < getDecodeRefreshToken().exp * 1000 );
    // getAccessToken, getRefreshToken 도 있고 만료시간에 도달하지 않았을경우
}

export const isAdmin = () => {
    // 로그인이 되어있고, 롤이 관리자(USER에서 role에 넣으면 앞쪽에 ROLE_ 가 자동으로 붙는다.)
    return isLogin() && ( getDecodeAccessToken().memberRole === 'ROLE_ADMIN');
}


