import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    callDeptMemberSearchAPI,
    callMyDeptMemberAPI,
    callProjectInviteAPI,
} from "../../apis/ProjectAPICalls";
import ProjectInviteItem from "../items/ProjectInviteItem";

function InviteModal({ setInviteModal, deptCode }) {
    const dispatch = useDispatch();
    const { myDeptMember} = useSelector((state) => state.projectReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useState({
        value: "",
    });
    const infoName = searchParams.value;



    /* 부서별 회원 조회 */
    useEffect(() => {
        dispatch(callMyDeptMemberAPI({ deptCode }));
    }, [dispatch, deptCode]);

    /* 부서별 회원 검색 */
    useEffect(() => {
        const timer = setTimeout(() => {
            // 검색 요청 보내기
            dispatch(callDeptMemberSearchAPI({ deptCode, infoName }));
        }, 300); // 500ms마다 검색 요청 보내기 (쓸데없이 자주 보내지 않도록)

        return () => clearTimeout(timer); // 타이머 클리어
    }, [infoName, deptCode, dispatch]);

    return (
        <>
            <div className="invite-modal-overlay">
                <div className="invite-modal-div">

                    <div className="invite-modal-header">
                        <h3>프로젝트 초대하기</h3>
                    </div>

                    <div className="invite-modal-search">
                        <img src="/project/search.png" />
                        <input
                            type="text"
                            value={searchParams.value}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSearchParams({ ...searchParams, value });
                            }}
                            placeholder="직원 이름으로 검색"
                        />
                    </div>

                    <div className="invite-modal-content">
                        <ProjectInviteItem
                            myDeptMember={myDeptMember}
                        />
                    </div>

                    <div className="invite-modal-footer">
                        <button
                            className="invite-close-button"
                            onClick={() => setInviteModal(false)}
                        >
                            닫기
                        </button>
                        <button className="invite-invite-button">프로젝트 초대</button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default InviteModal;