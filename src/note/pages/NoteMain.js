import Header from "../../dashBoard/components/common/Header";
import NoteNavBar from "../components/common/NoteNavbar";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callNoteListAPI} from "../apis/NoteAPICalls";
import NoteList from "../components/list/NoteList";

function NoteMain() {

    const dispatch = useDispatch(); //store에 값을 저장할 때 dispatch 이용
    const [currentPage, setCurrentPage] = useState(1);
    const { notes } = useSelector(state => state.noteReducer);

    useEffect(() => {
        /* 모든 쪽지에 대한 정보 요청 */
        dispatch(callNoteListAPI({ currentPage }));
    }, []);

    return(
        <>
            { notes
                &&
                <>
                    <NoteList data = { notes.data }/>
                </>
            }
        </>
    );

}
export default NoteMain;