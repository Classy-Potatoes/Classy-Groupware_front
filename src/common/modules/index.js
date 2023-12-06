import {combineReducers} from "redux";
import scheduleReducer from "../../calendar/modules/CalendarModule";
import memberReducer from "../../member/modules/MemberModule";
import projectReducer from "../../project/modules/ProjectModule";

const rootReducer = combineReducers({
    scheduleReducer,
    memberReducer,
    projectReducer
});

export default rootReducer;