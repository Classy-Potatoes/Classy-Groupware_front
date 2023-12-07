import "react-toastify/dist/ReactToastify.css";
import {useSelector} from "react-redux";

function ResultSearchId() {

    const { searchIdResult } = useSelector(state => state.memberReducer );

    const onClickBackHandler = () => {
        window.location.replace("/");
    }

    return (
        <>
            {
                searchIdResult &&
                <div className="background-div-logo">
                    <div className="login-search-div">

                        <div className="login-div-title">아이디 찾기</div>
                        <div className="search-div-inputs">
                            <p className="searchId-result">'{ searchIdResult.infoName }'님의 아이디는 '{ searchIdResult.memberId }' 입니다.</p>
                        </div>

                        <button
                            className="search-button"
                            onClick={ onClickBackHandler }
                        >
                            메인으로
                        </button>
                    </div>
                </div>
            }
        </>
    );

}

export default ResultSearchId;