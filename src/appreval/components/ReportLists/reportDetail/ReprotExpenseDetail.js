import '../../../../style/approval/Expense.css'
import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import {callReportDetailAPI} from "../../../apis/ReportAPICalls";
import {useNavigate, useParams} from "react-router-dom";


function ExpenseDetail() {
    /* 총 금액 state */
    const {reportDetail} = useSelector(state => state.approvalReducer);
    const navigate = useNavigate();
    const {approvalCode} = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callReportDetailAPI({approvalCode}));
    }, []);





    // 숫자에 콤마를 추가하는 함수
    const addCommas = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const TotalAmount = (expenseDetails) => {
        if (!expenseDetails || !Array.isArray(expenseDetails)) {
            return 0;
        }

        // reduce를 사용하여 expensePrice 값을 합산합니다
        return expenseDetails.reduce((total, details) => total + details.expensePrice, 0);
    };

    function formatDate(dateString) {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        const formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(new Date(dateString));
        return formattedDate;
    }


    return (
        <>

            <div className="ReportTitle">
                지출결의서 상세
            </div>

            <div className="expenseContainer">

                <div className="expense-left">
                    <p
                        className="expenseTitle"
                        name="documentType"
                        value="지출결의서"
                    >
                        지출결의서
                    </p>

                    <div className="referenceMember-Div">
                        <div className="referenceMemberTitle-Button">
                            <p>수신 참조자</p>
                        </div>
                        <div className="referenceMember">
                            {reportDetail && reportDetail.referenceLine.map((selectedMember, index) =>(
                                <div key={index} className="referenceLine-pickMemberInfo-div" >
                                    {selectedMember && selectedMember.infoName}
                                </div>
                            ))}
                        </div>

                    </div>


                    <div className="expense-loginUserProfile">

                        <p className="approval-profile">성함</p>
                        <p className="approval-profile-detail">{reportDetail && reportDetail.infoName}</p>
                        <p className="approval-profile">부서</p>
                        <p className="approval-profile-detail">{reportDetail && reportDetail.deptName}</p>
                        <p className="approval-profile">직급</p>
                        <p className="approval-profile-detail">{reportDetail && reportDetail.jobName}</p>
                        <div className="letter-file-Reportdatail-page">
                            {reportDetail && reportDetail.attachments.map((attachment, index) => (
                                <span key={index}>{attachment.fileName}</span>
                            ))}
                        </div>
                    </div>

                    <div className="expense-maintitle-status">
                        <div className="expenseDetail-mainTitle">
                            <p>제목</p>
                            <span className="documentTitle-Reportdetail-page">{reportDetail && reportDetail.documentTitle}</span>
                        </div>
                        <div className="expenseDetailStatus-div">
                            <div className="expenseDetailStatus-title">
                                <>결제 구분</>
                            </div>
                            <div className="expenseDetail-radio">
                               <span>{reportDetail && reportDetail.expenseStatus}</span>
                            </div>
                        </div>

                    </div>


                    <div className="expenseDetailTable-div">
                        {reportDetail && reportDetail.expenseDetails ? (
                            reportDetail.expenseDetails.length > 0 ? (
                                <table className="expenseDetailTable">
                                    <thead className="expenseDetailTable-head">
                                    <tr>
                                        <th className="expenseDetail-th">계정과목</th>
                                        <th className="expenseDetail-th">지출일자</th>
                                        <th className="expenseDetail-th">금액</th>
                                        <th className="expenseDetail-th">적요</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {reportDetail.expenseDetails.map((details, index) => (
                                        <tr key={index}>
                                            <td className="expenseDetail-td">{details.expenseAccount}</td>
                                            <td className="expenseDetail-td">{details.expenseDate}</td>
                                            <td className="expenseDetail-td">{addCommas(details.expensePrice)}</td>
                                            <td className="expenseDetail-td">{details.expenseBriefs}</td>
                                        </tr>

                                    ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>지출 내역이 없습니다</p>
                            )
                        ) : null}

                    </div>
                        <div className="expenseDetail-totalAmount">
                            총 금액 : {addCommas(TotalAmount(reportDetail?.expenseDetails))} 원
                        </div>





                    <div className="expense-note-detail-page">
                        <p className="expenseDetail-note-p">* 비고</p>
                        <p className="expense-note-detail-page-p">{reportDetail && reportDetail.expenseNote}</p>
                    </div>

                    <div className="expenseDetail-guide"> 위 금액을 청구하오니 결재 바랍니다.</div>

                    <div className="expenseRegistDate-detail-page">작성 일자 : {reportDetail && formatDate(reportDetail.approvalRegistDate)}</div>


                </div>

                <div className="approvalLineDiv">
                    <p>결재선</p>
                </div>
                <div className="approvalLine">
                    {reportDetail && reportDetail.approvalLine.map((selectedMember, index) =>(
                        <div key={index} className="approvalLine-selectMember-div">
                            {selectedMember && selectedMember.infoName}<br/>
                            {selectedMember && (
                                <>
                                    {selectedMember.approvalLineReuslt === '승인' && (
                                        <img src="/approval/승인%20이미지.png" alt="승인" className="approveImg"/>
                                    )}
                                    {selectedMember.approvalLineReuslt === '반려' && (
                                        <img src="/approval/반려%20이미지.png" alt="반려" className="turnbackImg"/>
                                    )}
                                    <span className={`${selectedMember.approvalLineWaitingStatus === '결재요청' ? 'blink' : ''}`}>
                                                 {selectedMember.approvalLineWaitingStatus}
                                    </span>
                                    {selectedMember.approvalLineDate}
                                </>
                            )}
                        </div>
                    ))}
                </div>

            </div>
            <div className="approval-completeBtn">
                <Button variant="contained" endIcon={<SendIcon/>} onClick={ () => navigate(-1)}>
                    이전 페이지
                </Button>
            </div>


        </>
    );
}

export default ExpenseDetail;