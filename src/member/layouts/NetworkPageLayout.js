import {Outlet} from "react-router-dom";
import Header from "../../dashBoard/components/common/Header";
import Navbar from "../../dashBoard/components/common/Navbar";

function NetworkPageLayout() {

    return (
        <>
            <Header/>
            <div className="memberContainer">
                <Navbar/>
                <main className="memberView">
                    <Outlet/>
                </main>
            </div>
        </>
    );

}

export default NetworkPageLayout;