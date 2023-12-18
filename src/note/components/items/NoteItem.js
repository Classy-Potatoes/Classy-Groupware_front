import {useNavigate, useParams} from "react-router-dom";
import * as React from "react";
import {useState} from "react";
import NoteReplyModal from "../../pages/NoteReplyModal";
import {callProjectRemoveAPI} from "../../../project/apis/ProjectAPICalls";
import {callNoteReceivedRemoveAPI, callNoteSentRemoveAPI} from "../../apis/NoteAPICalls";
import {useDispatch} from "react-redux";

function NoteItem({ note, titleName, titleTime }) {

    const dispatch = useDispatch();
    const { noteCode } = useParams();
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

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

    return (
        <>
            <div className="note-detail-div">
                <div className="note-detail-title"
                     style={{ fontSize: "30px", marginTop: "20px", marginLeft: "40px" }}>
                    <img src="/note/fi-rs-comment.png" style={{ marginRight: "20px" }}/>
                    쪽지 읽기
                </div>
            </div>

            <div className="note-body-container"
                 style={{ marginTop: '40px', width: '1400px', marginLeft: '40px', height: '500px' }}>
                <div className="note-detail" style={{ marginLeft: '40px',  marginTop: '40px' }}>{ titleName }
                    <span style={{ marginLeft: '30px', marginBottom: '40px' }}>{ note.noteSender }</span>
                </div>
                <div className="note-detail"
                     style={{ marginLeft: '40px',  marginTop: '30px', marginBottom:'30px', borderBottom: '1px solid black', paddingBottom: '40px'}}>
                    { titleTime }
                    <span style={{ marginLeft: '30px', marginBottom: '20px' }}>{ note.noteSentDate }</span>

                    <button
                        onClick={ onClickDelete }
                        className="note-delete-btn"
                    >
                        <img src="/note/trash-2.png" alt="쪽지 삭제"/>
                    </button>
                </div>

                <div className="note-detail" style={{ marginLeft: '40px', lineHeight: '1.5' }}>{ note.noteBody }</div>

            </div>

            {deleteModal && (
            <div className="note-delete-modal">
            <p>삭제하시겠습니까?</p>
                <button className="delete-modal-btn" onClick={deleteModalBtn}>확인 ></button>
                <button onClick={cancelDeleteBtn}>취소</button>
            </div>)
            }
            <div class="note-button">

                <button
                    onClick={ onClickSent }
                    className="note-sent"
                    style={{ marginLeft: '1100px',
                        marginTop: '30px',
                        backgroundColor: '#C0A3FF',
                        border: '1px solid #8A2BE2',
                        width: '130px',
                        borderRadius: '50px',
                        padding: '15px' }}
                >
                    답장
                </button>

                { isModalOpen &&
                    (<NoteReplyModal onClose={ closeModal } onSaveReply={ onSaveReply }/>) }

                <button
                    onClick={ () => navigate(-1) }
                    className="note-back"
                    style={{
                        marginLeft: '65px',
                        marginTop: '30px',
                        backgroundColor: 'black',
                        color: 'white',
                        border: '1px solid black',
                        width: '130px',
                        borderRadius: '50px',
                        padding: '15px'
                    }}
                >
                    취소
                </button>
            </div>
        </>
    );

}

export default NoteItem;