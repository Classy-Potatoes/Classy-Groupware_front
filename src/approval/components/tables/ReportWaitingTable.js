import * as React from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import AttachmentIcon from '@mui/icons-material/Attachment';

export function ReportWaitingTable({reportWaiting}) {





    return (
        <>
            <div>
                <Button variant="outlined" startIcon={<DeleteIcon/>} sx={{width: '120px', marginBottom: '10px'}}>
                    회수
                </Button>
                <table className="Report-table">
                    <thead>
                    <tr>
                        <th><input type="checkbox"/></th>
                        <th>문서 번호</th>
                        <th>문서 종류</th>
                        <th>기안일</th>
                        <th>기안자</th>
                        <th>제목</th>
                        <th>첨부</th>
                        <th>결재상태</th>
                    </tr>
                    </thead>
                        <tbody>

                    {reportWaiting.map(report => (
                        <tr
                            key={report.approvalCode}
                        >
                            <td className="report-table-td"><input type="checkbox" value={report.approvalCode}/></td>
                            <td className="report-table-td">{report.approvalCode}</td>
                            <td className="report-table-td">{report.documentType}</td>
                            <td className="report-table-td">{report.approvalRegistDate}</td>
                            <td className="report-table-td">{report.infoName}</td>
                            <td className="report-table-td">{report.documentTitle}</td>
                            <td className="report-table-td">{report.attachment ? (
                                <AttachmentIcon/>
                            ) : (
                                ""
                            )}
                            </td>
                            <td className="report-table-td">{report.approvalStatusType}</td>

                        </tr>

                        ))
                }

                        </tbody>
                        </table>

            </div>
        </>

    );
}