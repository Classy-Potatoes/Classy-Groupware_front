import {Outlet} from "react-router-dom";
import Header from "../../dashBoard/components/common/Header";
import MyPageNavBar from "../components/router/MyPageNavBar";

function MyPageLayout() {

    return (
        <>
            <Header/>
            <div className="memberContainer">
                <MyPageNavBar/>
                <main className="memberView">
                    <Outlet/>
                </main>
            </div>
        </>
    );

}

export default MyPageLayout;