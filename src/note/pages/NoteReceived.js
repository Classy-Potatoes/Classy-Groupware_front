import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {callNoteReceivedAPI} from "../apis/NoteAPICalls";
import NoteItem from "../components/items/NoteItem";
import {useParams} from "react-router-dom";

function NoteReceived() {

    const dispatch = useDispatch(); //store에 값을 저장할 때 dispatch 이용
    const { noteCode } = useParams();
    const { note } = useSelector(state => state.noteReducer);

    useEffect(() => {
        /* 쪽지에 대한 정보 요청 */
        dispatch(callNoteReceivedAPI({ noteCode }));
    }, []);

    return (
        <>
        { note
            &&
            <NoteItem note={ note } titleName="보낸 사람" titleTime="받은 시간"/>
        }
        </>
    );

}

export default NoteReceived;