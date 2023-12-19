import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callNoteImportantListAPI} from "../apis/NoteAPICalls";
import PagingBar from "../../common/components/pagingBar/PagingBar";
import NoteListItem from "../components/items/NoteListItem";

function NoteImportantMain() {

    const dispatch = useDispatch(); //store에 값을 저장할 때 dispatch 이용
    const { notes } = useSelector(state => state.noteReducer);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        /* 모든 쪽지에 대한 정보 요청 */
        dispatch(callNoteImportantListAPI({ currentPage }));
    }, [currentPage]);

    const options = [
        { value: '전체', label: '전체' },
        { value: '보낸 사람', label: '보낸 사람' },
        { value: '내용', label: '내용' },
    ];

    return (
        <>
            { notes
                &&
                <>
                    <NoteListItem note={ notes.data }
                                  options={ options } noteType="important"
                                  showSender={ true } showReceiver={ false } receivedViewProp={ true }/>
                    <PagingBar pageInfo={ notes.pageInfo } setCurrentPage={ setCurrentPage }/>
                </>
            }
        </>
    );

}

export default NoteImportantMain;