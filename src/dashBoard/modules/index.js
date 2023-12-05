import {combineReducers} from "redux";
import scheduleReducer from "../../calendar/modules/CalendarModule";
import memberReducer from "../../member/modules/MemberModule";

const rootReducer = combineReducers({
    scheduleReducer,
    memberReducer
});

export default rootReducer;