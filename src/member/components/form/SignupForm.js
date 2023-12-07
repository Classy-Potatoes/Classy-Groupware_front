import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {callSignupAPI} from "../../apis/MemberAPICalls";
import {useDispatch} from "react-redux";

function SignupForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ form, setFrom ] = useState({});

    const onChangeHandler = e => {
        setFrom({
            ...form,
            [ e.target.name ]: e.target.value
        });
    }

    const onClickSignupHandler = () => {

        // console.log( form );
        // dispatch( callSignupAPI( { signupRequest : form } ) );
    }

    const onClickBackHandler = () => {
        navigate('/member/login');
    }

    const isInput = () => {
        // 사번 맞으면 활성
        return true;
    }


    return(
        <>
            <div className="login-div-title">회원가입</div>
            <div className="signup-div-profile">
                <div className="signup-div-profile-img"></div>
                <div className="signup-div-profile-title">프로필 사진</div>
            </div>
            <div className="signup-div-form">
                <div className="signup-div-left">
                    <span>* 사전에 받은 사원번호를 입력해주세요.</span>
                    <input
                        type="text"
                        name="infoCode"
                        placeholder="* 사원번호"
                        // onChange={ onChangeHandler }
                    />
                    <input
                        type="text"
                        name="memberId"
                        placeholder="* 아이디"
                        disabled={ isInput() ? true : false }
                    />
                    <input
                        type="password"
                        name="member"
                        placeholder="* 비밀번호"
                        disabled={ isInput() ? true : false }
                    />
                    <input
                        type="password"
                        name="memberName"
                        placeholder="* 비밀번호 확인"
                        disabled={ isInput() ? true : false }
                    />
                    <input
                        type="text"
                        name="infoPhone"
                        placeholder="* 휴대번호"
                        disabled={ isInput() ? true : false }
                    />
                    <div className="signup-div-left-email">
                        <input
                            type="text"
                            className="email-input"
                            name="infoEmail"
                            placeholder="* 이메일"
                            disabled={ isInput() ? true : false }
                        />
                        <select
                            name="ttt"
                            defaultValue="@gmail.com"
                            disabled={ isInput() ? true : false }
                        >
                            <option value="@gmail.com">@gmail.com</option>
                            <option value="@naver.com">@naver.com</option>
                        </select>
                    </div>


                </div>

                <div className="signup-div-right">
                    <span>* 은 필수 입력 사항입니다.</span>
                    <input
                        type="text"
                        name="infoName"
                        className="disabledInput"
                        placeholder="이름"
                        // placeholder="김형수"
                        disabled={ true }
                    />
                    <input
                        type="text"
                        name="deptName"
                        className="disabledInput"
                        placeholder="부서"
                        // placeholder="개발팀"
                        disabled={ true }
                    />
                    <input
                        type="text"
                        name="jobName"
                        className="disabledInput"
                        placeholder="직급"
                        // placeholder="대표"
                        disabled={ true }
                    />

                    <div className="signup-div-right-address">
                        <input
                            type="text"
                            name="infoZipcode"
                            className="zipcode-input"
                            placeholder="* 우편번호"
                            disabled={ isInput() ? true : false }
                        />
                        <button
                            className="address-search"
                            disabled={ isInput() ? true : false }
                        >
                            주소찾기
                        </button>
                    </div>

                    <input
                        type="text"
                        name="infoAddress"
                        placeholder="* 주소"
                        disabled={ isInput() ? true : false }
                    />
                    <input
                        type="text"
                        name="infoAddressAdd"
                        placeholder="* 상세주소"
                        disabled={ isInput() ? true : false }
                    />
                </div>
            </div>
            <div className="signup-div-button">
                <button
                    onClick={ onClickBackHandler }
                >
                    메인으로
                </button>
                <button
                    onClick={ onClickSignupHandler }
                    disabled={ isInput() ? true : false }
                >
                    가입하기
                </button>
            </div>



        </>
    );

}

export default SignupForm;