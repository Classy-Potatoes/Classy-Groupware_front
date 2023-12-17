import SideCalendar from "../../calendar/pages/SideCalendar";
import DashBoardMyproject from "./DashBoardMyproject";
import DashBoardMyTask from "./DashBoardMyTask";
import DashBoardMyTodo from "./DashBoardMyTodo";
import DashBoardMyAppreval from "./DashBoardMyAppreval";

function DashBoard() {


    return(
        <>
            <div className="project-and-calender">
                <div className="DashBoard-List">
                    <DashBoardMyproject/>
                </div>
                <div className= "DashBoard-List">
                    <DashBoardMyAppreval/>
                </div>
                <div className="dashBoard-calendar">
                    <SideCalendar/>
                </div>
            </div>
            <div className="DashBoard-List-bottom">
                <div className="DashBoard-List">
                    <DashBoardMyTask/>
                </div>
                <div className="DashBoard-List">
                    <DashBoardMyTodo/>
                </div>
                <div className="DashBoard-List">
                    e
                </div>

            </div>
        </>
    );
}

export default DashBoard;