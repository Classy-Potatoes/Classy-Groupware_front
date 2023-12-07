import {useState} from "react";
import {useDispatch} from "react-redux";
import {callEmailSearchPwdAPI} from "../../apis/MemberAPICalls";

function SearchPwdForm() {

    const dispatch = useDispatch();
    const [ form, setFrom ] = useState({
        memberId: "",
        infoCode: "",
        infoEmail: "",
        emailUrl: "@gmail.com"
    });

    const onChangeHandler = e => {
        setFrom({
            ...form,
            [ e.target.name ]: e.target.value
        });
    }

    const onClickLoginHandler = () => {

        console.log( form );
        dispatch( callEmailSearchPwdAPI({ searchPwdRequest : form } ));
    }


    return (
        <>
            <div className="login-div-title">비밀번호 찾기</div>
            <div className="search-div-inputs">
                <input
                    type="text"
                    name="memberId"
                    placeholder="아이디를 입력해주세요"
                    onChange={ onChangeHandler }
                />
                <input
                    type="text"
                    name="infoCode"
                    placeholder="사번을 입력해주세요"
                    onChange={ onChangeHandler }
                />
                <div className="search-div-email">
                    <input
                        type="text"
                        className="width120"
                        name="infoEmail"
                        placeholder="이메일"
                        onChange={ onChangeHandler }
                    />
                    <select
                        name="emailUrl"
                        onChange={ onChangeHandler }
                    >
                        <option value="@gmail.com">@gmail.com</option>
                        <option value="@naver.com">@naver.com</option>
                    </select>
                </div>
            </div>
            <button
                className="search-button"
                onClick={ onClickLoginHandler }
            >
                임시 비밀번호 이메일로 전송
            </button>
        </>
    );
}

export default SearchPwdForm;