import {useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import NoteMemberList from "../components/list/NoteMemberList";
import {callNoteListMembersAPI} from "../apis/NoteAPICalls";
import PagingBar from "../../common/components/pagingBar/PagingBar";

function MemberListModal({ setMemberList }) {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useState('');
    const [selectedMember, setSelectedMember] = useState(null);
    const [selectedRecipient, setSelectedRecipient] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const {getNoteListMembers} = useSelector(state => state.noteReducer);
    const infoName = searchParams.value;
    const modalRef = useRef();

    useEffect(() => {
        dispatch(callNoteListMembersAPI({ currentPage }));
    }, [dispatch, currentPage]);

    const handleRecipientSelect = (recipient) => {
        setSelectedRecipient(recipient);
        setMemberList(false);
    };

    const handleCloseModal = (e) => {
        // 클릭 이벤트가 모달 외부에서 발생하면 모달을 닫습니다.
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setMemberList(false);
        }
    };

    useEffect(() => {
        // 전체 문서에 대해 이벤트 리스너를 등록합니다.
        document.addEventListener("mousedown", handleCloseModal);
        // 컴포넌트가 언마운트되면 이벤트 리스너를 제거합니다.
        return () => {
            document.removeEventListener("mousedown", handleCloseModal);
        };
    }, []);


    return (
        <>
            <div ref={ modalRef } className="note-recipient-container">
                {/*<div className="note-recipient-search">*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        value={selectedRecipient ? selectedRecipient.value : ''}*/}
                {/*        onChange={ (e) => {*/}
                {/*            const value = e.target.value;*/}
                {/*            setSelectedRecipient({ value });*/}
                {/*        }}*/}
                {/*        placeholder="이름으로 검색"*/}
                {/*    />*/}
                {/*</div>*/}

                <div className="member-list">
                    <div className="member-list-title" style={{ display: 'flex' }}>
                        <div className="member-list-dept">부서</div>
                        <div className="member-list-job">직급</div>
                        <div className="member-list-name">이름</div>
                    </div>
                    <div>
                        { getNoteListMembers &&
                            <NoteMemberList data={ getNoteListMembers.data }
                                            onRecipientSelect={ handleRecipientSelect }/>
                        }
                    </div>
                    { getNoteListMembers && getNoteListMembers.pageInfo && (
                        <div className="note-list-member-pagingbar">
                            <PagingBar
                                pageInfo={getNoteListMembers.pageInfo}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    )}
                </div>

                <div className="recipient-list">
                    <button className="recipient-list-button"
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
