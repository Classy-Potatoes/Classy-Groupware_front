import './style/Nav.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./dashBoard/layouts/Layout";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={ <Layout/> }>

              </Route>
          </Routes>

      </BrowserRouter>
  );
}

export default App;
