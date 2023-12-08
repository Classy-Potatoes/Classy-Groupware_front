import Header from "../../dashBoard/components/common/Header";
import ApprovalNavBar from "../components/ApprovalNavBar";
import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";


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