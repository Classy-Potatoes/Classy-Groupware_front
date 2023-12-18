import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {callNoteSendAPI} from "../apis/NoteAPICalls";
import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import MemberListModal from "./MemberListModal";
import {toast} from "react-toastify";

function NoteSave() {

    const navigate = useNavigate();
    const [form, setForm] = useState('');
    const [memberList, setMemberList] = useState(false);
    const dispatch = useDispatch();

    const { recipientSelect } = useSelector(state => state.noteReducer);
    const { postSuccess } = useSelector(state => state.noteReducer);

    useEffect(() => {
        if (postSuccess === true) {
            navigate(`/note/send`, { replace : true });
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
        // dispatch(ccallNoteSendAPI({ sendRequest : { ...form, noteReceiver : recipientMember.memberCode }}));

        try {
            // API 호출 및 성공 여부에 따라 토스트 메시지 표시
            const response = await dispatch(callNoteSendAPI({ sendRequest: { ...form, noteReceiver: recipientMember.memberCode }}));
            console.log('API 호출', response);
            toast.success('쪽지가 성공적으로 전송되었습니다.');

            // 상태 초기화
            setForm('');
            setMemberList(false);
        } catch (error) {
            console.error('API 호출 실패:', error);
        }

};


    const {recipientMember} = useSelector(state => state.noteReducer);

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
                            {recipientMember &&
                                recipientMember.infoName}
                        </div>
                        <div className="note-save-bodyy">
                            <textarea
                                className="note-save-body"
                                style={{ writingMode: "horizontal-tb", textAlign: "start", paddingTop: "25px", paddingLeft: "30px" }}
                                onChange={ onChangeHandler }
                                name="noteBody"
                            />
                        </div>

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