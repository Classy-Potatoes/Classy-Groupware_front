import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import NoteMemberList from "../components/list/NoteMemberList";
import {callNoteListMembersAPI} from "../apis/NoteAPICalls";

function MemberListModal({ setMemberList }) {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useState('');
    const [selectedMember, setSelectedMember] = useState(null);
    const [selectedRecipient, setSelectedRecipient] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const {getNoteListMembers} = useSelector(state => state.noteReducer);
    const infoName = searchParams.value;

    useEffect(() => {
        dispatch(callNoteListMembersAPI({ currentPage }));
    }, [dispatch, currentPage]);

    return (
        <>
            <div className="note-recipient-container">
                <div className="note-recipient-search">
                    <input
                        type="text"
                        value={selectedRecipient ? selectedRecipient.value : ''}
                        onChange={ (e) => {
                            const value = e.target.value;
                            setSelectedRecipient({ value });
                        }}
                        placeholder="이름으로 검색"
                    />
                </div>

                <div className="member-list">
                    <div>
                        { getNoteListMembers &&
                            <NoteMemberList data={getNoteListMembers.data}/>
                        }
                    </div>
                </div>

                <div className="recipient-btn">
                    <button
                        onClick={ () => setMemberList(false) }
                    >
                        취소
                    </button>
                </div>
            </div>
        </>
    );

}

export default MemberListModal;
