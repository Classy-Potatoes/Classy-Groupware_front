import {combineReducers} from "redux";
import scheduleReducer from "../../calendar/modules/CalendarModule";

const rootReducer = combineReducers({
    scheduleReducer
});

export default rootReducer;