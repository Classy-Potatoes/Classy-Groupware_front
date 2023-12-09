import {useNavigate} from "react-router-dom";
import DatePicker from "react-datepicker";
import * as React from "react";
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const callNoteSearchAPI = async (searchCondition, option) => {
    try {
        const response = await fetch(`/api/note/search?searchCondition=${searchCondition}&option=${option}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching search results", error);
        throw error;
    }
};

function NoteListItem({ note, title , options, currentPage, setCurrentPage }) {

    const navigate = useNavigate();
    const [startDateValue, setStartDateValue] = React.useState(dayjs);
    const [endDateValue, setEndDateValue] = React.useState(dayjs);
    const [value, setValue] = React.useState('');
    const [searchValue, setSearchValue] = React.useState('');
    const [selectedOption, setSelectedOption] = React.useState('all'); // 기본값 '전체'
    const [searchResults, setSearchResults] = React.useState([]);

    const onClickNoteHandler = (note) => {
        navigate(`/note/received/${ note.noteCode }`)
    }

    const handleSearch = async () => {
        try {
            let results = [];

            if (selectedOption === 'all') {
                // '전체' 옵션 선택 시 보낸 사람과 내용에 대한 검색 수행
                const senderResults = note.filter((item) => item.noteSender.includes(value));
                const bodyResults = note.filter((item) => item.noteBody.includes(value));

                // 중복 제거 후 결과 저장
                results = [...new Set([...senderResults, ...bodyResults])];
            } else if (selectedOption === 'sender') {
                // '보낸 사람' 옵션 선택 시 보낸 사람에 대한 검색 수행
                results = note.filter((item) => item.noteSender.includes(value));
            } else if (selectedOption === 'content') {
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


    React.useEffect(() => {
        // 여기서 API 호출 또는 검색 결과 업데이트 로직을 작성
        // 예를 들어, callSearchAPI 함수를 사용하여 서버에서 검색 결과를 받아오는 것으로 가정
        const callSearchAPI = async () => {
            try {
                const apiUrl = `/cg-api/v1/note/received/search?searchCondition=${selectedOption}&searchValue=${searchValue}`;
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
                <div className="note-title" style={{ fontSize: "30px", marginTop: "40px" }}>
                    { title }
                </div>
            </div>

            { note &&
                <div className="note-div">
                    <div className="vacationStartDate-endDate">
                        <div className="vacationDateBody">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    value={startDateValue}
                                    defaultValue={dayjs}
                                    onChange={(newValue) => setStartDateValue(newValue)}
                                    format="YYYY-MM-DD"
                                    sx={{ width: "100px" }}
                                />
                                <DatePicker
                                    value={endDateValue}
                                    defaultValue={dayjs}
                                    onChange={(newValue) => setEndDateValue(newValue)}
                                    format="YYYY-MM-DD"
                                    sx={{ width: "100px" }}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>

                    <div className="note-search">
                        <select onChange={ (e) => setValue(e.target.value) }>
                            { options.map((option) => (
                                <option key={option.value} value={ option.value }>
                                    { option.label }
                                </option>
                            )) }
                        </select>



                        <>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                            <button onClick={handleSearch}>검색</button>
                        </>

                    </div>

                    <div className="note-title-body">
                        <div className="title">보낸 사람</div>
                        <div className="title">내용</div>
                        <div className="title">날짜</div>
                    </div>

                    { selectedOption === 'all' &&
                        note.map((note) => (
                            <div className="note-item" key={note.noteCode}>
                                <div className="content">{note.noteSender}</div>
                                <div className="content" onClick={() => onClickNoteHandler(note.noteCode)}>
                                    {note.noteBody}
                                </div>
                                <div className="content">{note.noteSentDate}</div>
                            </div>
                        ))}
                </div>
            }
        </>

    );

}

export default NoteListItem;