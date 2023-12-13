import {combineReducers} from "redux";
import scheduleReducer from "../../calendar/modules/CalendarModule";
import memberReducer from "../../member/modules/MemberModule";
import approvalReducer from "../../appreval/modules/ApprovalModule";
import projectReducer from "../../project/modules/ProjectModule";
import adminReducer from "../../member/modules/AdminModule";

const rootReducer = combineReducers({
    scheduleReducer,
    memberReducer,
    adminReducer,
    approvalReducer,
    projectReducer
});

export default rootReducer;