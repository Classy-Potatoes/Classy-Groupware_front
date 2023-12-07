import './style/main.css';
import './style/nav.css';
import './style/main.css';
import './style/member/login.css';
import './style/calendar.css';
import './style/Project.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./dashBoard/layouts/Layout";
import ProjectMain from "./project/pages/ProjectMain";
import CalendarLayout from "./calendar/layouts/CalendarLayout";
import ProtectedRoute from "./common/components/router/ProtectedRoute";
import Login from "./common/pages/Login";
import Error from "./common/pages/Error";
import Signup from "./member/pages/Signup";
import SearchPwd from "./member/pages/SearchPwd";
import SearchId from "./member/pages/SearchId";
import ResultSearchId from "./member/pages/ResultSearchId";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              {/* 로그인 된 상태가 아니라면 /member/login으로 이동 */}
              <Route path="/" element={ <Navigate to="/dashBoard" /> } />
              <Route path="/dashBoard" element={ <ProtectedRoute loginCheck={ true }><Layout/></ProtectedRoute> }/>
              <Route path="/member">
                  <Route path="login" element={ <ProtectedRoute loginCheck={ false }><Login /></ProtectedRoute> } />
                  <Route path="regist" element={ <ProtectedRoute loginCheck={ false }><Signup /></ProtectedRoute> } />
                  <Route path="search" element={ <ProtectedRoute loginCheck={ false }><SearchId /></ProtectedRoute> } />
                  <Route path="resultSearchId" element={ <ProtectedRoute loginCheck={ false }><ResultSearchId /></ProtectedRoute> } />
                  <Route path="pwdSearch" element={ <ProtectedRoute loginCheck={ false }><SearchPwd /></ProtectedRoute> } />
              </Route>


              <Route path="projects" element={ <ProtectedRoute loginCheck={ true }><ProjectMain /></ProtectedRoute> } />
              <Route path="calendar" element={ <ProtectedRoute loginCheck={ true }><CalendarLayout/></ProtectedRoute> }>

              </Route>

              {/* 정한 것 외에는 모두 에러 페이지로 이동 */}
              <Route path="*" element={ <Error /> } />
          </Routes>


      </BrowserRouter>
  );
}

export default App;
