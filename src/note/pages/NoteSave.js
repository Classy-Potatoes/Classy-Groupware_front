import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {callNoteSendAPI} from "../apis/NoteAPICalls";
import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import MemberListModal from "./MemberListModal";
import {ToastContainer} from "react-toastify";

function NoteSave() {

    const navigate = useNavigate();
    const [form, setForm] = useState('');
    const [memberList, setMemberList] = useState(false);
    const dispatch = useDispatch();

    const { recipientSelect, postSuccess } = useSelector(state => state.noteReducer);

    useEffect(() => {
        if (postSuccess === true) {
            navigate(`/note/sent`, { replace : true });
        }
    }, [postSuccess]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onClickNoteSendHandler = async () => {
        const noteReceiver = recipientMember.memberCode;
        console.log(noteReceiver);
        console.log(form);
        // dispatch(callNoteSendAPI({ sendRequest : { ...form, noteReceiver : recipientMember.memberCode }}));

        try {
            const response = await dispatch(callNoteSendAPI({ sendRequest: { ...form, noteReceiver: recipientMember.memberCode }}));
            console.log('API 호출', response);

            // 상태 초기화
            setForm('');
            setMemberList(false);

        } catch (error) {
            console.error('API 호출 실패:', error);
        }

};


    const { recipientMember } = useSelector(state => state.noteReducer);

    return (
        <>
            <div className="note-save-container">
                <div className="note-write-container">
                    <div className="note-write-title">
                        <img src="/note/fi-rs-paper-plane.png" style={{ marginRight: "20px" }}/>
                        <h1
                            style={{ fontSize: '30px' }}
                        >
                            쪽지 작성
                        </h1>
                    </div>
                </div>

                <div className="note-recipient">
                    <button
                        onClick={ () => setMemberList(true) }
                        className="note-recipient-btn"
                    >
                        <p style={{ fontSize: '20px' }}>받는 사람</p>
                        <img src="/note/users.png" style={{ marginLeft: "10px" }}/>
                   </button>
                    { memberList &&
                        <MemberListModal
                            recipient={recipientSelect}
                            // setMemberListModal={setMemberListModal}
                            setMemberList={ setMemberList }
                        />
                    }

                    <div className="note-body-write">
                        <div className="note-save-title">
                            { recipientMember &&
                                recipientMember.infoName }
                        </div>
                        <div className="note-body-box">
                            <textarea
                                className="note-save-body"
                                style={{ writingMode: "horizontal-tb", textAlign: "start", paddingTop: "25px", paddingLeft: "30px" }}
                                onChange={ onChangeHandler }
                                name="noteBody"
                            />
                        </div>

                        <ToastContainer hideProgressBar={ true } position="top-center"/>

                        <div className="note-button-div">
                            <button
                                onClick={ onClickNoteSendHandler }
                                className="note-sent-btn"
                            >
                                보내기
                            </button>
                            <button
                                onClick={ () => navigate(-1) }
                                className="note-sent-back"
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default NoteSave;