import {combineReducers} from "redux";
import scheduleReducer from "../../calendar/modules/CalendarModule";
import memberReducer from "../../member/modules/MemberModule";
import noteReducer from "../../note/modules/NoteModule";
import approvalReducer from "../../approval/modules/ApprovalModule";
import projectReducer from "../../project/modules/ProjectModule";
import secondProjectReducer from "../../project/modules/SecondProjectModule";
import adminReducer from "../../member/modules/AdminModule";
import projectPostReducer from "../../project/modules/ProjectPostModule";
import projectTaskReducer from "../../project/modules/ProjectTaskModule";
import thirdProjectReducer from "../../project/modules/MyTodoListModule";

const rootReducer = combineReducers({
    scheduleReducer,
    memberReducer,
    noteReducer,
    adminReducer,
    approvalReducer,
    projectReducer,
    projectPostReducer,
    projectTaskReducer,
    secondProjectReducer,
    thirdProjectReducer
});

export default rootReducer;