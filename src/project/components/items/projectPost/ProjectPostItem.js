import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect, useState} from "react";
import {
    callProjectPostDeleteAPI,
    callProjectPostModifyAPI, callProjectPostReplyRegistAPI
} from "../../../apis/ProjectPostAPICalls";
import {useNavigate, useParams} from "react-router-dom";
import ProjectPostReplyList from "../../lists/ProjectPost/ProjectPostReplyList";
import {postSuccess} from "../../../modules/ProjectPostModule";

function ProjectPostItem({ projectPost }) {

    const dispatch = useDispatch();
    const [form, setForm] = useState({});
    const [modifyMode, setModifyMode] = useState(false);
    const navigate = useNavigate();
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);


    const { postCode } = projectPost;
    const { projectCode } = projectPost;

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    /* 파일 다운로드 */
    const onClickImgLink = useCallback((srcUrl: string, name: string) => {
        fetch(srcUrl, { method: 'GET' }).then((res) => res.blob()).then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            setTimeout((_) => {
                window.URL.revokeObjectURL(url);
            }, 1000);
            a.remove();
        }).catch((err) => {
            console.error('err', err);
        });
    }, []);

    /* 수정 모드로 변환하는 이벤트 */
    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({...projectPost});
    }

    /* 상품 수정 요청하는 이벤트 */
    const onClickProjectPostUpdateHandler = () => {

        const newForm = {
            ...form
        };

        dispatch(callProjectPostModifyAPI({ postCode, postUpdateRequest: newForm }));

    };

    const inputStyle = !modifyMode ? { border: 0, background: 'none', color: 'black' } : null;


    /* 프로젝트 게시글 삭제 */
    const onClickPostDeleteHandler = () => {
        setConfirmDeleteModal(true);
    };

    const confirmDelete = () => {

        dispatch(callProjectPostDeleteAPI({ postCode, projectCode }));
        setConfirmDeleteModal(false);
    };

    const cancelDelete = () => {
        setConfirmDeleteModal(false);
    };

    /* 댓글 작성 */
    const onClickPostReplyRegistHandler = () => {
        const newForm = {
            ...form,
            postCode
        };

        dispatch(callProjectPostReplyRegistAPI({replyCreateRequest: newForm}));

    };


    /* 댓글 작성 성공시 */
    useEffect(() => {
        if (postSuccess === true) {
            window.location.reload();
        }
    }, [postSuccess]);



    return (
        <>
            {confirmDeleteModal && (
                <div className="confirm-delete-modal">
                    <p>정말 삭제하시겠습니까?</p>
                    <button className="confirm-delete-modal-button" onClick={confirmDelete}>확인</button>
                    <button onClick={cancelDelete}>취소</button>
                </div>
            )}
            <div className="project-post-item-div">
                <div className="project-postList-name">{projectPost.memberName}</div>
                <div className="project-postList-date">
                    {projectPost.postCreatedDate}
                    {projectPost.memberCode === projectPost.customUser.infoCode && (
                        <div className="project-postList-button">
                            {!modifyMode &&
                                <button
                                    onClick={ onClickModifyModeHandler }
                                >수정
                                </button>
                            }
                            { modifyMode &&
                                <button
                                    onClick={ onClickProjectPostUpdateHandler }
                                    >
                                    수정완료
                                </button>
                            }
                            <button
                                onClick={ onClickPostDeleteHandler }
                            >
                                삭제
                            </button>
                        </div>
                    )}
                </div>

                <div className="project-postList-Title">
                    <label>제목 : </label>
                    <input
                        name="postTitle"
                        placeholder="게시글 제목"
                        value={modifyMode ? form.postTitle : projectPost.postTitle}
                        disabled={!modifyMode}
                        style={inputStyle}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="project-postList-Body">
                    <input
                        name="postBody"
                        placeholder="게시글 내용"
                        value={ modifyMode ? form.postBody : projectPost.postBody }
                        disabled={ !modifyMode }
                        style={ inputStyle }
                        onChange={onChangeHandler}
                    />
                </div>

                <div className="project-post-file">
                    <label>첨부파일 : </label>
                    {projectPost.files.map(({ fileName, filePathName }) => (
                        <div
                            key={fileName}
                            onClick={() => onClickImgLink({filePathName}, fileName)}
                        >
                            <div className="fileNameButton">{fileName}</div>
                        </div>
                    ))}
                </div>
                <div>
                    <ProjectPostReplyList projectPost={projectPost} reply={projectPost.replies}/>
                </div>

                <div className="reply-regist">
                    <img src="/project/담당자.png" alt="Profile" />
                    <input
                        className="reply-regist-input"
                        type="text"
                        name="replyBody"
                        placeholder="댓글을 입력하세요."
                        onChange={onChangeHandler}
                    />
                    <button onClick={ onClickPostReplyRegistHandler }>등록</button>
                </div>
            </div>
        </>
    );
}

export default ProjectPostItem;