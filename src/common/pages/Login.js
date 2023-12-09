import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";
import LoginForm from "../components/form/LoginForm";

function Login() {

    const navigate = useNavigate();
    const loginResult = useSelector( state => state.memberReducer );

    useEffect(() => {

        if( loginResult?.loginResult === true ) {

            window.location.replace("/");

        } else if( loginResult?.loginResult === false ) {
            // 기존 메시지 모두 삭제.
            toast.dismiss();
            toast.warning('아이디와 비밀번호를 확인해주세요.', {
                autoClose : 1000
            });
        }

    }, [ loginResult ]);

    const onClickSearchHandler = () => {
        navigate('/member/search');
    }
    const onClickSignupHandler = () => {
        navigate('/member/regist');
    }

    return (
        <>
            <ToastContainer hideProgressBar={ true } position="top-center" />
            <div className="background-div">

                <div className="login-div">
                    <LoginForm />
                    <div className="login-div-bottom">
                        <button
                            onClick={ onClickSearchHandler }
                        >
                            아이디 / 비밀번호 찾기
                        </button>
                        <button
                            onClick={ onClickSignupHandler }
                        >
                            회원가입
                        </button>
                    </div>
                </div>

            </div>
        </>
    );

}

export default Login;