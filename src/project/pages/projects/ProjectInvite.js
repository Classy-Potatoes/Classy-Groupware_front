import React, { useState } from "react";
import ProjectInvitedItem from "../../components/items/project/ProjectInvitedItem";
import { useDispatch, useSelector } from "react-redux";
import { useParams  } from "react-router-dom";
import { useEffect } from "react";
import { callProjectInviteAPI, callProjectRemoveAPI } from "../../apis/ProjectAPICalls";
import { ToastContainer } from "react-toastify";
import ProjectModifyModal from "../../components/modal/ProjectModifyModal";
import InviteModal from "../../components/modal/InviteModal";

function ProjectInvite() {

    const dispatch = useDispatch();
    const { projectCode } = useParams();
    const { projectMember, project } = useSelector((state) => state.projectReducer);
    const [projectModifyModal, setProjectModifyModal] = useState(false);
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
    const [inviteModal, setInviteModal] = useState(false);

    /* 참석자 조회 */
    useEffect(() => {
        dispatch(callProjectInviteAPI({ projectCode }));
    }, [dispatch, projectCode]);

    /* 프로젝트 수정 */
    const onClickProjectModifyHandler = () => {
        setProjectModifyModal(true);
    };

    /* 프로젝트 삭제 */
    const onClickProjectDeleteHandler = () => {
        setConfirmDeleteModal(true);
    };

    const confirmDelete = () => {
        dispatch(callProjectRemoveAPI({ projectCode }));
        setConfirmDeleteModal(false);
    };

    const cancelDelete = () => {
        setConfirmDeleteModal(false);
    };

    /* 초대하기 */
    const onClickInviteHandler = () => {
        setInviteModal(true);
    };


    return (
        <>
            {projectModifyModal && (
                <ProjectModifyModal setProjectModifyModal={setProjectModifyModal}/>
            )}
            {confirmDeleteModal && (
                <div className="confirm-delete-modal">
                    <p>정말 삭제하시겠습니까?</p>
                    <button className="confirm-delete-modal-button" onClick={confirmDelete}>확인</button>
                    <button onClick={cancelDelete}>취소</button>
                </div>
            )}
            {inviteModal && (
                <InviteModal setInviteModal={setInviteModal} deptCode={project.deptCode} projectCode={projectCode} />
            )}
            {projectMember && (
                <div className="project-invite-div">
                    <div className="project-invite">
                        <button
                            className="invite-button"
                            onClick={onClickInviteHandler}
                        >
                            초대하기
                        </button>
                        <ProjectInvitedItem projectMember={projectMember} />
                        <div className="project-button">
                            <button onClick={onClickProjectModifyHandler}>수정</button>
                            <button onClick={onClickProjectDeleteHandler}>삭제</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProjectInvite;