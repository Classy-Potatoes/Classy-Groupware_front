import NoteMemberListItem from "../items/NoteMemberListItem";

function NoteMemberList({ data }) {

    return(
        <>
            <div>
                {data &&
                    data.map((member, index) => (
                        <NoteMemberListItem key={member.memberCode || index} member={member} />
                    ))
                }
            </div>
        </>
    );

}

export default NoteMemberList;