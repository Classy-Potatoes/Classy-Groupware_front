import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    callDeptMemberSearchAPI, callInviteMemberAPI,
    callMyDeptMemberAPI,
    callProjectInviteAPI, callProjectRegistAPI,
} from "../../apis/ProjectAPICalls";
import ProjectInviteItem from "../items/project/ProjectInviteItem";

function InviteModal({ setInviteModal, deptCode, projectCode }) {
    const dispatch = useDispatch();
    const { myDeptMember} = useSelector((state) => state.projectReducer);
    const [searchParams, setSearchParams] = useState({
        value: "",
    });
    const infoName = searchParams.value;
    const [form, setForm] = useState({});
    const { postSuccess } = useSelector(state => state.projectReducer);
    const [selectedMembers, setSelectedMembers] = useState([]);

    /* 부서별 회원 조회 */
    useEffect(() => {
        dispatch(callMyDeptMemberAPI({ deptCode, projectCode}));
    }, [dispatch, deptCode, projectCode]);

    /* 부서별 회원 검색 */
    useEffect(() => {
        const timer = setTimeout(() => {
            // 검색 요청 보내기
            dispatch(callDeptMemberSearchAPI({ deptCode, infoName, projectCode }));
        }, 300); //

        return () => clearTimeout(timer); // 타이머 클리어
    }, [infoName, deptCode, dispatch, projectCode]);

    // 프로젝트 멤버 선택이 변경될 때 처리할 콜백 함수
    const handleMemberSelect = (infoCodes) => {
        setSelectedMembers(infoCodes);
    };

    useEffect(() => {
        if(postSuccess === true) {
            setInviteModal(false);
            window.location.reload();
        }
    }, [postSuccess, setInviteModal]);

    /* 프로젝트 생성 버튼 클릭 시 이벤트 */
    const onClickProjectMemberInviteHandler = () => {
        const newForm = {
            members: selectedMembers.map(infoCode => ({ projectCode, memberCode: infoCode }))
        };

        dispatch(callInviteMemberAPI({ projectInviteMemberRequests: newForm }));
        console.log('Form 담겼니? : ', newForm);
    };

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
                            onMemberSelect={handleMemberSelect}
                        />
                    </div>

                    <div className="invite-modal-footer">
                        <button
                            className="invite-close-button"
                            onClick={() => setInviteModal(false)}
                        >
                            닫기
                        </button>
                        <button
                            className="invite-invite-button"
                            onClick={ onClickProjectMemberInviteHandler }
                        >
                            프로젝트 초대
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default InviteModal;