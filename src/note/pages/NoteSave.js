import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {callNoteSendAPI} from "../apis/NoteAPICalls";
import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import MemberListModal from "./MemberListModal";

function NoteSave() {

    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const [memberList, setMemberList] = useState(false);
    const dispatch = useDispatch();

    const [selectedMember, setSelectedMember] =useState(null);

    const { recipientSelect } = useSelector(state => state.noteReducer);
    const { sendSuccess } = useSelector(state => state.noteReducer);

    useEffect(() => {
        if (sendSuccess === true) {
            navigate(`/note/sent`, { replace : true });
        }
    }, [sendSuccess]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // const handleClickMember = (selectedMember) => {
    //     if (selectedMember) {
    //         setSelectedMember(selectedMember);
    //         dispatch(selectRecipient(selectedMember));
    //         // memberListClose();
    //     }
    // };


    const onClickNoteSendHandler = () => {
        const formData = new FormData();
        formData.append("noteSave", new Blob([JSON.stringify({ ...form, recipient: selectedMember })], { type: 'application/json' }));

        dispatch(callNoteSendAPI({ saveRequest: formData }));
    }

    const memberListOpen = () => {
        setMemberList(true);
        console.log(memberList);
    }

    // const memberListClose = () => setMemberList(false);

    return (
        <>
            <div className="note-write-container">
                <div className="note-write-title">
                    <img src="/note/fi-rs-paper-plane.png"/>
                    <h1
                        style={{ fontSize: '30px' }}
                    >
                        쪽지 작성
                    </h1>
                </div>
            </div>

            <div className="note-recipient">
                <button
                    onClick={ memberListOpen }
                >
                    받는 사람
                    <img src="/note/users.png"/>
               </button>
                {
                    memberList &&
                    <MemberListModal
                        recipient={recipientSelect} // Fix: 'memberList' -> 'recipient'
                        // onClickMember={handleClickMember}
                        // onClose={memberListClose}
                    />
                }
                {/*<div>*/}
                {/*    { recipientSelect && recipientSelect.referenceLine.map((selectMember, index) =>(*/}
                {/*        <div key={index} className="referenceLine-pickMemberInfo-div" >*/}
                {/*            {selectMember && selectMember.infoName}*/}

                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}

                <div className="note-body-write">
                    <input
                        type="text"
                        onChange={ onChangeHandler }
                    />
                </div>


                {/*<Modal*/}
                {/*    memberList={ memberList }*/}
                {/*    onClose={ memberListClose }*/}
                {/*    aria-labelledby="modal-modal-title"*/}
                {/*    aria-describedby="modal-modal-description"*/}
                {/*>*/}
                {/*    <Box sx={style}>*/}
                {/*        <div className="approvalLine-searchInput-memberList-div">*/}
                {/*            <input*/}
                {/*                className="approvalLine-searchInput"*/}
                {/*                type="text"*/}
                {/*                placeholder="이름으로 검색"*/}
                {/*                value={ searchMember }*/}
                {/*                onChange={ handleSearchChange }*/}
                {/*            />*/}

                {/*            <div className="approvalLine-memberList">*/}
                {/*                {filteredMembers.map((member) => (*/}
                {/*                        <AllMember*/}
                {/*                            key={member.memberCode}*/}
                {/*                            member={member}*/}
                {/*                            onSelect={() => handleSelectMember(member.memberCode)}*/}
                {/*                            isSelected={selectedMembers.includes(member.memberCode)}*/}
                {/*                        />*/}
                {/*                    )*/}
                {/*                )}*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*        <span className="referenceLine-pickMember-guide">* 참조자는 10명까지 선택 가능 합니다.</span>*/}

                {/*        <div className="referenceLine-pickMember">*/}
                {/*            <div className="approvalLine-selectMember">*/}
                {/*                {pickMembers().map((selectedMember, index) => (*/}
                {/*                    <div className="referenceLine-pickNum">*/}
                {/*                        <div className="approvalLineNum-num">{index + 1}.</div>*/}
                {/*                        <div className="approvalLineNum-deptName">{selectedMember.deptName}</div>*/}
                {/*                        <div className="approvalLineNum-jobName">{selectedMember.jobName}</div>*/}
                {/*                        <div className="approvalLineNum-infoName">{selectedMember.infoName}</div>*/}
                {/*                        <div className="approvalLineNum-deleteBtn"><IconButton  aria-label="delete"  onClick={() => handleRemoveMember(index)}><DeleteIcon /></IconButton></div>*/}

                {/*                    </div>*/}
                {/*                ))}*/}

                {/*            </div>*/}

                {/*        </div>*/}
                {/*        <div className="modal-cancel-sand-btn">*/}
                {/*            <Button variant="contained" onClick={onClickCancelHandler} sx={{marginRight: '20px'}}>취소</Button>*/}
                {/*            <Button variant="contained" onClick={onClickRegisterHandler} className="Modal-sendBtn" endIcon={<SendIcon />}>등록</Button>*/}
                {/*        </div>*/}
                {/*    </Box>*/}
                {/*</Modal>*/}
            </div>

            <div className="note-button-div">
                <button
                    // onClick={ onClickNoteSendHandler }
                >
                    보내기
                </button>
                <button
                    onClick={ () => navigate(-1) } //navigate에 url을 줄 수도 있지만 숫자를 줄 수도 있다.(history 관리되고 있고 숫자로 표현)
                >
                    취소
                </button>
            </div>
        </>
    );

}

export default NoteSave;