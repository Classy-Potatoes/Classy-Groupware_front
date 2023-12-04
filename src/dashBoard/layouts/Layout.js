import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
import {Outlet} from "react-router-dom";

function Layout() {

    return (
        <>
            <div className="container-column">
                <Header/>
                <div className="container-row">
                    <Navbar/>
                    <main className="main">
                        <Outlet/>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Layout;