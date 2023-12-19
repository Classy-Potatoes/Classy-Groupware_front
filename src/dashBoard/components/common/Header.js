import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {callMyProfileAPI} from "../../../member/apis/MemberAPICalls";


function Header () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { getProfile } = useSelector( state => state.memberReducer );

    useEffect(() => {

        dispatch( callMyProfileAPI() );
    }, []);

    /* 로고 클릭 시 메인 페이지로 이동 */
    const onClickHandler = () => {
        navigate("/");
    }

    return (
        <>
            <div className="header-container">
                <div className="header-left">
                    <img
                        src="/cg 로고 2.png"
                        onClick={ onClickHandler }
                        alt="CG 로고"
                        className="main-logo"
                    />
                    <a className="logo-name"
                       onClick={ onClickHandler }
                    >Classy<br/>
                        Groupware</a>
                </div>
                {
                    getProfile &&
                    <div className="header-right">
                        <img src={ getProfile.getFilePathName } className='header-right-img' />
                        <div>{getProfile.deptName} {getProfile.infoName} {getProfile.jobName}님 환영합니다.</div>
                    </div>
                }
            </div>
            <div className="header-line" />
        </>
    );
}

export default Header;