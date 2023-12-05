import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";
import LoginForm from "../components/form/LoginForm";

function Login() {

    const navigate = useNavigate();
    const { loginSuccess } = useSelector( state => state.memberReducer );

    useEffect(() => {

        if( loginSuccess === true ) {
            // 온전히 다시 모든 화면을 리로드 한다.
            // 리덕스의 값을 다 날려주기 위해서
            window.location.replace("/dashBoard");

        } else if( loginSuccess === false ) {

            toast.warning('아이디와 비밀번호를 확인해주세요.');
        }

    }, [ loginSuccess ]);

    const onClickSearchHandler = () => {
        navigate('/');
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