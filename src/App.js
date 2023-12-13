import './style/main.css';
import './style/nav.css';
import './calendar/calendarStyle/Calendar.css'
import './style/member/admin.css';
import './style/member/login.css';
import './style/note/note.css'
import './style/member/member.css';
import './style/project/Project.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import Layout from "./dashBoard/layouts/Layout";
import ProjectLayout from "./project/layouts/ProjectLayout";
import CalendarLayout from "./calendar/layouts/CalendarLayout";
import ProtectedRoute from "./common/components/router/ProtectedRoute";
import Login from "./common/pages/Login";
import NoteReceivedMain from "./note/pages/NoteReceivedMain";
import NoteLayout from "./note/layouts/NoteLayout";
import Vacation from "./appreval/components/Form/Vacation";
import Expense from "./appreval/components/Form/Expense";
import Letter from "./appreval/components/Form/Letter";
import ApprovalLayOut from "./appreval/layouts/ApprovalLayOut";
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
import PasswordChange from "./member/pages/mypage/PasswordChange";
import MemberReturn from "./member/pages/mypage/MemberReturn";
import AdminPageLayout from "./member/layouts/AdminPageLayout";
import MemberManagement from "./member/pages/admin/MemberManagement";
import NonMemberManagement from "./member/pages/admin/NonMemberManagement";
import MemberNetwork from "./member/pages/network/MemberNetwork";
import NetworkPageLayout from "./member/layouts/NetworkPageLayout";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              {/* 로그인 된 상태가 아니라면 /member/login으로 이동 */}
              <Route path="/" element={ <Navigate to="/dashBoard" /> } />
              <Route path="/dashBoard" element={ <ProtectedRoute loginCheck={ true }><Layout/></ProtectedRoute> }/>

              {/* 로그인, 아이디 찾기, 비밀번호 찾기, 회원가입, 마이페이지 */}
              <Route path="/member">
                  <Route path="login" element={ <ProtectedRoute loginCheck={ false }><Login /></ProtectedRoute> } />
                  <Route path="regist" element={ <ProtectedRoute loginCheck={ false }><Signup /></ProtectedRoute> } />
                  <Route path="search" element={ <ProtectedRoute loginCheck={ false }><SearchId /></ProtectedRoute> } />
                  <Route path="resultSearchId" element={ <ProtectedRoute loginCheck={ false }><ResultSearchId /></ProtectedRoute> } />
                  <Route path="pwdSearch" element={ <ProtectedRoute loginCheck={ false }><SearchPwd /></ProtectedRoute> } />
                  <Route path="mypage" element={ <ProtectedRoute loginCheck={ true }><MyPageLayout/></ProtectedRoute> }>
                      <Route index element={ <Navigate to="/member/mypage/profile" replace/>}/>
                      <Route path="profile" element={  <Profile/> }/>
                      <Route path="passwordChange" element={  <PasswordChange/> }/>
                      <Route path="memberReturn" element={  <MemberReturn/> }/>
                  </Route>
              </Route>

                <Route path="note" element={ <ProtectedRoute loginCheck={ true }><NoteLayout/></ProtectedRoute> }>
                    <Route index element={ <NoteReceivedMain/> }/>
                    <Route path="received" element={<NoteReceivedMain />} />
                    <Route path="sent" element={ <NoteSentMain/> }/>
                    <Route path="important" element={ <NoteImportantMain/> }/>
                </Route>


              <Route path="projects" element={ <ProtectedRoute loginCheck={ true }><ProjectLayout /></ProtectedRoute> } >
                  <Route index element={
                      <div>
                          <MyProjectMain />
                          <MyDeptProjectMain />
                      </div>
                  }/>
                  <Route path=":projectCode" element={<ProtectedRoute loginCheck={ true }><ProjectDetailLayout /></ProtectedRoute>} >
                    <Route index element={
                        <div className="project-post-div">
                            <ProjectDashBoard/>
                        </div>
                    }/>
                      <Route path="myTask" element={<ProtectedRoute loginCheck={ true }><ProjectDashBoard /></ProtectedRoute>} />
                  </Route>

              </Route>

              <Route path="calendar" element={ <ProtectedRoute loginCheck={ true }><CalendarLayout/></ProtectedRoute> }/>


              <Route path="approval" element={<ApprovalLayOut/>}>
                  <Route path="letter" element={<ProtectedRoute loginCheck={ true }><Letter/></ProtectedRoute>} />
                  <Route path="expense" element={<ProtectedRoute loginCheck={ true }> <Expense/> </ProtectedRoute>} />
                  <Route path="vacation" element={<ProtectedRoute loginCheck={true }> <Vacation/></ProtectedRoute>} />
              </Route>

              {/* 연락망 */}
              <Route path="/network" element={ <ProtectedRoute loginCheck={ true }><NetworkPageLayout/></ProtectedRoute> }>
                  <Route index element={ <MemberNetwork /> }/>
              </Route>

              {/* 관리기능 */}
              <Route path="/admin" element={ <ProtectedRoute loginCheck={ true }><AdminPageLayout/></ProtectedRoute> }>
                  <Route index element={ <Navigate to="/admin/managementMember" replace/>}/>
                  <Route path="managementMember" element={  <MemberManagement/> }/>
                  <Route path="managementNonMember" element={  <NonMemberManagement/> }/>
              </Route>

              {/* 정한 것 외에는 모두 에러 페이지로 이동 */}
              <Route path="*" element={ <Error /> } />


          </Routes>

      </BrowserRouter>
  );
}

export default App;
