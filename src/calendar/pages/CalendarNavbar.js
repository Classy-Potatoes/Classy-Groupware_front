import calLogo from '../images/cal-logo.png';
import menuLogo from '../images/menu.png';
import SideCalendar from "./SideCalendar";
import Navbar from "../../dashBoard/components/common/Navbar";
import React, {useState} from "react";

function CalendarNavbar() {

    const [isNavOpen, setIsNavOpen] = useState(false);
    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <>
            {/*<div className="cal-navbar-div">*/}
            <div className={`cal-navbar-div ${isNavOpen ? "nav-open" : ""}`}>
                <div className="cal-inner-box">
                    <div className="cal-logo-box">
                        <div className="cal-logo"><img src={calLogo}/></div>
                        <div className="cal-title">캘린더</div>
                    </div>
                    <div className="cal-menu-box">
                        <div className="total-nav" onClick={handleNavToggle}>
                            <img src="/ph_list-light.png" alt="전체" />
                            <p>전체</p>
                        </div>
                    </div>
                </div>
                <div className="cal-box">
                    <SideCalendar/>
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

export default CalendarNavbar;