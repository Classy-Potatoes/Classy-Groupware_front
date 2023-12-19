import * as React from "react";
import {useEffect, useState} from "react";
import '../../../style/approval/ApprovalLayOut.css'
import '../../../style/approval/Reprot.css'
import ReportDatePiker from "../mui/ReprotDatePiker";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import {useDispatch, useSelector} from "react-redux";
import {callApprovalStatusUpdateAPI, callReportWaitingAPI} from "../../apis/ReportAPICalls";
import ApprovalPagingBar from "../common/ApprovalPagingBar";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachmentIcon from "@mui/icons-material/Attachment";
import {ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";


function ReportWaiting() {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectAll, setSelectAll] = useState(false);
    const {reportWaiting} = useSelector(state => state.approvalReducer);
    const [documentTitleSearch, setDocumentTitleSearch] = useState('');
    const navigate = useNavigate();
    const [startDateValue, setStartDateValue] = useState(null);
    const [endDateValue, setEndDateValue] = useState(null);



    useEffect(() => {
        dispatch(callReportWaitingAPI({currentPage}));
    }, [currentPage]);


    const handleSelectAll = () => {
        const allCheckboxes = document.querySelectorAll(".report-table-td-ck");
        const isChecked = !selectAll;

        allCheckboxes.forEach((checkbox) => {
            checkbox.checked = isChecked;
        });

        setSelectAll(isChecked);
    };

    /* 회수처리를 위해 서버로 보내서 업데이트 */
    const handleRecall = () => {
        const selectedApprovals = Array.from(document.querySelectorAll(".report-table-td-ck:checked"))
            .map((checkbox) => checkbox.value);

        const confirmed = window.confirm("회수하시겠습니까?");
        if (confirmed) {
            // 회수 로직 실행
            window.location.reload();
        } else {
            return;
        }

        if (selectedApprovals.length > 0) {
            const recallRequest = {
                approvalCode: selectedApprovals,
            };

            dispatch(callApprovalStatusUpdateAPI({approvalCode: recallRequest}))

            console.log(recallRequest)
        }
    };

    /* 검색 */
    const onSearchChangeHandler = (e) => {
        setDocumentTitleSearch(e.target.value);
    }
    function formatSearchDate(dateString) {
        const parsedDate = new Date(dateString);
        if (isNaN(parsedDate.getTime())) {
            // 유효하지 않은 날짜
            console.error('Invalid date format:', dateString);
            return '';
        }
        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
        const day = String(parsedDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const onClickSearchHandler = e => {
        const formattedStartDate = startDateValue ? formatSearchDate(startDateValue) : '';
        const formattedEndDate = endDateValue ? formatSearchDate(endDateValue) : '';
        navigate(`/approval/report/search-waiting?documentTitle=${documentTitleSearch}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&page=${currentPage}`);
    }

    const handleDateChange = ({ startDate, endDate }) => {
        setStartDateValue(startDate);
        setEndDateValue(endDate);
    };


    /*date 포맷*/
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

    const onClickDetailPageHandler = (documentType, approvalCode) => {
        switch (documentType){
            case "품의서" :
                return navigate(`/approval/report/letter/${approvalCode}`);
            case "지출결의서" :
                return  navigate(`/approval/report/expense/${approvalCode}`);
            case "휴가신청서" :
                return  navigate(`/approval/report/vacation/${approvalCode}`);

        }
    };


    return (
        <>
            <div className="ReportTitle">
                상신함 - 결재대기
            </div>


            <div className="reportContainer">
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
                <div className="report-search-div">
                    <ReportDatePiker onDateChange={handleDateChange}/>
                    <input type="text"
                           placeholder="제목으로 검색"
                           className="report-searchInput"
                           onChange={onSearchChangeHandler}
                           onKeyDown={(e) => {
                               if (e.key === 'Enter') {
                                   onClickSearchHandler();
                               }
                           }}/>
                    <Button variant="contained" endIcon={<SendIcon/>} sx={{width: "100px", height: "40px"}} onClick={onClickSearchHandler}>
                        검색
                    </Button>
                </div>

                {reportWaiting &&
                    <div className="reportTable">
                        <Button variant="outlined" startIcon={<DeleteIcon/>}
                                sx={{width: '120px', marginBottom: '10px'}}
                                onClick={handleRecall}
                        >
                            회수
                        </Button>
                        <table className="Report-table">
                            <thead>
                            <tr>
                                <th className="report-table-th"><input type="checkbox"
                                                                       className="report-table-th-ck"
                                                                       checked={selectAll}
                                                                       onChange={handleSelectAll}
                                />
                                </th>
                                <th className="report-table-th">문서 번호</th>
                                <th className="report-table-th">제목</th>
                                <th className="report-table-th">문서 종류</th>
                                <th className="report-table-th">기안일</th>
                                <th className="report-table-th">기안자</th>
                                <th className="report-table-th">첨부파일</th>
                                <th className="report-table-th">결재상태</th>
                            </tr>
                            </thead>
                            <tbody className="report-table-tbody">

                            {reportWaiting.data.map(report => (
                                <tr
                                    key={report.approvalCode}
                                    onClick={() => onClickDetailPageHandler(report.documentType, report.approvalCode)}
                                >
                                    <td className="report-table-td"><input type="checkbox"
                                                                           value={report.approvalCode}
                                                                           className="report-table-td-ck"
                                                                           onClick={(e) => {
                                                                               e.stopPropagation(); }}
                                    />
                                    </td>
                                    <td className="report-table-td">{report.approvalCode}</td>
                                    <td className="report-table-td">{report.documentTitle}</td>
                                    <td className="report-table-td">{report.documentType}</td>
                                    <td className="report-table-td">{formatDate(report.approvalRegistDate)}</td>
                                    <td className="report-table-td">{report.infoName}</td>
                                    <td className="report-table-td">
                                        {report.attachment && report.attachment.length > 0 ? (
                                            <AttachmentIcon sx={{width: '25px', height: '25px'}}/>
                                        ) : null}
                                    </td>
                                    <td className="report-table-td td-approvalStatusType">{report.approvalStatusType}</td>

                                </tr>

                            ))
                            }


                            </tbody>
                        </table>
                        <ApprovalPagingBar pageInfo={reportWaiting.pageInfo} setCurrentPage={setCurrentPage}/>
                    </div>

                }
            </div>

        </>
    );

}


export default ReportWaiting;