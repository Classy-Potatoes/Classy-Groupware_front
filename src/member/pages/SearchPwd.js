import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import SearchPwdForm from "../components/form/SearchPwdForm";

function SearchPwd() {

    const navigate = useNavigate();
    const searchPwd = useSelector(state => state.memberReducer );


    useEffect(() => {

        if ( searchPwd?.searchIdResult ) {

            // navigate('/member/resultSearchId');
        }

    }, [ searchPwd ]);

    const onClickBackHandler = () => {
        window.location.replace("/");
    }
    const onClickSearchHandler = () => {
        window.location.replace("/member/search");
    }

    return (
        <>
            <ToastContainer hideProgressBar={ true } position="top-center" />
            <div className="background-div-logo">
                <div className="login-search-div">
                    <SearchPwdForm />
                    <div className="login-div-bottom width220">
                        <button
                            onClick={ onClickBackHandler }
                        >
                            메인으로
                        </button>
                        <button
                            onClick={ onClickSearchHandler }
                        >
                            아이디 찾기
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

}

export default SearchPwd;