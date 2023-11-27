import {useNavigate} from "react-router-dom";


function Navbar() {

    const navigete = useNavigate();

    return (
        <div className="navbar-div">
            <div className="profile"><img src="/image%208.png"/></div>
            <div className="nav-name">스폰지밥<br/><span>개발팀/팀장</span><br/>
                <img src="/outline_me.png"/>
                <img src="/logout.png"/>
            </div>

            <div className="nav-bar">

                <p><img src="/message.png"/>쪽지함</p>
                <p><img src="/approval.png"/>전자결재</p>
                <p><img src="/project.png"/>프로젝트</p>
                <p><img src="/calender.png"/>캘린더</p>
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