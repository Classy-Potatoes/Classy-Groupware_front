import '../../../../style/approval/Letter.css'
import * as React from 'react';
import {useEffect} from 'react';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import {callReportDetailAPI} from "../../../apis/ReportAPICalls";
import {useNavigate, useParams} from "react-router-dom";
import SignUpCheckModal from "../../mui/SignUpCheckModal";
import {ToastContainer} from "react-toastify";


function LetterDetail() {

    const dispatch = useDispatch();
    const {approvalCode} = useParams();


    const {reportDetail} = useSelector(state => state.approvalReducer);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(callReportDetailAPI({approvalCode}));
    }, []);





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

            <div className="ReportTitle" >
                품의서 상세
            </div>

            <div className="letterContainer">
                <ToastContainer
                    position="top-center"
                    autoClose={500}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                    theme="dark"
                />

                <div className="letter-left">
                    <p
                        className="letterTitle"
                        name="documentType"
                        value="품의서"
                    >
                        품의서
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


                    <div className="loginUserProfile">

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
                    <div className="letter-mainTitle">
                        <p>제목</p>
                        <span className="documentTitle-Reportdetail-page">{reportDetail && reportDetail.documentTitle}</span>
                    </div>
                    <div className="letter-notice">
                        <p>품의 사유 및 상세내용</p>
                    </div>
                    <div className="letterBody-detail-page">
                        {reportDetail && reportDetail.letterBody}
                    </div>

                    <div className="letter-guide"> 위와 같은 품의 사유로, 검토 후 결재 바랍니다. </div>

                    <div className="letterRegistDate-detail-page">작성 일자 : {reportDetail && formatDate(reportDetail.approvalRegistDate)}</div>





                </div>

                <div className="approvalLineDiv">
                    <p>결재선</p>
                </div>

                {reportDetail && reportDetail.approvalLine && (
                <div className="approvalLine">
                    {reportDetail && reportDetail.approvalLine.map((selectedMember, index) =>(
                        <div key={index} className="approvalLine-selectMember-div">
                            {selectedMember && selectedMember.infoName}<br/>
                            {selectedMember && (
                                <>
                                    <span
                                        className={`${selectedMember.approvalLineWaitingStatus === '결재요청' ? 'blink' : ''}`}>
                                                 {selectedMember.approvalLineWaitingStatus}
                                    </span>
                                    {selectedMember.approvalLineDate !== null && (
                                        <div className="approvalSignTime">
                                            {formatDate(selectedMember.approvalLineDate)}
                                            <div>{selectedMember.approvalLineResult === 'TURNBACK' ? '반려' :
                                                selectedMember.approvalLineResult === 'APPROVE' ? '승인' : ''}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
                )}
            </div>
            <div className="approval-completeBtn">
                <Button variant="contained" endIcon={<SendIcon />} onClick={ () => navigate(-1)} >
                    이전 페이지
                </Button>
            </div>

            <div className="approval-signUp">
                {reportDetail &&
                    reportDetail.approvalLine &&
                    reportDetail.approvalLine.map((member, index) => {
                        if (member.memberCode === reportDetail.loginMember &&
                            member.approvalLineWaitingStatus === '결재요청') {
                            return (
                                <SignUpCheckModal key={index} approvalCode={approvalCode}/>
                            );
                        } else {
                            return null;
                        }
                    })}
            </div>
        </>
    );
}

export default LetterDetail;