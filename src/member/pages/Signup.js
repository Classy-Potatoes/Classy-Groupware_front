import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import SignupForm from "../components/form/SignupForm";

function Signup() {

    const navigate = useNavigate();
    const { signupResult } = useSelector(state => state.memberReducer );


    useEffect(() => {

        if ( signupResult === true ) {
            navigate('/member/login');
        }

    }, [ signupResult ]);


    return (
        <>
            <ToastContainer hideProgressBar={ true } position="top-center" />
            <div className="background-div-logo">
                <div className="signup-div">
                    <SignupForm />
                </div>
            </div>
        </>
    );

}

export default Signup;