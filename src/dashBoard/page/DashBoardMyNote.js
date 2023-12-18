import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callNoteReceivedListAPI} from "../../note/apis/NoteAPICalls";
import DashBoardMyNoteList from "../components/list/DashBoardMyNoteList";

function DashBoardMyNote() {

    const dispatch = useDispatch();
    const { notes } = useSelector(state => state.noteReducer);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {

        dispatch(callNoteReceivedListAPI({currentPage}));
    }, [currentPage]);

    return(
        <>
            {   notes
                &&
                <DashBoardMyNoteList data={notes.data}/>
            }
        </>
    );
}

export default DashBoardMyNote;