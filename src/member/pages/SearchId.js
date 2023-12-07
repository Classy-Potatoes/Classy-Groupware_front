import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import SearchIdForm from "../components/form/SearchIdForm";

function SearchId() {

    const navigate = useNavigate();
    const searchId = useSelector(state => state.memberReducer );

    useEffect(() => {

        if( searchId?.searchIdResult ) {
            navigate('/member/resultSearchId');
        }

    }, [ searchId ]);


    const onClickBackHandler = () => {
        window.location.replace("/");
    }
    const onClickPwdSearchHandler = () => {
        window.location.replace("/member/pwdSearch");
    }


    return (
        <>
            <ToastContainer hideProgressBar={ true } position="top-center" />
            <div className="background-div-logo">
                <div className="login-search-div">
                    <SearchIdForm />
                    <div className="login-div-bottom width220">
                        <button
                            onClick={ onClickBackHandler }
                        >
                            메인으로
                        </button>
                        <button
                            onClick={ onClickPwdSearchHandler }
                        >
                            비밀번호 찾기
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

}

export default SearchId;