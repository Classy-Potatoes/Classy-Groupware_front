import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
import {Outlet} from "react-router-dom";

function Layout() {

    return (
        <>
            <Header/>
            <Navbar/>
            <main className="main">
                <Outlet/>
            </main>
        </>
    );
}

export default Layout;