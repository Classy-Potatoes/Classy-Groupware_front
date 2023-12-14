import {useNavigate, useParams} from "react-router-dom";
import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import {useState} from "react";
import { DatePicker } from 'react-rainbow-components';
import {useDispatch} from "react-redux";

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


function NoteListItem({ note, title , options, currentPage, setCurrentPage, showSender, showReceiver }) {

    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState({ value: '' });
    const [selectedOption, setSelectedOption] = useState('전체');
    const [searchResults, setSearchResults] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const dispatch = useDispatch();
    const { noteCode } = useParams();

    /* 쪽지 상세 페이지 이동*/
    const onClickNoteHandler = (note) => {
        navigate(`/note/received/${ note.noteCode }`);
    };

    const onChangeHandler = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSearch = (e) => {

        console.log(e.target.value);

        setSearchValue({
            ...searchValue,
            [e.target.name]: e.target.value
        })

    };

    // const handleSearch = async () => {
    //     try {
    //         let results = [];
    //
    //         if (selectedOption === '전체') {
    //             // '전체' 옵션 선택 시 보낸 사람과 내용에 대한 검색 수행
    //             const senderResults = note.filter((item) => item.noteSender.includes(searchValue.value));
    //             const bodyResults = note.filter((item) => item.noteBody.includes(searchValue.value));
    //
    //             // 중복 제거 후 결과 저장
    //             results = [...new Set([...senderResults, ...bodyResults])];
    //         } else if (selectedOption === '보낸 사람') {
    //             // '보낸 사람' 옵션 선택 시 보낸 사람에 대한 검색 수행
    //             results = note.filter((item) => item.noteSender.includes(searchValue.value));
    //         } else if (selectedOption === '내용') {
    //             // '내용' 옵션 선택 시 내용에 대한 검색 수행
    //             results = note.filter((item) => item.noteBody.includes(searchValue.value));
    //         }
    //
    //         setSearchResults(results);
    //
    //         if (results.length === 0) {
    //             toast.error("일치하는 검색 결과가 없습니다.");
    //         }
    //     } catch (error) {
    //         console.error("Error fetching search results", error);
    //     }
    // };
    //
    // React.useEffect(() => {
    //     // 여기서 API 호출 또는 검색 결과 업데이트 로직을 작성
    //     // 예를 들어, callSearchAPI 함수를 사용하여 서버에서 검색 결과를 받아오는 것으로 가정
    //     const callSearchAPI = async () => {
    //         try {
    //             const apiUrl = `/cg-api/v1/note/received/search?searchCondition=${ selectedOption }&searchValue=${ searchValue }`;
    //             console.log('API URL:', apiUrl);
    //
    //             const response = await fetch(apiUrl);
    //             const data = await response.json();
    //             console.log('API Response:', data);
    //
    //             setSearchResults(data);
    //
    //             if (data.length === 0) {
    //                 toast.error("일치하는 검색 결과가 없습니다.");
    //             }
    //         } catch (error) {
    //             console.error("Error fetching search results", error);
    //         }
    //     };
    //
    //     // 검색어 또는 옵션 값이 변경될 때마다 API 호출
    //     callSearchAPI();
    // }, [selectedOption, searchValue]);

    /* 컴포넌트 하나당 목록을 보여주는 쪽지 하나를 표현하기 위해 선언 - 쪽지 정보 */
    return (
        <>
            <div className="note-div">
                <div className="note-title" style={{ fontSize: "30px", marginTop: "55px", marginLeft: "40px" }}>
                    { title }
                </div>
            </div>

            { note &&
                <div className="note-body">
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

                    <div className="note-search">
                        <select
                            name="note-search-options"
                            value={ selectedOption }
                            onChange= { onChangeHandler }
                        >
                            { options.map((option) => (
                                <option key={ option.value } value={ option.value }>
                                    { option.label }
                                </option>
                            )) }
                        </select>

                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input
                                type="text"
                                name="value"
                                value={ searchValue.value }
                                onChange={ (e) => setValue(e.target.value) }
                            />
                            <button
                                onClick={ handleSearch }
                                className="note-search-button"
                            >
                                검색
                            </button>
                        </div>
                    </div>

                    {/* 쪽지 body 카테고리 */}
                    <div className="note-title-body" style={{ paddingBottom: '20px' }}>
                        { showSender &&
                            <div className="title"
                                 style={{ border: '1px solid #8A2BE2', borderRadius: '50px' }}
                        >
                            보낸 사람
                        </div> }
                        { showReceiver && <div className="title">받는 사람</div> }
                        <div className="title"><p>내용</p></div>
                        <div className="title">날짜</div>
                    </div>

                    { note.map((note) => (
                        <div className="note-item" key={ note.noteCode }>
                            <div className="noteMember"
                                 style={{ width:'700px', marginLeft: '300px' }}>
                                { title === "보낸 쪽지함" ? note.noteReceiver
                                    : title === "받은 쪽지함" ? note.noteSender :
                                        title === "중요 쪽지함" ? note.noteSender : "" }
                            </div>
                            <div className="noteBody"
                                 onClick={ () => onClickNoteHandler(note) }
                                 style={{ whiteSpace: 'nowrap', width:'50px' }}>
                                { truncateTextByByte(note.noteBody, 90) }
                            </div>
                            <div className="noteDate"
                                 style={{ width:'600px', marginLeft: '463px' }}>
                                { note.noteSentDate }</div>
                        </div>
                    ))}
                </div>
            }
        </>

    );

}

export default NoteListItem;