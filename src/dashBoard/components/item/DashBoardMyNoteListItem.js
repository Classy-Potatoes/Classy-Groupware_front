import {useNavigate} from "react-router-dom";

function DashBoardMyNoteListItem({note}) {

    const navigate = useNavigate();

    const onClickMoveProjectDetail = (noteCode) => {
        navigate(`/note/received/${noteCode}`);
    }

    return(
        <>
            <div className="dashBoard-project-item">
                <div>[{note.noteReceiptStatus}]</div>
                <div
                    className="dashBoard-project-Title"
                    onClick={ () => onClickMoveProjectDetail(note.noteCode) }
                >{note.noteBody}</div>
                <div>
                    {note.noteSentDate}
                </div>
            </div>
        </>
    );
}

export default DashBoardMyNoteListItem;