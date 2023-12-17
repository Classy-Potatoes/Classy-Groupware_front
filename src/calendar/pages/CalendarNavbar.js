import calLogo from '../images/cal-logo.png';
import menuLogo from '../images/menu.png';
import SideCalendar from "./SideCalendar";
import Navbar from "../../dashBoard/components/common/Navbar";
import React, {useState} from "react";

function CalendarNavbar() {

    return (
        <>
            <div className="cal-navbar-div">
                <div className="cal-inner-box">
                    <div className="cal-logo-box">
                        <div className="cal-logo"><img src={calLogo}/></div>
                        <div className="cal-title">캘린더</div>
                    </div>
                    <div className="cal-menu-box">
                        <img src="/ph_list-light.png" alt="전체"/>
                        <p>전체</p>
                    </div>
                </div>
                <div className="cal-box">
                    <SideCalendar/>
                </div>
            </div>
        </>
    );
}

export default CalendarNavbar;