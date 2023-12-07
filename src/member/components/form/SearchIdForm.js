import {useState} from "react";
import {useDispatch} from "react-redux";
import {callSearchIdAPI} from "../../../member/apis/MemberAPICalls";

function SearchIdForm() {

    const dispatch = useDispatch();
    const [ form, setFrom ] = useState({});

    const onChangeHandler = e => {
        setFrom({
            ...form,
            [ e.target.name ]: e.target.value
        });
    }


    const onClickSearchIdHandler = () => {

        console.log( form );
        dispatch( callSearchIdAPI({ searchIdRequest : form }));
    }

    const onEnterkeyHandler = e => {

        if (e.key === 'Enter') {
            onClickSearchIdHandler();
        }
    }


    return (
        <>
            <div className="login-div-title">아이디 찾기</div>
            <div className="search-div-inputs">
                <input
                    type="text"
                    name="infoName"
                    placeholder="이름을 입력해주세요"
                    onChange={ onChangeHandler }
                />
                <input
                    type="text"
                    name="infoCode"
                    placeholder="사번을 입력해주세요"
                    onChange={ onChangeHandler }
                    onKeyUp={ onEnterkeyHandler }
                />
            </div>
            <button
                className="search-button"
                onClick={ onClickSearchIdHandler }
            >
                아이디 찾기
            </button>
        </>
    );
}

export default SearchIdForm;