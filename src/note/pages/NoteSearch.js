import {useEffect, useState} from "react";
import {callNoteSearchListAPI} from "../apis/NoteAPICalls";
import PagingBar from "../../common/components/pagingBar/PagingBar";
import NoteList from "../components/list/NoteList";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";

function NoteSearch() {

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const searchCondition = searchParams.get('condition');
    const searchValue = searchParams.get('value');
    const { notes } = useSelector(state => state.noteReducer);
    const [currentPage, setCurrentPage] = useState(1);

    // useEffect(() => {
    //     dispatch(callNoteSearchListAPI({ searchCondition, searchValue, currentPage }));
    // }, [searchCondition, searchValue, currentPage]);

    return (
        <>
            { notes
                &&
                <>
                    <NoteList data={ notes.data }/>
                    <PagingBar pageInfo={ notes.pageInfo } setCurrentPage={ setCurrentPage }/>
                </>
            }
        </>
    );

}

export default NoteSearch;