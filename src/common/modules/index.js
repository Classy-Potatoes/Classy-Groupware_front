import {combineReducers} from "redux";
import scheduleReducer from "../../calendar/modules/CalendarModule";
import memberReducer from "../../member/modules/MemberModule";
import approvalReducer from "../../appreval/modules/ApprovalModule";
import projectReducer from "../../project/modules/ProjectModule";
import secondProjectReducer from "../../project/modules/SecondProjectModule";
import adminReducer from "../../member/modules/AdminModule";
import projectPostReducer from "../../project/modules/ProjectPostMedule";

const rootReducer = combineReducers({
    scheduleReducer,
    memberReducer,
    adminReducer,
    approvalReducer,
    projectReducer,
    projectPostReducer,
    secondProjectReducer
});

export default rootReducer;