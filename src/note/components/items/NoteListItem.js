import {useNavigate} from "react-router-dom";

function NoteListItem({note}) {

    const navigate = useNavigate();

    const onClickNoteHandler = (note) => {
        navigate(`/note/received/${note.noteCode}`)
    }

    /* 컴포넌트 하나당 목록을 보여주는 쪽지 하나를 표현하기 위해 선언 - 쪽지 정보 */
    return (
        <>
            {note &&

                <div onClick={onClickNoteHandler} className="note-div">
                    <div className="note-title">
                        <div className="note-info">
                            <div className="note-title">
                                <div className="title">보낸 사람</div>
                                <div className="title">내용</div>
                                <div className="title">날짜</div>
                            </div>


                            {
                                note.map(note => (
                                    <div className="note-item" key={note.noteCode}>
                                        <div className="content">{note.noteSender}</div>
                                        <div className="content">{note.noteBody}</div>
                                        <div className="content">{note.noteSentDate}</div>
                                    </div>

                                ))
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
    export default NoteListItem;