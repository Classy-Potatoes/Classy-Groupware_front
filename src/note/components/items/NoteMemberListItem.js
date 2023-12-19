import {useDispatch} from "react-redux";
import {setRecipientMember} from "../../modules/NoteModule";

function NoteMemberListItem({ member }) {

    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(setRecipientMember(member));
    };

    return (
        <>
            <div className="note-member-info" onClick={onClickHandler}>
                <div>{member.deptName}</div>
                <div>{member.jobName}</div>
                <div>{member.infoName}</div>
            </div>
        </>
    );

}

export default NoteMemberListItem;