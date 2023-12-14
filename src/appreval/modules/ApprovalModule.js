import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const GET_WRITER_INFO = 'approval/GET_WRITER_INFO';
const POST_LETTER_SUCCESS = 'approval/POST_LETTER_SUCCESS';
const POST_VACATION_SUCCESS = 'approval/POST_VACATION_SUCCESS';
const POST_EXPENSE_SUCCESS = 'approval/POST_EXPENSE_SUCCESS';
const GET_REPORT_WAITING = 'approval/GET_REPORT_WAITING';
const GET_REPORT_PAYING = 'approval/GET_REPORT_PAYING';
const GET_REPORT_APPROVE = 'approval/GET_REPORT_APPROVE';
const GET_REPORT_TURNBACK = 'approval/GET_REPORT_TURNBACK';
const GET_REPORT_RECALL = 'approval/GET_REPORT_RECALL';
const PUT_APPROVALSTATUS_UPDATE_SUCCESS = 'approval/PUT_APPROVALSTATUS_UPDATE_SUCCESS'
const GET_REPORT_WAITING_SEARCH = 'approval/GET_REPORT_WAITING_SEARCH'
const GET_REPORT_PAYING_SEARCH = 'approval/GET_REPORT_PAYING_SEARCH'
const GET_REPORT_APPROVE_SEARCH = 'approval/GET_REPORT_APPROVE_SEARCH'
const GET_REPORT_TURNBACK_SEARCH = 'approval/GET_REPORT_TURNBACK_SEARCH'
const GET_REPORT_RECALL_SEARCH = 'approval/GET_REPORT_RECALL_SEARCH'
const GET_REPORT_DETAIL = 'approval/GET_REPORT_DETAIL'

/* 액션 함수 */
export const {approval: { getWriterInfo,postLetterSuccess,postVacationSuccess,postExpenseSuccess,getReportWaiting
    ,getReportPaying,getReportApprove,getReportTurnback,getReportRecall,putApprovalstatusUpdateSuccess,getReportWaitingSearch,
    getReportPayingSearch,getReportApproveSearch,getReportTurnbackSearch,getReportRecallSearch,getReportDetail
}} = createActions({
    [GET_WRITER_INFO] : result => ({writer : result.data}),
    [POST_LETTER_SUCCESS] : () => ({letterSuccess : true}),
    [POST_VACATION_SUCCESS] : () => ({vacationSuccess : true}),
    [POST_EXPENSE_SUCCESS] : () => ({expenseSuccess : true}),
    [GET_REPORT_WAITING] : result => ({reportWaiting : result.data}),
    [GET_REPORT_PAYING] : result => ({reportPaying : result.data}),
    [GET_REPORT_APPROVE] : result => ({reportApprove : result.data}),
    [GET_REPORT_TURNBACK] : result => ({reportTurnback : result.data}),
    [GET_REPORT_RECALL] : result => ({reportRecall : result.data}),
    [PUT_APPROVALSTATUS_UPDATE_SUCCESS] : () => ({reportUpdateSuccess : true}),
    [GET_REPORT_WAITING_SEARCH] : result => ({searchData : result.data}),
    [GET_REPORT_PAYING_SEARCH] : result => ({searchData : result.data}),
    [GET_REPORT_APPROVE_SEARCH] : result => ({searchData : result.data}),
    [GET_REPORT_TURNBACK_SEARCH] : result => ({searchData : result.data}),
    [GET_REPORT_RECALL_SEARCH] : result => ({searchData : result.data}),
    [GET_REPORT_DETAIL] : result => ({reportDetail : result.data}),
});

/* 리듀서 함수 */
const approvalReducer = handleActions({
    [GET_WRITER_INFO] : (state, {payload}) => payload,
    [POST_LETTER_SUCCESS] : (state, {payload}) => payload,
    [POST_VACATION_SUCCESS] : (state, {payload}) => payload,
    [POST_EXPENSE_SUCCESS] : (state, {payload}) => payload,
    [GET_REPORT_WAITING] : (state, {payload}) => payload,
    [GET_REPORT_PAYING] : (state, {payload}) => payload,
    [GET_REPORT_APPROVE] : (state, {payload}) => payload,
    [GET_REPORT_TURNBACK] : (state, {payload}) => payload,
    [GET_REPORT_RECALL] : (state, {payload}) => payload,
    [PUT_APPROVALSTATUS_UPDATE_SUCCESS] : (state, {payload}) => payload,
    [GET_REPORT_WAITING_SEARCH] : (state, {payload}) => payload,
    [GET_REPORT_WAITING_SEARCH] :  (state, {payload}) => payload,
    [GET_REPORT_PAYING_SEARCH] :  (state, {payload}) => payload,
    [GET_REPORT_APPROVE_SEARCH] :  (state, {payload}) => payload,
    [GET_REPORT_TURNBACK_SEARCH] :  (state, {payload}) => payload,
    [GET_REPORT_RECALL_SEARCH] :  (state, {payload}) => payload,
    [GET_REPORT_DETAIL] : (state, {payload}) => payload,


}, initialState); //리듀서 함수는 초기값을 가지고 진행하는 상태가 좋다

export default approvalReducer;