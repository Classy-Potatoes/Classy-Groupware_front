import {NavLink} from "react-router-dom";
import {useState} from "react";
import Navbar from "../../../dashBoard/components/common/Navbar";

function ProjectNavBar() {

    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <>
            <div className={`navbar-div ${isNavOpen ? "nav-open" : ""}`}>
                <div className="add-project">
                    <p>+새프로젝트</p>
                </div>
                <div className="total-nav" onClick={handleNavToggle}>
                    <img src="/ph_list-light.png" alt="전체" />
                    <p>전체</p>
                </div>

                <div className="nav-bar">

                    <div className="nav-bar-p">
                        <p><img src="/message.png"/>쪽지함</p>
                        <p><img src="/approval.png"/>전자결재</p>
                        <NavLink to="/project"><p><img src="/project.png"/>프로젝트</p></NavLink>
                        <p><img src="/calender.png"/>캘린더</p>
                        <p><img src="/work.png"/>업무</p>
                        <p><img src="/board.png"/>공지게시판</p>
                        <p><img src="/phone.png"/>연락망</p>
                        <p><img src="/Vector.png"/>관리기능</p>   {/* 로그인 구현되면 권한 설정해서 관리자만 보이게 함 */}
                    </div>
                </div>
            </div>
            {/* isNavOpen 값에 따라 Navbar를 조건부로 렌더링 */}
            {isNavOpen && (
                <div className="navbar-overlay">
                    <Navbar isOpen={isNavOpen} />
                </div>
            )}
        </>
    );
}

export default ProjectNavBar;