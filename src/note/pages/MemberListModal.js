import { useState } from "react";
import Modal from "react-modal";
import * as React from "react";

function MemberListModal({ recipient, onClose }) {

    console.log(recipient);

    return (
        <>
            recipient
            &&
        </>
    );
    // const [memberList, setMemberList] = useState(false);
    // const [selectedMember, setSelectedMember] = useState(null);
    // const [memberSearch, setMemberSearch] = useState("");
    //
    // if (!recipient) {
    //     return null;
    // }
    //
    // const handleMemberClick = (member) => {
    //     setSelectedMember(member);
    // };
    //
    // const handleAddClick = () => {
    //     if (selectedMember) {
    //         onClickMember(selectedMember);
    //         modalListClose();
    //     }
    // };
    //
    // const memberListOpen = () => setMemberList(true);
    //
    // const modalListClose = () => {
    //     setMemberList(false);
    //     onClose();
    // };
    //
    // // const allMembers = () => {
    // //     return recipient.memberList.filter((member) => {
    // //         // 이름으로 검색 필터링
    // //         return member.infoName.includes(memberSearch.value);
    // //     });
    // // };
    //
    // const onClickCancel = () => {
    //     modalListClose();
    // };
    //
    // return (
    //     <>
    //         <div className="recipient-list-container">
    //             <Modal
    //                 isOpen={memberList}
    //                 onRequestClose={modalListClose}
    //                 aria-labelledby="modal-modal-title"
    //                 aria-describedby="modal-modal-descrfiption"
    //             >
    //
    //                     <div className="recipient-list">
    //                         <input
    //                             type="text"
    //                             placeholder="이름으로 검색"
    //                             value={memberSearch}
    //                             onChange={(e) => setMemberSearch(e.target.value)}
    //                         />
    //
    //                         <div className="member-list">
    //                             {recipient.memberList.map((member) => (
    //                                 <div
    //                                     key={member.memberCode}
    //                                     onClick={() => handleMemberClick(member)}
    //                                     className={`member-item ${
    //                                         selectedMember === member ? "selected" : ""
    //                                     }`}
    //                                 >
    //                                     <div className="member-info">
    //                                         <div className="dept-name">{member.deptName}</div>
    //                                         <div className="job-name">{member.jobName}</div>
    //                                         <div className="info-name">{member.infoName}</div>
    //                                     </div>
    //                                 </div>
    //                             ))}
    //                         </div>
    //                     </div>
    //
    //                     <div className="member-add-btn">
    //                         <button onClick={onClickCancel}>취소</button>
    //                         <button onClick={handleAddClick}>추가</button>
    //                     </div>
    //             </Modal>
    //         </div>
    //     </>
    // );
}

export default MemberListModal;
