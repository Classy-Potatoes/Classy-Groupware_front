import {ToastContainer} from "react-toastify";
import PwdChangeForm from "../../components/form/PwdChangeForm";

function PwdChange() {

    return (
        <>
            <ToastContainer hideProgressBar={ true } position="top-center" />
            <div className="profile-background-div">
                <div className='pwdChange-div'>
                    <PwdChangeForm />
                </div>
            </div>
        </>
    );

}

export default PwdChange;