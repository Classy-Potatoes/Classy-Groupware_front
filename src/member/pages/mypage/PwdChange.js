import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ToastContainer} from "react-toastify";
import MypageForm from "../../components/form/MypageForm";
import PwdChangeForm from "../../components/form/PwdChangeForm";

function PwdChange() {

    // const { profileInfo } = useSelector( state => state.memberReducer );

    useEffect(() => {

        // 성공 처리하기
        // if ( signupResult === true ) {
        //     window.location.replace("/");
        // }

    }, []);


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