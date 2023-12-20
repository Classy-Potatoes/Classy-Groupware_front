import {useNavigate, useParams} from "react-router-dom";
import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callNoteReceivedSearchAPI} from "../../apis/NoteAPICalls";

function getByteLength(str) {
    // Blob을 이용하여 문자열의 byte 길이 계산
    const blob = new Blob([str]);
    return blob.size;
}

function truncateTextByByte(text, maxByteLength) {
    let truncatedText = '';
    let currentByteLength = 0;

    for (const char of text) {
        const charByteLength = getByteLength(char);

        if (currentByteLength + charByteLength <= maxByteLength) {
            truncatedText += char;
            currentByteLength += charByteLength;
        } else {
            break;
        }
    }

    return truncatedText;

}

function NoteListItem({ note, noteType , /*options,*/ currentPage, setCurrentPage, showSender, showReceiver }) {

    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState({ value: '' });
    // const [selectedOption, setSelectedOption] = useState(options[0].value);
    const { noteCode } = useParams();
    const [importantModal, setImportantModal] = useState(false);
    const dispatch = useDispatch();
    const {getSearchSuccess} = useSelector(state => state.noteReducer);


    /* 쪽지 상세 페이지 이동*/
    const onClickNoteHandler = (note) => {
        navigate(`/note/${noteType}/${ note.noteCode }`, {state : {noteType}});
    };

    const [searchResult, setSearchResult] = useState([]);
    const [searchContent, setSearchContent] = useState('');

    const handleSearch = () => {
        // 입력된 검색어가 없으면 전체 쪽지를 보여줌
        if (!searchContent.trim()) {
            setSearchResult(note);
        } else {
            // 입력된 검색어와 noteBody가 일치하는 쪽지 필터링
            const filteredNotes = note.filter((noteItem) =>
                noteItem.noteBody.includes(searchContent)
            );
            setSearchResult(filteredNotes);
        }
    };

    const onKeyDownHandler = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        // 컴포넌트가 처음 마운트될 때 전체 쪽지를 보여줌
        setSearchResult(note);
    }, [note]);

    //
    // useEffect(() => {
    //     console.log('getSearchSuccess changed:', getSearchSuccess);
    // }, [getSearchSuccess]);



    // const onChangeHandler = (e) => {
    //     setSelectedOption(e.target.value);
    // };

    // const clickedSearch = async  () => {
    //     if (selectedOption === 'all') {
    //        const result = await dispatch(callNoteReceivedSearchAPI({
    //             searchCondition : selectedOption, searchValue : searchContent
    //        }));
    //
    //        if (result && result.status === 200) {
    //            setSearchResult(result.data);
    //        }
    //
    //     }
    //
    // }

    /* 중요 쪽지함 이동 */
    const onClickImportant = () => {
        setImportantModal(true);
    };


    /* 컴포넌트 하나당 목록을 보여주는 쪽지 하나를 표현하기 위해 선언 - 쪽지 정보 */
    return (
        <>
            <div className="note-div">
                <div className="note-title" style={{ fontSize: "30px", marginTop: "55px", marginLeft: "40px" }}>
                    { noteType === 'received' ? "받은 쪽지함" :
                        noteType === 'sent' ? "보낸 쪽지함" :
                            noteType === 'important' ? "중요 쪽지함" : ""
                    }
                </div>
            </div>

            { note &&
                <div className="note-body">
                    <div className="note-search">
                        {/*<select*/}
                        {/*    name="note-search-options"*/}
                        {/*    onChange= { onChangeHandler }*/}
                        {/*>*/}
                        {/*    { options.map((option) => (*/}
                        {/*        <option key={ option.value } value={ option.value }>*/}
                        {/*            { option.label }*/}
                        {/*        </option>*/}
                        {/*    )) }*/}
                        {/*</select>*/}
                        <input
                            type="text"
                            placeholder="쪽지 내용으로 검색하기"
                            value={ searchContent }
                            onChange={ (e) => setSearchContent(e.target.value) }
                            onKeyDown={ onKeyDownHandler }
                        />
                        {/*<button className="note-search-btn" onClick={clickedSearch}><p>검색하기</p></button>*/}
                    </div>

                    {/* 쪽지 body 카테고리 */}
                    <div className="note-title-body">
                        { showSender && <div className="title">보낸 사람</div> }
                        { showReceiver && <div className="title">받는 사람</div> }
                        <div className="title">내용</div>
                        <div className="title">날짜</div>
                    </div>

                    { searchResult.length > 0 && (
                        <div>
                            {/* 검색 결과를 표시하는 UI 구현 */}
                            { searchResult.map((result) => (
                                <div key={result.noteCode}>
                                    { /* 검색 결과에 해당하는 쪽지 정보를 표시하는 UI */ }
                                    <div className="note-item">
                                        <div className="noteMember" style={{ width: '700px', marginLeft: '122px' }}>
                                            { noteType === "received" ? result.noteSender
                                                : noteType === "sent" ? result.noteReceiver :
                                                    noteType === "important" ? result.noteSender : "" }
                                        </div>
                                        <div className="noteBody" onClick={() => onClickNoteHandler(result)} style={{ whiteSpace: 'nowrap', width: '50px' }}>
                                            { truncateTextByByte(result.noteBody, 96) }
                                        </div>
                                        <div className="noteDate" style={{ width: '600px', marginLeft: '630px' }}>
                                            {result.noteSentDate}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}


                    {/*{getSearchSuccess &&*/}
                    {/*    getSearchSuccess.data.map((note) => (*/}
                    {/*        <div className="note-item" key={ note.noteCode }>*/}
                    {/*            <div className="noteMember"*/}
                    {/*                 style={{ width:'700px', marginLeft: '122px' }}>*/}
                    {/*                { noteType === "received" ? note.noteSender*/}
                    {/*                    : noteType === "sent" ? note.noteReceiver :*/}
                    {/*                        noteType === "important" ? note.noteSender : "" }*/}
                    {/*            </div>*/}
                    {/*            <div className="noteBody"*/}
                    {/*                 onClick={ () => onClickNoteHandler(note) }*/}
                    {/*                 style={{ whiteSpace: 'nowrap', width:'50px' }}>*/}
                    {/*                { truncateTextByByte(note.noteBody, 96) }*/}
                    {/*            </div>*/}
                    {/*            <div className="noteDate"*/}
                    {/*                 style={{ width:'600px', marginLeft: '630px' }}>*/}
                    {/*                { note.noteSentDate }*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    ))}*/}

                </div>
            }
        </>

    );

}

export default NoteListItem;