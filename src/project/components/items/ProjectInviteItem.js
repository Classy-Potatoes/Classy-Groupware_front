import React, { useEffect, useState } from "react";

function ProjectInviteItem({ myDeptMember, onMemberSelect }) {
    const [selectedMembers, setSelectedMembers] = useState([]);

    const handleMemberSelect = (infoCode) => {
        if (selectedMembers.includes(infoCode)) {
            setSelectedMembers(selectedMembers.filter((id) => id !== infoCode));
        } else {
            setSelectedMembers([...selectedMembers, infoCode]);
        }
    };

    useEffect(() => {
        // 선택된 멤버가 변경될 때 부모 컴포넌트로 콜백
        onMemberSelect(selectedMembers);
    }, [selectedMembers, onMemberSelect]);

    return (
        <>
            <div className="inviteDeptList-div">
                <div className="invite-name">
                    {myDeptMember &&
                        myDeptMember.map((member, index) => (
                            <div key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={member.infoCode}
                                        checked={selectedMembers.includes(member.infoCode)}
                                        onChange={() => handleMemberSelect(member.infoCode)}
                                        className="invite-checkbox"
                                    />
                                    <img
                                        src="/project/invite.png"
                                        alt={`Invite ${member.infoName}`}
                                    />
                                    <span>{member.infoName}</span>
                                </label>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}

export default ProjectInviteItem;