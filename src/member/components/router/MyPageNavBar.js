import {NavLink} from "react-router-dom";
import {useState} from "react";
import Navbar from "../../../dashBoard/components/common/Navbar";
import {ToastContainer} from "react-toastify";
import * as React from "react";


function MyPageNavBar() {

    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen);
    };


    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            <div className={`navbar-div ${isNavOpen ? "nav-open" : ""}`}>
                <div className="mypageTitle">
                    <p>Classy<br/>
                        Groupware</p>
                </div>
                <div className="total-nav" onClick={handleNavToggle}>
                    <img src="/ph_list-light.png" alt="전체" />
                    <p>전체</p>
                </div>

                <div className="nav-bar">

                    <div className="nav-bar-p">
                        <NavLink to="/member/mypage/profile"><p>회원정보</p></NavLink>
                        <NavLink to="/member/mypage/passwordChange"><p>비밀번호 변경</p></NavLink>
                        <NavLink to="/member/mypage/memberReturn"><p>회원반납(탈퇴)</p></NavLink>
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

export default MyPageNavBar;