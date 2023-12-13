import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callNoteSentListAPI} from "../apis/NoteAPICalls";
import PagingBar from "../../common/components/pagingBar/PagingBar";
import NoteListItem from "../components/items/NoteListItem";

function NoteSentMain() {

    const dispatch = useDispatch(); //store에 값을 저장할 때 dispatch 이용
    const { notes } = useSelector(state => state.noteReducer);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        /* 모든 쪽지에 대한 정보 요청 */
        dispatch(callNoteSentListAPI({ currentPage }));
    }, [currentPage]);

    const options = [
        { value: '전체', label: '전체' },
        { value: '받는 사람', label: '받는 사람' },
        { value: '내용', label: '내용' },
    ];

    return (
        <>
            { notes
                &&
                <>
                    <NoteListItem note={ notes.data } title="보낸 쪽지함"
                                  options={ options } noteType="sent"
                                  showSender={ false } showReceiver={ true }/>
                    <PagingBar pageInfo={ notes.pageInfo } setCurrentPage={ setCurrentPage }/>
                </>
            }
        </>
    );

}

export default NoteSentMain;