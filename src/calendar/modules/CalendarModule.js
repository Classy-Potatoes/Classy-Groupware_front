import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const GET_ALL_SCHEDULE = 'calendar/GET_ALL_SCHEDULE';
const GET_PROJECT_SCHEDULE = 'calendar/GET_PROJECT_SCHEDULE';
const GET_PERSONAL_SCHEDULE = 'calendar/GET_PERSONAL_SCHEDULE';
const GET_SCHEDULE_DETAIL = 'calendar/GET_SCHEDULE_DETAIL';
const POST_SUCCESS = 'calendar/POST_SUCCESS';

/* 액션 함수 */
export const { calendar : {getAllSchedule, getProjectSchedule, getPersonalSchedule, getScheduleDetail, postSuccess} } = createActions({
    [GET_ALL_SCHEDULE] : (result) => ({ allSchedule : result.data }),
    [GET_PROJECT_SCHEDULE] : (result) => ({ allSchedule : result.data }),
    [GET_PERSONAL_SCHEDULE] : (result) => ({ allSchedule : result.data }),
    [GET_SCHEDULE_DETAIL] : (result) => ({ schedule : result.data }),
    [POST_SUCCESS] : () => ({ postSuccess : true }),
    // [POST_SUCCESS] : () => ({ postSuccess : true })
});

/* 리듀서 */
const scheduleReducer = handleActions({
    [GET_ALL_SCHEDULE] : (state, { payload }) => payload,
    [GET_PROJECT_SCHEDULE] : (state, { payload }) => payload,
    [GET_PERSONAL_SCHEDULE] : (state, { payload }) => payload,
    [GET_SCHEDULE_DETAIL] : (state, { payload }) => ({ ...state, payload}),
    [POST_SUCCESS] : (state, { payload }) => payload
}, initialState);

export default scheduleReducer;