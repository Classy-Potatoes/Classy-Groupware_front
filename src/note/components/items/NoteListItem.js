import {useNavigate} from "react-router-dom";
import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import {useState} from "react";
import { DatePicker } from 'react-rainbow-components';
import {toast} from "react-toastify";

// const callNoteSearchAPI = async (searchCondition, option) => {
//     try {
//         const response = await fetch(`/api/note/search?searchCondition=${searchCondition}&option=${option}`);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Error fetching search results", error);
//         throw error;
//     }
// };

function NoteListItem({ note, title , options, currentPage, setCurrentPage, showSender, showReceiver, showBoth }) {

    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState({});
    const [searchCondition, setSearchCondition] = useState({});
    const [selectedOption, setSelectedOption] = useState('전체');
    const [searchResults, setSearchResults] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedNotes, setSelectedNotes] = useState([]);


    const onClickNoteHandler = (note) => {
        navigate(`/note/received/${ note.noteCode }`);
    };

    const onChangeHandler = (event) => {
        setValue(event.target.value);
    };

    // const handleSearch = (e) => {
    //
    //     setSearchValue({
    //         ...searchValue,
    //         [e.target.name]: e.target.value
    //     })
    //
    // };

    const initialState = { date: new Date() };

    const handleSearch = async () => {
        try {
            let results = [];

            if (options === '전체') {
                // '전체' 옵션 선택 시 보낸 사람과 내용에 대한 검색 수행
                const senderResults = note.filter((item) => item.noteSender.includes(value));
                const bodyResults = note.filter((item) => item.noteBody.includes(value));

                // 중복 제거 후 결과 저장
                results = [...new Set([...senderResults, ...bodyResults])];
            } else if (options === '보낸 사람') {
                // '보낸 사람' 옵션 선택 시 보낸 사람에 대한 검색 수행
                results = note.filter((item) => item.noteSender.includes(value));
            } else if (options === '내용') {
                // '내용' 옵션 선택 시 내용에 대한 검색 수행
                results = note.filter((item) => item.noteBody.includes(value));
            }

            setSearchResults(results);

            if (results.length === 0) {
                toast.error("일치하는 검색 결과가 없습니다.");
            }
        } catch (error) {
            console.error("Error fetching search results", error);
        }
    };

    const handleCheckboxChange = (noteCode) => {
        // 쪽지의 체크 상태를 토글합니다.
        setSelectedNotes((prevSelectedNotes) => {
            if (prevSelectedNotes.includes(noteCode)) {
                // 이미 선택된 경우 제거
                return prevSelectedNotes.filter((code) => code !== noteCode);
            } else {
                // 선택되지 않은 경우 추가
                return [...prevSelectedNotes, noteCode];
            }
        });
    };

    const onClickDeleteSelectedNotes = () => {
        // 선택된 쪽지를 삭제하는 로직을 작성
        // 여기서는 간단한 예시로 삭제 상태를 변경하는 것만 구현
        console.log('Delete selected notes:', selectedNotes);

        // TODO: 선택된 쪽지를 삭제하는 API 호출 또는 로직 추가
    };


    React.useEffect(() => {
        // 여기서 API 호출 또는 검색 결과 업데이트 로직을 작성
        // 예를 들어, callSearchAPI 함수를 사용하여 서버에서 검색 결과를 받아오는 것으로 가정
        const callSearchAPI = async () => {
            try {
                const apiUrl = `/cg-api/v1/note/received/search?searchCondition=${ selectedOption }&searchValue=${ searchValue }`;
                console.log('API URL:', apiUrl);

                const response = await fetch(apiUrl);
                const data = await response.json();
                console.log('API Response:', data);

                setSearchResults(data);

                if (data.length === 0) {
                    toast.error("일치하는 검색 결과가 없습니다.");
                }
            } catch (error) {
                console.error("Error fetching search results", error);
            }
        };

        // 검색어 또는 옵션 값이 변경될 때마다 API 호출
        callSearchAPI();
    }, [selectedOption, searchValue]);



    /* 컴포넌트 하나당 목록을 보여주는 쪽지 하나를 표현하기 위해 선언 - 쪽지 정보 */
    return (
        <>
            <div className="note-div">
                <div className="note-title" style={{ fontSize: "30px", marginTop: "55px", marginLeft: "40px" }}>
                    { title }
                </div>
            </div>

            { note &&
                <div className="note-search-div">
                    <div className="note-date-container" style={{ maxWidth: 360 }}>
                        <DatePicker
                            value={ startDate }
                            onChange={ (newValue) => {
                                setStartDate(newValue)
                            }}
                            selectsStart
                            startDate={ startDate }
                            endDate={ endDate }
                        />
                        <div style={{ margin: '0 10px' }}>~</div>
                        <DatePicker
                            value={ endDate }
                            onChange={ (newValue) => {
                                setEndDate(newValue)
                            }}
                            minDate={ startDate }
                            startDate={ startDate }
                            endDate={ endDate }
                        />
                    </div>


                        {/*<LocalizationProvider dateAdapter={AdapterDateFns}>*/}
                        {/*<DesktopDatePicker*/}
                        {/*    locale={ ko }*/}
                        {/*    dateFormat="yyyy-MM-dd"*/}
                        {/*    selected={ startDate }*/}
                        {/*    onChange={ (newValue) => {*/}
                        {/*        setStartDate(newValue)*/}
                        {/*    }}*/}
                        {/*    selectsStart*/}
                        {/*    startDate={ startDate }*/}
                        {/*    endDate={ endDate }*/}
                        {/*    showPopperArrow={ true }*/}
                        {/*    renderInput={(params) => <TextField {...params} />}*/}
                        {/*/>*/}
                        {/*<div style={{ margin: '0 10px' }}>~</div>*/}
                        {/*<DesktopDatePicker*/}
                        {/*locale={ ko }*/}
                        {/*dateFormat="yyyy-MM-dd"*/}
                        {/*selected={ endDate }*/}
                        {/*onChange={ (data: Date) => setEndDate(data) }*/}
                        {/*selectsEnd*/}
                        {/*minDate={ startDate }*/}
                        {/*startDate={ startDate }*/}
                        {/*endDate={ endDate }*/}
                        {/*showPopperArrow={ true }*/}
                        {/*/>*/}


                    <div className="note-search">
                        <select
                            name="note-search-options"
                            value={ searchCondition.name }
                            onChange={ onChangeHandler }
                            style={{ height: "40px", marginRight: "15px",
                                padding: "0px 30px 0px 15px", borderRadius: "192px" }}
                            >
                            <option value="전체">전체</option>
                            <option value="보낸 사람">보낸 사람</option>
                            <option value="내용">내용</option>
                        </select>

                        <>
                            <input
                                type="text"
                                name="value"
                                value={ searchValue.value }
                                onChange={ (e) => setValue(e.target.value) }
                                style={{ width: "500px", height: "40px", padding: "0px 30px 0px 20px",
                                    borderRadius: "192px", border: "2px solid #C0A3FF" }}
                            />
                            <button
                                onClick={ handleSearch }
                                style={{ width: "120px", height: "40px", borderRadius: "192px", marginLeft: "15px",
                                    backgroundColor: "white", border: "1.5px solid #ccc" }}
                            >
                                검색
                            </button>
                        </>

                        <button onClick={ onClickDeleteSelectedNotes }>삭제</button>

                    </div>

                    <div className="note-checkbox">
                        <input
                            onChange={() => {
                                // 모든 쪽지를 선택 또는 해제합니다.
                                if (selectedNotes.length === note.length) {
                                    // 이미 모두 선택된 경우 모두 해제
                                    setSelectedNotes([]);
                                } else {
                                    // 아닌 경우 모두 선택
                                    setSelectedNotes(note.map((item) => item.noteCode));
                                }
                            }}
                            checked={selectedNotes.length === note.length}
                        />
                    </div>

                    <div className="note-title-body">
                        { showSender && <div className="title">보낸 사람</div> }
                        { showReceiver && <div className="title">받는 사람</div> }
                        { showBoth && (
                            <>
                                <div className="title">보낸 사람</div>
                                <div className="title">받는 사람</div>
                            </>
                        )}
                        <div className="title">내용</div>
                        <div className="title">날짜</div>
                    </div>

                    { selectedOption === '전체' &&
                        note.map((note) => (
                            <div className="note-item" key={ note.noteCode }>
                                <div className="content">{ note.noteSender }</div>
                                <div className="content" onClick={ () => onClickNoteHandler(note) }>
                                    { note.noteBody }
                                </div>
                                <div className="content">{ note.noteSentDate }</div>
                            </div>
                        ))}

        {/*        <>*/}
        {/*    {*/}
        {/*        selected === '전체' ? () : ()*/}
        {/*    }*/}
        {/*</>*/}

                </div>
            }
        </>

    );

}

export default NoteListItem;