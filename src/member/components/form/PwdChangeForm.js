import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callCurrentPwdCheckAPI, callEmailSearchPwdAPI, callPwdChangeAPI} from "../../apis/MemberAPICalls";
import {pwdChangeResult, pwdCheckResult} from "../../modules/MemberModule";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function PwdChangeForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pwdChangeResult } = useSelector(state => state.memberReducer);
    const [ form, setForm ] = useState({
        currentPwd: "",
        memberPassword: "",
        memberPasswordCheck: ""
    } );


    useEffect(() => {

        if( pwdChangeResult === true ){
            toast.success('비밀번호를 변경했습니다.',
                {
                    autoClose : 1000,
                    onClose: () => {
                        navigate(0);
                    }
                }
            );
        }

    }, [ pwdChangeResult ]);


    const onChangeHandler = e => {
        setForm({
            ...form,
            [ e.target.name ]: e.target.value,
        });
    }


    const onClickPwdChangeHandler = () => {

        if ( form.memberPassword === form.memberPasswordCheck ) {

            dispatch( callPwdChangeAPI({ memberPwdRequest : form } ));
        } else {

            toast.dismiss();
            toast.error(
                <div>변경할 비밀번호가.<br />
                    서로 일치하지 않습니다.</div>,
                {
                    autoClose : 1000
                }
            );
        }
    }


    return (
        <>
            <div className="login-div-title">비밀번호 변경</div>
            <div className="pwd-div-inputs">
                <div className='pwd-div-input'>
                    <div className='pwd-div-title'>현재 비밀번호</div>
                    <div className='pwd-div-title'>변경할 비밀번호</div>
                    <div className='pwd-div-title'>변경할 비밀번호 확인</div>
                </div>
                <div className='pwd-div-input'>
                    <input
                        type="password"
                        name="currentPwd"
                        placeholder="변경할 비밀번호를 입력해주세요."
                        onChange={ onChangeHandler }
                    />
                    <input
                        type="password"
                        name="memberPassword"
                        placeholder="현재 비밀번호를 입력해주세요."
                        onChange={ onChangeHandler }
                    />
                    <input
                        type="password"
                        name="memberPasswordCheck"
                        placeholder="변경할 비밀번호를 한번 더 입력해주세요."
                        onChange={ onChangeHandler }
                    />
                </div>
            </div>
            <button
                className="search-button"
                onClick={ onClickPwdChangeHandler }
            >
                비밀번호 변경
            </button>
        </>
    );
}

export default PwdChangeForm;