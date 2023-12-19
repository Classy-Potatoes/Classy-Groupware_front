import {NavLink} from "react-router-dom";
import {useState} from "react";
import Navbar from "../../../dashBoard/components/common/Navbar";
import * as React from "react";

function NoteNavbar() {

    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <>

            <div className={ `navbar-div ${ isNavOpen ? "nav-open" : "" }` }>

                <div className="note-navbar-title">
                    <p>Classy<br/>Groupware</p>
                </div>

                <div className="total-nav" onClick={ handleNavToggle }>
                    <img src="/ph_list-light.png" alt="전체" />
                    <p>전체</p>
                </div>

                <div className="note-nav-bar">

                    <div className="note-nav-main">
                        <NavLink to="/note">
                            <div className="note-img">
                                <img src="/note/ic_outline-mail.png" alt="쪽지 아이콘"/>
                                <p className="note-main">쪽지</p>
                            </div>
                        </NavLink>
                    </div>

                    <div className="note-nav-category">
                        <p><NavLink to="/note/send">쪽지 작성</NavLink></p>
                        <p><NavLink to="/note">받은 쪽지함</NavLink></p>
                        <p><NavLink to="/note/sent">보낸 쪽지함</NavLink></p>
                        <p><NavLink to="/note/important">중요 쪽지함</NavLink></p>
                    </div>

                </div>

            </div>

            {/* isNavOpen 값에 따라 Navbar를 조건부로 렌더링 */}
            { isNavOpen && (
                <div className="navbar-overlay">
                    <Navbar isOpen={ isNavOpen } />
                </div>
            ) }

        </>
    );

}

export default NoteNavbar;