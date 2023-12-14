import {useNavigate} from "react-router-dom";
import * as React from "react";

function NoteItem({ note, titleName, titleTime }) {

    const navigate = useNavigate();

    const onClickBack = () => {}

    const onClickSent =() => {}

    return (
        <>
            <div className="note-detail-div">
                <div className="note-detail-title" style={{ fontSize: "30px", marginTop: "55px", marginLeft: "40px" }}>
                    <img src="/note/fi-rs-comment.png" style={{ marginRight: "20px" }}/>
                    쪽지 읽기
                </div>
            </div>

            <div className="note-body-container">
                <div className="note-detail">{ titleName }</div>
                <div className="note-detail">{ titleTime }</div>
                {/*<div className="note-body">{ note.note }</div>*/}
                <div className="note-detail">{ note.noteBody }</div>


                <div class="note-button">
                    <button
                        onClick={ onClickSent }
                        className="note-sent"
                    >
                        답장
                    </button>
                    <buttton
                        onClick={ onClickBack }
                        className="note-back"
                        >
                        취소
                    </buttton>
                </div>
            </div>
        </>
    );

}

export default NoteItem;