import './style/Nav.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./dashBoard/layouts/Layout";
import ProjectMain from "./project/pages/ProjectMain";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={ <Layout/> }/>
              <Route path="project" element={<ProjectMain />} />
          </Routes>

      </BrowserRouter>
  );
}

export default App;
