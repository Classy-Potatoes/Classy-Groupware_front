import {useState} from "react";
import {useDispatch} from "react-redux";
import {callLoginAPI} from "../../../member/apis/MemberAPICalls";

function LoginForm() {

    const dispatch = useDispatch();
    const [ isValid, setIsValid ] = useState( false );
    const [ form, setFrom ] = useState({
        memberId : "",
        memberPassword : "",
    });

    const onChangeHandler = e => {

        setFrom({
            ...form,
            [ e.target.name ]: e.target.value
        });
    }

    const validate = (type, value) => {
        // 공백 확인 정규식
        const blankRegex = /\S/;

        if (type === "memberId" || type === "memberPassword" ) {
            return blankRegex.test( value );
        }

        return true;
    }

    const validateForm = () => {
        const { memberId, memberPassword } = form;
        return validate("memberId", memberId) && validate("memberPassword", memberPassword);
    };

    // 입력값이 변경될 때마다 유효성을 검사하여 상태 업데이트
    const onFormChange = () => {
        setIsValid( validateForm() );
    };

    const onClickLoginHandler = () => {

        dispatch( callLoginAPI({ loginRequest: form }));
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
                onChange={(e) => {
                    onChangeHandler(e);
                    onFormChange();
                }}
            />
            <input
                className="login-inputImg-pw"
                type="password"
                name="memberPassword"
                placeholder="비밀번호를 입력해주세요"
                onChange={(e) => {
                    onChangeHandler(e);
                    onFormChange();
                }}
                onKeyUp={ onEnterkeyHandler }
            />
            <button
                className="login-button"
                onClick={ onClickLoginHandler }
                disabled={ !isValid }
            >
                Login
            </button>
        </>
    );
}

export default LoginForm;