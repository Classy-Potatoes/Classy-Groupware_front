import * as React from "react";
import {useState} from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {NavLink, useLocation} from "react-router-dom";
import Navbar from "../../../dashBoard/components/common/Navbar";

function ApprovalNavBar() {

    const location = useLocation(); // 현재 페이지의 경로를 가져옴

    /* nav 버튼 클릭시 해당 페이지 컬러 추가 */
    const [letterLink, setLetterLink] = useState("/approval/letter");
    const [expenseLink , setExpenseLink] = useState("approval/expense");
    const [vacationLink , setVacationLink] = useState("approval/vacation");
    const [reportWaitingLink , SetReportWaitingLink] = useState("approval/report-waiting");
    const [reportPayingLink , SetReportPayingLink] = useState("approval/report-paying");
    const [reportApproveLink , SetReportApproveLink] = useState("approval/report-approve");
    const [reportTurnbackLink , SetReportTurnbackLink] = useState("approval/report-turnback");
    const [reportRecallLink , SetReportRecallLink] = useState("approval/report-recall");
    /* nav 버튼 클릭시 메뉴 슬라이드 state */
    const [registReportBox,setRegistReportBox] = useState(false);
    const [reportBox,setReportBox] = useState(false);
    const [approvalBox,setApprovalBox] = useState(false);
    /* nav 버튼 클릭시 메뉴 슬라이드 핸들러*/
    const registReportOpenHandler= () => {
        setRegistReportBox(!registReportBox)
        setReportBox(false);
        setApprovalBox(false)
    }
    const reportBoxOpenHandler= () => {
        setReportBox(!reportBox);
        setRegistReportBox(false);
        setApprovalBox(false);
    }
    const approvalBoxOpenHandler= () => {
        setApprovalBox(!approvalBox)
        setRegistReportBox(false);
        setReportBox(false);
    }


    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen);
    };


    return (
        <>
            <div className={`approval-div ${isNavOpen ? "nav-open" : ""}`}>
                <div className="approvalTitle">
                        <p>Classy<br/>
                           Groupware</p>
                </div>
                <div className="total-nav" onClick={handleNavToggle}>
                    <img src="/ph_list-light.png" alt="전체" />
                    <p>전체</p>
                </div>

                <div className="nav-bar">
                    <List
                        sx={{ width : '100%', maxWidth: 360}}
                        component="nav"
                        className="approvalCategoryList"
                    >
                        <ListItemButton onClick={registReportOpenHandler}>
                            <ListItemText primary="기안서 작성" />
                            {registReportBox ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={registReportBox} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}>
                                  <NavLink
                                      to="/approval/letter"
                                      className={location.pathname === "/approval/letter" ? "active-link" : "" }
                                      onClick={() => setLetterLink("/approval/letter")}
                                  >
                                      <ListItemText primary="품의서" />
                                  </NavLink>
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4}}>
                                    <NavLink to="/approval/expense"
                                             className={location.pathname === "/approval/expense" ? "active-link" : "" }
                                             onClick={() => setExpenseLink("/approval/expense")}
                                    >
                                        <ListItemText primary="지출결의서" /></NavLink>
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4}}>
                                   <NavLink to="/approval/vacation"
                                            className={location.pathname === "/approval/vacation" ? "active-link" : "" }
                                            onClick={() => setVacationLink("/approval/vacation")}
                                   >
                                       <ListItemText primary="휴가신청서" />
                                   </NavLink>
                                </ListItemButton>
                            </List>
                        </Collapse>
                        <ListItemButton onClick={reportBoxOpenHandler}>
                            <ListItemText primary="상신함" />
                            {reportBox ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={reportBox} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <NavLink
                                        to="/approval/report-waiting"
                                        className={location.pathname === "/approval/report-waiting" ? "active-link" : "" }
                                        onClick={() => SetReportWaitingLink("/approval/report-waiting")}
                                    >
                                    <ListItemText primary="결재대기" />
                                    </NavLink>
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4}}>
                                    <NavLink
                                        to="/approval/report-paying"
                                        className={location.pathname === "/approval/report-paying" ? "active-link" : "" }
                                        onClick={() => SetReportPayingLink("/approval/paying")}
                                    >
                                    <ListItemText primary="결재중" />
                                    </NavLink>
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4}}>
                                    <NavLink
                                        to="/approval/report-approve"
                                        className={location.pathname === "/approval/report-approve" ? "active-link" : "" }
                                        onClick={() => SetReportApproveLink("/approval/approve")}
                                    >
                                    <ListItemText primary="승인" />
                                    </NavLink>
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4}}>
                                    <NavLink
                                        to="/approval/report-turnback"
                                        className={location.pathname === "/approval/report-turnback" ? "active-link" : "" }
                                        onClick={() => SetReportTurnbackLink("/approval/turnback")}
                                    >
                                    <ListItemText primary="반려" />
                                    </NavLink>
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4}}>
                                    <NavLink
                                        to="/approval/report-recall"
                                        className={location.pathname === "/approval/report-recall" ? "active-link" : "" }
                                        onClick={() => SetReportRecallLink("/approval/recall")}
                                    >
                                    <ListItemText primary="회수보관함" />
                                    </NavLink>
                                </ListItemButton>
                            </List>
                        </Collapse>
                        <ListItemButton onClick={approvalBoxOpenHandler}>
                            <ListItemText primary="결재함" />
                            {approvalBox ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={approvalBox} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <NavLink
                                        to="/approval/sign-waiting"
                                        className={location.pathname === "/approval/sign-waiting" ? "active-link" : "" }
                                        onClick={() => SetReportTurnbackLink("/approval/sign-waiting")}
                                    >
                                    <ListItemText primary="결재 할 문서" />
                                    </NavLink>
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4}}>
                                    <NavLink
                                        to="/approval/sign-paying"
                                        className={location.pathname === "/approval/sign-paying" ? "active-link" : "" }
                                        onClick={() => SetReportTurnbackLink("/approval/sign-paying")}
                                    >
                                    <ListItemText primary="결재중" />
                                    </NavLink>
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4}}>
                                    <NavLink
                                        to="/approval/sign-approve"
                                        className={location.pathname === "/approval/sign-approve" ? "active-link" : "" }
                                        onClick={() => SetReportTurnbackLink("/approval/sign-approve")}
                                    >
                                    <ListItemText primary="승인" />
                                    </NavLink>
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4}}>
                                    <NavLink
                                        to="/approval/sign-turnback"
                                        className={location.pathname === "/approval/sign-turnback" ? "active-link" : "" }
                                        onClick={() => SetReportTurnbackLink("/approval/sign-turnback")}
                                    >
                                    <ListItemText primary="반려" />
                                    </NavLink>
                                </ListItemButton>
                            </List>
                        </Collapse>
                        <ListItemButton>
                            <NavLink
                                to="/approval/report/reference"
                                className={location.pathname === "/approval/report/reference" ? "active-link" : "" }
                                onClick={() => SetReportTurnbackLink("/approval/report/reference")}
                            >
                            <ListItemText primary="참조보관함" />
                            </NavLink>
                        </ListItemButton>
                    </List>
                </div>
            </div>
            {/* isNavOpen 값에 따라 Navbar를 조건부로 렌더링 */}
            {isNavOpen && (
                <div className="approval-navbar-overlay">
                    <Navbar isOpen={isNavOpen} />
                </div>
            )}

        </>
    );
}

export default ApprovalNavBar;