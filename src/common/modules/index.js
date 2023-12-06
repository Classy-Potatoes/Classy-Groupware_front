import {combineReducers} from "redux";
import scheduleReducer from "../../calendar/modules/CalendarModule";
import memberReducer from "../../member/modules/MemberModule";
import projectReducer from "../../project/modules/ProjectModule";
import noteReducer from "../../note/modules/NoteModule";

const rootReducer = combineReducers({
    scheduleReducer,
    memberReducer,
    projectReducer,
    noteReducer
});

export default rootReducer;