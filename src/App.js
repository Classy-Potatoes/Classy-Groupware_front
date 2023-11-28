import './style/Nav.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./dashBoard/layouts/Layout";
import ProjectMain from "./project/pages/ProjectMain";
import CalendarLayout from "./calendar/layouts/CalendarLayout";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={ <Layout/> }/>
              <Route path="project" element={<ProjectMain />} />
              <Route path="calendar" element={<CalendarLayout/>}>

              </Route>
          </Routes>


      </BrowserRouter>
  );
}

export default App;
