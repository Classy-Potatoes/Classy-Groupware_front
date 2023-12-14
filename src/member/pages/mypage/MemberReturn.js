import {ToastContainer} from "react-toastify";
import ReturnItem from "../../components/items/ReturnItem";

function MemberReturn() {

    return (
        <>
            <ToastContainer hideProgressBar={ true } position="top-center" />
            <div className="profile-background-div">
                <div className='memberReturn-div'>
                    <ReturnItem />
                </div>
            </div>
        </>
    );

}

export default MemberReturn;