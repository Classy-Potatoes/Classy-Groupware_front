import {combineReducers} from "redux";
import scheduleReducer from "../../calendar/modules/CalendarModule";
import memberReducer from "../../member/modules/MemberModule";
import noteReducer from "../../note/modules/NoteModule";
import approvalReducer from "../../appreval/modules/ApprovalModule";
import projectReducer from "../../project/modules/ProjectModule";

const rootReducer = combineReducers({
    scheduleReducer,
    memberReducer,
    noteReducer,
    approvalReducer,
    projectReducer
});

export default rootReducer;