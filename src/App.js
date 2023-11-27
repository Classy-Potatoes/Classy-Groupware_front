import './style/Nav.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./dashBoard/layouts/Layout";
import ProjectMain from "./project/pages/ProjectMain";
import reset from 'styled-reset';

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
