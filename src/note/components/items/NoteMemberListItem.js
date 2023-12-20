import {useDispatch} from "react-redux";
import {setRecipientMember} from "../../modules/NoteModule";

function NoteMemberListItem({ member, onRecipientSelect }) {

    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(setRecipientMember(member));
        onRecipientSelect(member);
    };

    return (
        <>
            <div className="note-member-info" onClick={onClickHandler}>
                <div className="note-member-dept">{member.deptName}</div>
                <div className="note-member-job">{member.jobName}</div>
                <div className="note-member-name">{member.infoName}</div>
            </div>
        </>
    );

}

export default NoteMemberListItem;