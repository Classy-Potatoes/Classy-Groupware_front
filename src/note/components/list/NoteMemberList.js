import NoteMemberListItem from "../items/NoteMemberListItem";

function NoteMemberList({ data, onRecipientSelect }) {

    return(
        <>
            <div>
                {data &&
                    data.map((member, index) => (
                        <NoteMemberListItem key={member.memberCode || index} member={member}
                                            onRecipientSelect={ onRecipientSelect }
                        />
                    ))
                }
            </div>
        </>
    );

}

export default NoteMemberList;