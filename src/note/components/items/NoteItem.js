import {useNavigate} from "react-router-dom";
import {useState} from "react";

function NoteItem({ note }) {

    const navigate = useNavigate();
    const [amount, setAmount] = useState(1);

    return (
        <>
            <div className="note-container">
                <div className="note-info">보낸 사람</div>
                <div className="note-info">날짜</div>
                <div className="note-info">내용</div>
            </div>

            <div className="note-body">
                <div className="note-body-container">
                    <div className="note-body">{ note.noteSender }</div>
                    <div className="note-body">{ note.noteSentDate }</div>
                    <div className="note-body">{ note.noteBody }</div>
                </div>
            </div>
        </>
    );

}