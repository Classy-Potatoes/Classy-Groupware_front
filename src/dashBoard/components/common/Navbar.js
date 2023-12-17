import {NavLink, useNavigate} from "react-router-dom";
import {isAdmin, removeToken} from "../../../member/utils/TokenUtils";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {callMyProfileAPI} from "../../../member/apis/MemberAPICalls";


function Navbar() {

    const dispatch = useDispatch();
    const { getProfile } = useSelector( state => state.memberReducer );

    useEffect(() => {

        dispatch( callMyProfileAPI() );
    }, []);

    // 로그아웃
    const onClickLogoutHandler = () => {

        removeToken();
        window.location.replace("/");
    }


    return (
        <>
        { getProfile &&
            <div className="main-navbar-div">
                <div className="profile"><img src={ getProfile.getFilePathName } className='nav-bar-img'/></div>
                <div className="nav-name-div">
                    <div className='nav-name'>{ getProfile.infoName }</div>
                    <span>{ getProfile.deptName + " / " + getProfile.jobName }</span>
                    <div className='nav-name-row'>
                        <NavLink to="/member/mypage/profile"><img src="/outline_me.png"/></NavLink>
                        <img
                            onClick={ onClickLogoutHandler }
                            className="nav-logout"
                            src="/logout.png"/>
                    </div>
                </div>

                <div className="main-nav-bar">

                    <p><img src="/message.png"/>쪽지함</p>
                    <NavLink to="/approval"><p><img src="/approval.png"/>전자결재</p></NavLink>
                    <NavLink to="/projects"><p><img src="/project.png"/>프로젝트</p></NavLink>
                    <NavLink to="/calendar"><p><img src="/calender.png"/>캘린더</p></NavLink>
                    <p><img src="/board.png"/>공지게시판</p>
                    <NavLink to="/network"><p><img src="/phone.png"/>연락망</p></NavLink>
                    { isAdmin() && <NavLink to="/admin/member/main"><p><img src="/Vector.png"/>관리기능</p></NavLink> }

                    <div className="weather">
                        날씨 영역
                    </div>
                </div>
            </div>
        }
        </>
    );
}

export default Navbar;