import {Navigate} from "react-router-dom";
import {isAdmin, isLogin} from "../../../member/utils/TokenUtils";

function ProtectedRoute( { loginCheck, authCheck, children } ) {


    if( authCheck ) {
        /* 권한이 있어야 접근 가능한 기능 */
        return isAdmin() ? children : <Navigate to="/" />
    }

    if ( loginCheck ) {
        /* 로그인 해야만 볼 수 있는 기능 (마이페이지) */
        // children <ProtectedRoute> 로 감싼 안쪽에 있는 컴포넌트를 뜻함
        // 로그인이 되어있다면 자식 컴포턴트를 보여주고 아니면 뒤쪽에 설정해준곳으로 이동시킨다.
        return isLogin() ? children : <Navigate to="/" />

    } else {
        /* 로그인 하면 볼 수 없는 기능 (로그인, 회원가입) */
        return !isLogin() ? children : <Navigate to="/" />

    }

}

export default ProtectedRoute;