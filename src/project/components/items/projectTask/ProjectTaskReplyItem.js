import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {callPeojectTaskReplyModifyAPI, callProjectTaskReplyDeleteAPI} from "../../../apis/ProjectTaskAPICalls";

function ProjectTaskReplyItem({replies: {replyCode, memberName, memberCode, replyBody, replyCreatedDate},
                                  projectTask
                              }) {

    const [replyModifyMode, setReplyModifyMode] = useState(false);
    const dispatch = useDispatch();
    const [form, setForm] = useState({});
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    /* 댓글 수정 모드로 변환하는 이벤트 */
    const onClickReplyModifyModeHandler = (replyCode) => {
        setForm({
            ...form,
            replyCode, // 댓글을 수정할 때 해당 댓글의 replyCode를 form에 저장
        });
        setReplyModifyMode(true);
    };

    /* 댓글 수정 요청하는 이벤트 */
    const onClickRepleyProjectTaskUpdateHandler = () => {
        const {replyCode} = form; // 저장된 replyCode 가져오기
        // replyCode를 사용하여 API 호출 또는 다른 로직 수행
        dispatch(callPeojectTaskReplyModifyAPI({replyCode, replyRequest: form}))
            .then((response) => {
                toast.info("댓글 수정 완료 되었습니다.",);
            });
    };

    const replyInputStyle = !replyModifyMode
        ? {
            background: "#E7E2E2",
            border: 0,
            fontSize: "14px",
            fontFamily: "Noto Sans",
            color: 'black'
        }
        : null;


    /* 댓글 삭제 */
    const onClickTaskReplyDeleteHandler = (replyCode) => {
        setForm({
            ...form,
            replyCode, // 댓글을 삭제할 때 해당 댓글의 replyCode를 form에 저장
        });
        setConfirmDeleteModal(true);
    };

    const confirmReplyDelete = () => {
        const {replyCode} = form; // 저장된 replyCode 가져오기
        // replyCode를 사용하여 API 호출 또는 다른 로직 수행
        dispatch(callProjectTaskReplyDeleteAPI({replyCode}))

        setConfirmDeleteModal(false);
    };

    const cancelDelete = () => {
        setConfirmDeleteModal(false);
    };

    return (
        <>
            {confirmDeleteModal && (
                <div className="confirm-delete-modal">
                    <p>정말 삭제하시겠습니까?</p>
                    <button className="confirm-delete-modal-button" onClick={confirmReplyDelete}>
                        확인
                    </button>
                    <button onClick={cancelDelete}>취소</button>
                </div>
            )}
            <div className="reply-item">
                <div className="reply-info">
                    <img src="/project/담당자.png" alt="Profile"/>
                    {memberName}
                </div>
                <div className="reply-body">
                    <input
                        name="replyBody"
                        placeholder="댓글 내용"
                        value={replyModifyMode ? form.replyBody : replyBody}
                        disabled={!replyModifyMode}
                        style={replyInputStyle}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="reply-date">{replyCreatedDate}</div>

                {memberCode === projectTask.customUser.infoCode && (

                    <div className="reply-actions">
                        {!replyModifyMode && (
                            <button onClick={() => onClickReplyModifyModeHandler(replyCode)}>
                                수정
                            </button>
                        )}
                        {replyModifyMode && (
                            <button onClick={onClickRepleyProjectTaskUpdateHandler}>수정완료</button>
                        )}
                        <button onClick={() => onClickTaskReplyDeleteHandler(replyCode)}>
                            삭제
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProjectTaskReplyItem;