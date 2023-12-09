import {Outlet} from "react-router-dom";
import Header from "../../dashBoard/components/common/Header";
import AdminPageNavBar from "../components/router/AdminPageNavBar";

function AdminPageLayout() {

    return (
        <>
            <Header/>
            <div className="memberContainer">
                <AdminPageNavBar/>
                <main className="memberView">
                    <Outlet/>
                </main>
            </div>
        </>
    );

}

export default AdminPageLayout;