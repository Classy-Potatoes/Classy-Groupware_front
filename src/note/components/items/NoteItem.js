import {useLocation, useNavigate, useParams} from "react-router-dom";
import * as React from "react";
import {useEffect, useState} from "react";
import NoteReplyModal from "../../pages/NoteReplyModal";
import {callNotePostModifyAPI, callNoteSentRemoveAPI} from "../../apis/NoteAPICalls";
import {useDispatch, useSelector} from "react-redux";

function NoteItem({ note, titleName, titleTime}) {

    console.log(titleName   , "13213123")

    const dispatch = useDispatch();
    const { noteCode } = useParams();
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [importantModal, setImportantModal] = useState(false);

    const { state : {noteType} } = useLocation();
    const {putSuccess} =  useSelector(state => state.noteReducer)

    useEffect(() => {
        if(putSuccess === true) {
            if(noteType === 'received') {
                navigate(`/note/important`);
            } else if(noteType === 'important') {
                navigate(`/note`);
            }
        }
    }, [putSuccess]);

    const onClickSent =() => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const onSaveReply = (replyBody) => {
        console.log('SaveReply : ', replyBody);
        closeModal();
    };

    /* 쪽지 삭제 */
    const onClickDelete = () => {
        setDeleteModal(true);
    };

    const deleteModalBtn =() => {
        dispatch(callNoteSentRemoveAPI({ noteCode }));
        setDeleteModal(false);
    };

    const cancelDeleteBtn = () => {
        setDeleteModal(false);
    }

    /* 중요 쪽지함 이동 */
    const onClickImportant = () => {
        setImportantModal(true);
    };

    const importantModalBtn = () => {
        dispatch(callNotePostModifyAPI({ noteCode }));
        setImportantModal(false);
    };

    const cancelImportantBtn =() => {
        setImportantModal(false);
    }

    return (
        <>
            <div className="note-detail-div">
                <div className="note-detail-title"
                     style={{ fontSize: "30px", marginTop: "20px", marginLeft: "40px" }}>
                    <img src="/note/fi-rs-comment.png" style={{ marginRight: "20px" }}/>
                    쪽지 읽기
                    {noteType}
                </div>
            </div>

            <div className="note-body-container"
                 style={{ marginTop: '40px', width: '1400px', marginLeft: '40px', height: '500px' }}>
                <div className="note-detail" style={{ marginLeft: '40px',  marginTop: '40px' }}>{ titleName }
                    <span style={{ marginLeft: '30px', marginBottom: '40px' }}>
                        {noteType === 'received' || noteType === 'important' ? note.noteSender : note.noteReceiver}
                    </span>
                </div>
                <div className="note-detail"
                     style={{ marginLeft: '40px',  marginTop: '30px', marginBottom:'30px', borderBottom: '1px solid black'}}>
                    { titleTime }
                    <span style={{ marginLeft: '30px', marginBottom: '20px' }}>{ note.noteSentDate }</span>

                    <div className="note-btn">
                        { (noteType === "received" || noteType === "important") &&
                            <button
                                onClick={ onClickImportant }
                                className="note-important-btn"
                            >
                                <img src="/note/fi-rr-star.png" alt="쪽지 보관"/>
                            </button>
                        }

                        <button
                            onClick={ onClickDelete }
                            className="note-delete-btn"
                        >
                            <img src="/note/trash-2.png" alt="쪽지 삭제"/>
                        </button>
                    </div>
                </div>

                <div className="note-detail" style={{ marginLeft: '40px', lineHeight: '1.5' }}>{ note.noteBody }</div>

            </div>

            { importantModal && (
                <div className="note-important-modal">
                    <p>
                        {noteType === 'received'
                            ? '중요 쪽지함으로 이동하시겠습니까?'
                            : '받은 쪽지함으로 이동하시겠습니까?'
                        }
                    </p>
                    <button className="important-modal-btn" onClick={ importantModalBtn }>확인</button>
                    <button onClick={ cancelImportantBtn }>취소</button>
                </div>
            )}

            { deleteModal && (
                <div className="note-delete-modal">
                    <p>삭제하시겠습니까?</p>
                    <button className="delete-modal-btn" onClick={ deleteModalBtn }>확인</button>
                    <button onClick={ cancelDeleteBtn }>취소</button>
                </div>
            )}

            <div class="note-button">
                { (noteType === "received" || noteType === "important") &&
                    <button
                        onClick={ onClickSent }
                        className="note-sent"
                    >
                        답장
                    </button>
                }


                { isModalOpen &&
                    (<NoteReplyModal onClose={ closeModal } onSaveReply={ onSaveReply }/>) }

                <button
                    onClick={ () => navigate(-1) }
                    className="note-back"
                >
                    취소
                </button>
            </div>
        </>
    );

}

export default NoteItem;