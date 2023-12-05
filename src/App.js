import './style/main.css';
import './style/nav.css';
import './style/main.css';
import './style/member/styleTest.css';
import './style/calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./dashBoard/layouts/Layout";
import ProjectMain from "./project/pages/ProjectMain";
import CalendarLayout from "./calendar/layouts/CalendarLayout";
import ProtectedRoute from "./member/components/router/ProtectedRoute";
import Login from "./member/pages/Login";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={ <Navigate to="/member/login" /> } />
              <Route path="/member/login"  element={ <ProtectedRoute loginCheck={ false }><Login /></ProtectedRoute> } />

              <Route path="/dashBoard" element={ <Layout/> }/>
              {/*<Route path="/dashBoard" element={ <ProtectedRoute loginCheck={ true }><Layout/></ProtectedRoute> }/>*/}
              <Route path="project" element={ <ProtectedRoute loginCheck={ true }><ProjectMain /></ProtectedRoute> } />
              <Route path="calendar" element={ <ProtectedRoute loginCheck={ true }><CalendarLayout/></ProtectedRoute> }>

              </Route>
          </Routes>


      </BrowserRouter>
  );
}

export default App;
