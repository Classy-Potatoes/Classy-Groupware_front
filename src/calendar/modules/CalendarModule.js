import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const GET_ALL_SCHEDULE = 'calendar/GET_ALL_SCHEDULE';
const GET_PROJECT_SCHEDULE = 'calendar/GET_PROJECT_SCHEDULE';
const GET_PERSONAL_SCHEDULE = 'calendar/GET_PERSONAL_SCHEDULE';

/* 액션 함수 */
export const { calendar : {getAllSchedule, getProjectSchedule, getPersonalSchedule} } = createActions({
    [GET_ALL_SCHEDULE] : (result) => ({ allSchedule : result.data }),
    [GET_PROJECT_SCHEDULE] : (result) => ({ projectSchedule : result.data }),
    [GET_PERSONAL_SCHEDULE] : (result) => ({ personalSchedule : result.data })
});

/* 리듀서 */
const scheduleReducer = handleActions({
    [GET_ALL_SCHEDULE] : (state, { payload }) => payload,
    [GET_PROJECT_SCHEDULE] : (state, { payload }) => payload,
    [GET_PERSONAL_SCHEDULE] : (state, { payload }) => payload
}, initialState);

export default scheduleReducer;