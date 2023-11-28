import calLogo from '../imgages/cal-logo.png';
import menuLogo from '../imgages/menu.png';

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
                    <div className="cal-box">

                    </div>
                </div>
            </div>
        </>
    );
}

export default CalendarNavbar;