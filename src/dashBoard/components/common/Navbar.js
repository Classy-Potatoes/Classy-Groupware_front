import {NavLink, useNavigate} from "react-router-dom";
import {isAdmin, removeToken} from "../../../member/utils/TokenUtils";


function Navbar() {

    // 로그아웃
    const onClickLogoutHandler = () => {

        removeToken();
        window.location.replace("/");
    }


    return (
        <div className="main-navbar-div">
            <div className="profile"><img src="/image%208.png"/></div>
            <div className="nav-name">스폰지밥<br/><span>개발팀/팀장</span><br/>
                <NavLink to="/member/mypage/profile"><img src="/outline_me.png"/></NavLink>
                <img
                    onClick={ onClickLogoutHandler }
                    className="nav-logout"
                    src="/logout.png"/>
            </div>

            <div className="main-nav-bar">

                <p><img src="/message.png"/>쪽지함</p>
                <NavLink to="/approval"><p><img src="/approval.png"/>전자결재</p></NavLink>
                <NavLink to="/projects"><p><img src="/project.png"/>프로젝트</p></NavLink>
                <NavLink to="/calendar"><p><img src="/calender.png"/>캘린더</p></NavLink>
                <p><img src="/work.png"/>업무</p>
                <p><img src="/board.png"/>공지게시판</p>
                <NavLink to="/network"><p><img src="/phone.png"/>연락망</p></NavLink>
                { isAdmin() && <NavLink to="/admin/member/main"><p><img src="/Vector.png"/>관리기능</p></NavLink> }

                <div className="weather">
                    날씨 영역
                </div>
            </div>
        </div>

    );
}

export default Navbar;