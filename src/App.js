import './style/main.css';
import './style/nav.css';
import './calendar/calendarStyle/Calendar.css'
import './style/member/admin.css';
import './style/member/login.css';
import './style/note/note.css';
import './style/note/noteSave.css';
import './style/member/member.css';
import './style/project/Project.css';
import './style/dashBoard/dashBoard.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import Layout from "./dashBoard/layouts/Layout";
import ProjectLayout from "./project/layouts/ProjectLayout";
import CalendarLayout from "./calendar/layouts/CalendarLayout";
import ProtectedRoute from "./common/components/router/ProtectedRoute";
import Login from "./common/pages/Login";
import NoteReceivedMain from "./note/pages/NoteReceivedMain";
import NoteLayout from "./note/layouts/NoteLayout";
import Vacation from "./approval/components/Form/Vacation";
import Expense from "./approval/components/Form/Expense";
import Letter from "./approval/components/Form/Letter";
import ApprovalLayOut from "./approval/layouts/ApprovalLayOut";
import MyProjectMain from "./project/pages/projects/MyProjectMain";
import MyDeptProjectMain from "./project/pages/projects/MyDeptProjectMain";
import Error from "./common/pages/Error";
import Signup from "./member/pages/Signup";
import SearchPwd from "./member/pages/SearchPwd";
import SearchId from "./member/pages/SearchId";
import ResultSearchId from "./member/pages/ResultSearchId";
import NoteSentMain from "./note/pages/NoteSentMain";
import NoteImportantMain from "./note/pages/NoteImportantMain";
import ProjectDetailLayout from "./project/layouts/ProjectDetailLayout";
import ProjectDashBoard from "./project/layouts/ProjectDashBoard";
import Profile from "./member/pages/mypage/Profile";
import MyPageLayout from "./member/layouts/MyPageLayout";
import PwdChange from "./member/pages/mypage/PwdChange";
import MemberReturn from "./member/pages/mypage/MemberReturn";
import AdminPageLayout from "./member/layouts/AdminPageLayout";
import AdminMemberMain from "./member/pages/admin/AdminMemberMain";
import NonMemberMain from "./member/pages/admin/NonMemberMain";
import MemberNetworkMain from "./member/pages/network/MemberNetworkMain";
import MemberNetworkSearchMain from "./member/pages/network/MemberNetworkSearchMain";
import NetworkPageLayout from "./member/layouts/NetworkPageLayout";
import NoteSearch from "./note/pages/NoteSearch";
import NoteReceived from "./note/pages/NoteReceived";
import NonMemberSearchMain from "./member/pages/admin/NonMemberSearchMain";
import AdminMemberSearchMain from "./member/pages/admin/AdminMemberSearchMain";
import ReportWaiting from "./approval/components/ReportLists/ReportWaiting";
import ReportApprove from "./approval/components/ReportLists/ReportApprove";
import ReportTurnback from "./approval/components/ReportLists/ReportTurnback";
import ReportRecall from "./approval/components/ReportLists/ReportRecall";
import ReportPaying from "./approval/components/ReportLists/ReportPaying";
import ReportWaitingSearch from "./approval/components/ReportLists/ReportWaitingSearch";
import ReportPayingSearch from "./approval/components/ReportLists/ReportPayingSearch";
import ReportApproveSearch from "./approval/components/ReportLists/ReportApproveSearch";
import ReportTurnbackSearch from "./approval/components/ReportLists/ReportTurnbackSearch";
import ReportRecallSearch from "./approval/components/ReportLists/ReportRecallSearch";
import LetterDetail from "./approval/components/ReportLists/reportDetail/ReprotLetterDetail";
import VacationDetail from "./approval/components/ReportLists/reportDetail/ReportVacationDetail";
import ExpenseDetail from "./approval/components/ReportLists/reportDetail/ReprotExpenseDetail";
import NoteSave from "./note/pages/NoteSave";
import DashBoard from "./dashBoard/page/DashBoard";
import ProjectMyTask from "./project/pages/projects/ProjectMyTask";

import SignWaiting from "./approval/components/ReportLists/sign/SignWaiting";
import SignPaying from "./approval/components/ReportLists/sign/SignPaying";
import SignApprove from "./approval/components/ReportLists/sign/SignApprove";
import SignTurnback from "./approval/components/ReportLists/sign/SignTurnback";
import SignPayingSearch from "./approval/components/ReportLists/sign/SignPayingSearch";
import SignApproveSearch from "./approval/components/ReportLists/sign/SignApproveSearch";
import SignTurnbackSearch from "./approval/components/ReportLists/sign/SignTurnbackSearch";
import SignWaitingSearch from "./approval/components/ReportLists/sign/SignWaitingSearch";
import ReferenceReport from "./approval/components/ReportLists/ReferenceReport";
import ReferenceReportSearch from "./approval/components/ReportLists/ReferenceReportSearch";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={ <Navigate to="/dashBoard" /> } />
              <Route path="/dashBoard" element={ <ProtectedRoute loginCheck={ true }><Layout/></ProtectedRoute> }>
                  <Route index element={<ProtectedRoute loginCheck={ true }><DashBoard /></ProtectedRoute>}/>
              </Route>

              <Route path="/member">
                  <Route path="login" element={ <ProtectedRoute loginCheck={ false }><Login /></ProtectedRoute> } />
                  <Route path="regist" element={ <ProtectedRoute loginCheck={ false }><Signup /></ProtectedRoute> } />
                  <Route path="search" element={ <ProtectedRoute loginCheck={ false }><SearchId /></ProtectedRoute> } />
                  <Route path="resultSearchId" element={ <ProtectedRoute loginCheck={ false }><ResultSearchId /></ProtectedRoute> } />
                  <Route path="pwdSearch" element={ <ProtectedRoute loginCheck={ false }><SearchPwd /></ProtectedRoute> } />
                  <Route path="mypage" element={ <ProtectedRoute loginCheck={ true }><MyPageLayout/></ProtectedRoute> }>
                      <Route index element={ <Navigate to="/member/mypage/profile" replace/>}/>
                      <Route path="profile" element={  <ProtectedRoute loginCheck={ true }><Profile/></ProtectedRoute> }/>
                      <Route path="passwordChange" element={  <ProtectedRoute loginCheck={ true }><PwdChange/></ProtectedRoute> }/>
                      <Route path="memberReturn" element={  <ProtectedRoute loginCheck={ true }><MemberReturn/></ProtectedRoute> }/>
                  </Route>
              </Route>

                <Route path="note" element={ <ProtectedRoute loginCheck={ true }><NoteLayout/></ProtectedRoute> }>
                    <Route index element={ <NoteReceivedMain/> }/>
                    <Route path="received/:noteCode" element={< NoteReceived/> }/>
                    <Route path="sent" element={ <NoteSentMain/> }/>
                    <Route path="sent/:noteCode" element={ <NoteReceived/> }/>
                    <Route path="important" element={ <NoteImportantMain/> }/>
                    <Route path="important/:noteCode" element={ <NoteReceived/> }/>
                    <Route path="search" element={ <NoteSearch/> }/>
                    <Route path="send" element={ <NoteSave/> }/>
                </Route>

              {/* 프로젝트 */}
              <Route path="projects" element={ <ProtectedRoute loginCheck={ true }><ProjectLayout /></ProtectedRoute> } >
                  <Route index element={
                      <div>
                          <MyProjectMain />
                          <MyDeptProjectMain />
                      </div>
                  }/>
                  <Route path=":projectCode" element={<ProtectedRoute loginCheck={ true }><ProjectDetailLayout /></ProtectedRoute>} >
                    <Route index element={
                        <div className="project-post-div"><ProjectDashBoard/></div>}>
                    </Route>
                  </Route>
                  <Route path="myTask" element={<ProtectedRoute loginCheck={true}><ProjectMyTask /></ProtectedRoute>}></Route>
              </Route>

              <Route path="calendar" element={ <ProtectedRoute loginCheck={ true }><CalendarLayout/></ProtectedRoute> }/>

              <Route path="approval" element={<ApprovalLayOut/>}>
                  <Route path="letter" element={<ProtectedRoute loginCheck={ true }> <Letter/></ProtectedRoute>} />
                  <Route path="expense" element={<ProtectedRoute loginCheck={ true }> <Expense/> </ProtectedRoute>} />
                  <Route path="vacation" element={<ProtectedRoute loginCheck={true }> <Vacation/></ProtectedRoute>} />
                  <Route path="report-waiting" element={<ProtectedRoute loginCheck={true }> <ReportWaiting/></ProtectedRoute>} />
                  <Route path="report-paying" element={<ProtectedRoute loginCheck={true }> <ReportPaying/></ProtectedRoute>} />
                  <Route path="report-approve" element={<ProtectedRoute loginCheck={true }> <ReportApprove/></ProtectedRoute>} />
                  <Route path="report-turnback" element={<ProtectedRoute loginCheck={true }> <ReportTurnback/></ProtectedRoute>} />
                  <Route path="report-recall" element={<ProtectedRoute loginCheck={true }> <ReportRecall/></ProtectedRoute>} />
                  <Route path="report/search-waiting" element={<ProtectedRoute loginCheck={true}> <ReportWaitingSearch/> </ProtectedRoute> }/>
                  <Route path="report/search-paying" element={<ProtectedRoute loginCheck={true}> <ReportPayingSearch/> </ProtectedRoute> }/>
                  <Route path="report/search-approve" element={<ProtectedRoute loginCheck={true}> <ReportApproveSearch/> </ProtectedRoute> }/>
                  <Route path="report/search-turnback" element={<ProtectedRoute loginCheck={true}> <ReportTurnbackSearch/> </ProtectedRoute> }/>
                  <Route path="report/search-recall" element={<ProtectedRoute loginCheck={true}> <ReportRecallSearch/> </ProtectedRoute> }/>
                  <Route path="report/letter/:approvalCode" element={<ProtectedRoute loginCheck={true}> <LetterDetail/> </ProtectedRoute> }/>
                  <Route path="report/expense/:approvalCode" element={<ProtectedRoute loginCheck={true}> <ExpenseDetail/> </ProtectedRoute> }/>
                  <Route path="report/vacation/:approvalCode" element={<ProtectedRoute loginCheck={true}> <VacationDetail/> </ProtectedRoute> }/>
                  <Route path="sign-waiting" element={<ProtectedRoute loginCheck={true }> <SignWaiting/></ProtectedRoute>} />
                  <Route path="sign-paying" element={<ProtectedRoute loginCheck={true }> <SignPaying/></ProtectedRoute>} />
                  <Route path="sign-approve" element={<ProtectedRoute loginCheck={true }> <SignApprove/></ProtectedRoute>} />
                  <Route path="sign-turnback" element={<ProtectedRoute loginCheck={true }> <SignTurnback/></ProtectedRoute>} />
                  <Route path="sign/search-waiting" element={<ProtectedRoute loginCheck={true}> <SignWaitingSearch/> </ProtectedRoute> }/>
                  <Route path="sign/search-paying" element={<ProtectedRoute loginCheck={true}> <SignPayingSearch/> </ProtectedRoute> }/>
                  <Route path="sign/search-approve" element={<ProtectedRoute loginCheck={true}> <SignApproveSearch/> </ProtectedRoute> }/>
                  <Route path="sign/search-turnback" element={<ProtectedRoute loginCheck={true}> <SignTurnbackSearch/> </ProtectedRoute> }/>
                  <Route path="report/search-reference" element={<ProtectedRoute loginCheck={true}> <ReferenceReportSearch/> </ProtectedRoute> }/>
                  <Route path="report/reference" element={<ProtectedRoute loginCheck={true}> <ReferenceReport/> </ProtectedRoute> }/>



              </Route>

              {/* 연락망 */}
              <Route path="/network" element={ <ProtectedRoute loginCheck={ true }><NetworkPageLayout/></ProtectedRoute> }>
                  <Route index element={ <Navigate to="/network/members/main" replace/>}/>
                  <Route path="members">
                      <Route path="main" element={ <ProtectedRoute loginCheck={ true }><MemberNetworkMain /></ProtectedRoute> } />
                      <Route path="search" element={ <ProtectedRoute loginCheck={ true }><MemberNetworkSearchMain /></ProtectedRoute> } />
                  </Route>
              </Route>

              {/* 관리기능 */}
              <Route path="/admin" element={ <ProtectedRoute loginCheck={ true }><AdminPageLayout/></ProtectedRoute> }>
                  <Route index element={ <Navigate to="/admin/member/main" replace/>}/>
                  <Route path="member">
                      <Route path="main" element={  <ProtectedRoute loginCheck={ true }><AdminMemberMain/></ProtectedRoute> }/>
                      <Route path="search" element={  <ProtectedRoute loginCheck={ true }><AdminMemberSearchMain/></ProtectedRoute> }/>
                  </Route>
                  <Route path="nonMember">
                      <Route path="main" element={  <ProtectedRoute loginCheck={ true }><NonMemberMain/></ProtectedRoute> }/>
                      <Route path="search" element={  <ProtectedRoute loginCheck={ true }><NonMemberSearchMain/></ProtectedRoute> }/>
                  </Route>
              </Route>

              {/* 정한 것 외에는 모두 에러 페이지로 이동 */}
              <Route path="*" element={ <Error /> } />


          </Routes>

      </BrowserRouter>
  );
}

export default App;
