import {useNavigate} from "react-router-dom";
import * as React from "react";
import {useState} from "react";
import NoteReplyModal from "../../pages/NoteReplyModal";

function NoteItem({ note, titleName, titleTime }) {

    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);

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
                <div className="note-detail" style={{ marginLeft: '40px',  marginTop: '20px' }}>{ titleName }
                    <span style={{ marginLeft: '30px', marginBottom: '40px' }}>{ note.noteSender }</span>
                </div>
                <div className="note-detail"
                     style={{ marginLeft: '40px',  marginTop: '30px', marginBottom:'30px', borderBottom: '1px solid black', paddingBottom: '40px'}}>
                    { titleTime }
                    <span style={{ marginLeft: '30px', paddingBottom: '40px', marginBottom: '20px' }}>{ note.noteSentDate }</span>
                </div>

                <div className="note-detail" style={{ marginLeft: '40px', lineHeight: '1.5' }}>{ note.noteBody }</div>

            </div>

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