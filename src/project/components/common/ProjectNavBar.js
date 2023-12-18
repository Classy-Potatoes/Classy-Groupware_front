import {NavLink} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Navbar from "../../../dashBoard/components/common/Navbar";
import NewProjectWriteModal from "../modal/NewProjectWriteModal";
import {useDispatch, useSelector} from "react-redux";
import {callLoginInfoAPI} from "../../apis/ProjectAPICalls";


function ProjectNavBar() {

    const [isNavOpen, setIsNavOpen] = useState(false);
    const [newProjectWriteModal,setNewProjectWriteModal ] = useState(false);
    const dispatch = useDispatch();
    const {loginInfo} =useSelector(state => state.projectReducer);

    console.log("lo", loginInfo);

    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen);
    };

    /* 새 프로젝트 만들기 */
    const onClickNewProjectHandler = () => {
        setNewProjectWriteModal(true);
    }

    useEffect(() => {
        const fetchLoginInfo = async () => {
            // You need to call the function to get the thunk
            await dispatch(callLoginInfoAPI());
        };

        fetchLoginInfo();
    }, [dispatch]);


    return (
        <>
            {
                newProjectWriteModal &&
                <NewProjectWriteModal
                    setNewProjectWriteModal={setNewProjectWriteModal}
                />
            }
            <div className={`navbar-div ${isNavOpen ? "nav-open" : ""}`}>
                <div>
                    { loginInfo && loginInfo.jobCode <= 4 ? (
                        <button className="add-project" onClick={onClickNewProjectHandler}>
                            <p>+새프로젝트</p>
                        </button>
                    ) : (
                        <div  className="project-Classy">
                            <p>
                                Classy<br/>
                                Groupware
                            </p>
                        </div>
                    )}
                </div>

                <div className="total-nav" onClick={handleNavToggle}>
                    <img src="/ph_list-light.png" alt="전체" />
                    <p>전체</p>
                </div>

                <div className="nav-bar">

                    <div className="nav-bar-p">
                        <NavLink to="/projects"><p><img src="/project.png"/>프로젝트</p></NavLink>
                        <NavLink to="/projects/myTask"><p><img src="/calender.png"/>내 업무</p></NavLink>
                        <NavLink to="/projects/myTodo"><p><img src="/work.png"/>내 할일</p></NavLink>
                    </div>
                </div>
            </div>

            {/* isNavOpen 값에 따라 Navbar를 조건부로 렌더링 */}
            {isNavOpen && (
                <div className="navbar-overlay">
                    <Navbar isOpen={isNavOpen} />
                </div>
            )}
        </>
    );
}

export default ProjectNavBar;