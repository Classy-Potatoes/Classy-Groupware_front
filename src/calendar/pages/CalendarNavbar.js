import calLogo from '../images/cal-logo.png';
import menuLogo from '../images/menu.png';
import SideCalendar from "./SideCalendar";

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
                        <div className="cal-menu-logo"><img src={menuLogo}/></div>
                        <div className="cal-menu-title">메뉴</div>
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