import {useNavigate} from "react-router-dom";
import DashBoardMyNoteListItem from "../item/DashBoardMyNoteListItem";

function DashBoardMyNoteList({data}) {

    const navigate = useNavigate();

    const onClickmoveNoteHandler = () => {
        navigate('/note');
    }

    return(
        <>
            <div>
                <div className="dashBoard-project">
                    <img src="/project/Rectangle.png"/>
                    <p>받은 편지함</p>
                    <img
                        className="goProjects"
                        onClick={ onClickmoveNoteHandler }
                        src="/project/eva_arrow-left-fill.png"/>
                </div>
                {
                    data &&
                    data.map((note, index) => <DashBoardMyNoteListItem key={note.noteCode || index} note={note}/>)
                }
            </div>
        </>
    );
}

export default DashBoardMyNoteList;