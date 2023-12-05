import {useState} from "react";
import {useDispatch} from "react-redux";
import {callLoginAPI} from "../../apis/MemberAPICalls";

function LoginForm() {

    const dispatch = useDispatch();
    const [ form, setFrom ] = useState({});

    const onChangeHandler = e => {
        setFrom({
            ...form,
            [ e.target.name ]: e.target.value
        });
    }

    const onClickLoginHandler = () => {

        console.log( form );
        dispatch( callLoginAPI({ loginRequest : form }));
    }

    const onEnterkeyHandler = e => {

        if (e.key === 'Enter') {
            onClickLoginHandler();
        }
    }


    return (
        <>
            <div className="login-logo-div" />
            <input
                className="login-inputImg-id"
                type="text"
                name="memberId"
                placeholder="아이디를 입력해주세요"
                onChange={ onChangeHandler }
            />
            <input
                className="login-inputImg-pw"
                type="password"
                name="memberPassword"
                placeholder="비밀번호를 입력해주세요"
                onChange={ onChangeHandler }
                onKeyUp={ onEnterkeyHandler }
            />
            <button
                className="login-button"
                onClick={ onClickLoginHandler }
            >
                Login
            </button>
        </>
    );
}

export default LoginForm;