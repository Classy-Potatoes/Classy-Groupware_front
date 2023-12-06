function NoteListItem({ note : { noteCode, noteSender, noteReceiver, noteSentDate, noteBody } }) {

    /* 컴포넌트 하나당 목록을 보여주는 쪽지 하나를 표현하기 위해 선언 - 쪽지 정보 */
    return (
        <div className="note-div">
            <h5>{ noteSender }</h5>
            <h5>{ noteSentDate }</h5>
            <h5>{ noteBody }</h5>
        </div>
    );

}

export default NoteListItem;