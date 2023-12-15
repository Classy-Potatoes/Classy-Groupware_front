import Header from "../../dashBoard/components/common/Header";
import ApprovalNavBar from "../components/common/ApprovalNavBar";
import {Outlet} from "react-router-dom";


function ApprovalLayOut() {

    return (
        <>
            <Header/>
            <div className="approvalContainer">
            <div className="approvalNav">
                <ApprovalNavBar/>
            </div>
            <div className="approvalView">
                    <Outlet/>
            </div>
            </div>

        </>

    );
}

export default ApprovalLayOut;