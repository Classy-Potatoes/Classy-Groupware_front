import {useNavigate} from "react-router-dom";


function Header () {

    const navigate = useNavigate();

    /* 로고 클릭 시 메인 페이지로 이동 */
    const onClickHandler = () => {
        navigate("/");
    }

    return (
        <>
            <div className="header-container">
                <img
                    src="/cg 로고 2.png"
                    onClick={ onClickHandler }
                    alt="CG 로고"
                    className="main-logo"
                />
                <a className="logo-name">Classy<br/>
                    Groupware</a>
            </div>
            <div className="header-line" />
        </>
    );
}

export default Header;