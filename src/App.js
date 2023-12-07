import './style/main.css';
import './style/nav.css';
import './style/member/styleTest.css';
import './style/calendar.css';
import './style/Project.css';
import './style/note/note.css'
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import Layout from "./dashBoard/layouts/Layout";
import ProjectMain from "./project/pages/ProjectMain";
import CalendarLayout from "./calendar/layouts/CalendarLayout";
import ProtectedRoute from "./common/components/router/ProtectedRoute";
import Login from "./common/pages/Login";
import NoteReceivedMain from "./note/pages/NoteReceivedMain";
import NoteLayout from "./note/layouts/NoteLayout";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={ <Navigate to="/dashBoard" /> } />
              <Route path="/dashBoard" element={ <ProtectedRoute loginCheck={ true }><Layout/></ProtectedRoute> }/>
              <Route path="/member/login" element={ <ProtectedRoute loginCheck={ false }><Login /></ProtectedRoute> } />

              <Route path="projects" element={ <ProtectedRoute loginCheck={ true }><ProjectMain /></ProtectedRoute> } />
              <Route path="calendar" element={ <ProtectedRoute loginCheck={ true }><CalendarLayout/></ProtectedRoute> }/>
              <Route path="/note" element={ <ProtectedRoute loginCheck={ true }><NoteLayout/></ProtectedRoute> }>
                  <Route index element={ <NoteReceivedMain/> }/>
                  <Route path="received" element={ <NoteReceivedMain/> }/>
              </Route>


          </Routes>

      </BrowserRouter>
  );
}

export default App;
