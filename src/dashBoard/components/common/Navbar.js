import {NavLink, useNavigate} from "react-router-dom";
import {removeToken} from "../../../member/utils/TokenUtils";


function Navbar() {

    // 로그아웃
    const onClickLogoutHandler = () => {
        // 토큰은 삭제 했지만 화면은 변화가 없기 때문에 메인 으로 리로딩.

        removeToken();
        window.location.replace("/");
    }


    return (
        <div className="main-navbar-div">
            <div className="profile"><img src="/image%208.png"/></div>
            <div className="nav-name">스폰지밥<br/><span>개발팀/팀장</span><br/>
                <img src="/outline_me.png"/>
                <img
                    onClick={ onClickLogoutHandler }
                    className="nav-logout"
                    src="/logout.png"/>
            </div>

            <div className="main-nav-bar">

                <p><img src="/message.png"/>쪽지함</p>
                <p><img src="/approval.png"/>전자결재</p>
                <NavLink to="/projects"><p><img src="/project.png"/>프로젝트</p></NavLink>
                <NavLink to="/calendar"><p><img src="/calender.png"/>캘린더</p></NavLink>
                <p><img src="/work.png"/>업무</p>
                <p><img src="/board.png"/>공지게시판</p>
                <p><img src="/phone.png"/>연락망</p>
                <p><img src="/Vector.png"/>관리기능</p>   {/* 로그인 구현되면 권한 설정해서 관리자만 보이게 함 */}

                <div className="weather">
                    날씨 영역
                </div>
            </div>
        </div>

    );
}

export default Navbar;