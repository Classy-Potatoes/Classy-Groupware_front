import React, { useState } from "react";

function ProjectInviteItem({ myDeptMember}) {
    const [selectedMembers, setSelectedMembers] = useState([]);

    const handleMemberSelect = (infoCode) => {
        if (selectedMembers.includes(infoCode)) {
            setSelectedMembers(selectedMembers.filter((id) => id !== infoCode));
        } else {
            setSelectedMembers([...selectedMembers, infoCode]);
        }
    };

    return (
        <>
            <div className="inviteDeptList-div">
                <div className="invite-name">
                    {myDeptMember
                        &&
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