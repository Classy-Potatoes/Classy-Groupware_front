
function ProjectInvitedItem({projectMember}) {

    return (
        <>
            <div className="inviteList-div">
                <div className="total-invite">전체 참여자({projectMember.length}명)</div>
                <div className="invite-name">
                    {projectMember.map((member, index) => (
                        <div key={index}>
                            <img src="/project/invite.png" alt={`Invite ${member.memberName}`} />
                            <span>{member.memberName}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ProjectInvitedItem;