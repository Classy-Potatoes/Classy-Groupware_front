import {useEffect, useState} from "react";

function MyHistoryList( { data } ) {


    useEffect(() => {

    }, [ ]);


    return (
        <>
            <div className='myHistory-div'>
                {
                    data &&
                    <div className="history-div">
                        <table className="history-table">
                            <colgroup>
                                <col width="10%" />
                                <col width="20%" />
                                <col width="20%" />
                                <col width="15%" />
                                <col width="15%" />
                                <col width="20%" />
                            </colgroup>
                            <thead>
                            <tr>
                                <th>　</th>
                                <th>일자</th>
                                <th>변경항목</th>
                                <th>부서</th>
                                <th>직급</th>
                                <th>비고</th>
                            </tr>
                            </thead>
                            <tbody>
                            { data.history.map( historys => (
                                <tr key={ historys.historyCode }>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        <div className='history-table-img-div'>
                                            <img src='/member/pinImg.png' className="history-table-img" />
                                        </div>
                                    </td>
                                    <td>{ new Date(historys.historyDate).toLocaleDateString() }</td>
                                    <td>{ historys.historyCategory }</td>
                                    <td>{ historys.dept.deptName }</td>
                                    <td>{ historys.job.jobName }</td>
                                    <td>{ historys.historyNote }</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </>
    );

}

export default MyHistoryList;