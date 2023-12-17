import {useEffect} from "react";
import {callDeleteHistoryAPI} from "../../apis/AdminAPICalls";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function AdminMyHistoryList( { data } ) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { historyDeleteResult } = useSelector(state => state.adminReducer );

    useEffect(() => {

        if( historyDeleteResult === true ) {
            navigate( 0 );
        }

    }, [ historyDeleteResult ]);

    const onClickDeleteHistory = ( historyCode ) => {

        dispatch( callDeleteHistoryAPI( historyCode ) );
    };

    return (
        <>
            <div className='myHistory-div'>
                {
                    data &&
                    <div className="history-div">
                        <table className="history-table">
                            <colgroup>
                                <col width="5%" />
                                <col width="20%" />
                                <col width="20%" />
                                <col width="15%" />
                                <col width="15%" />
                                <col width="15%" />
                                <col width="10%" />
                            </colgroup>
                            <thead>
                            <tr>
                                <th>　</th>
                                <th>일자</th>
                                <th>변경항목</th>
                                <th>부서</th>
                                <th>직급</th>
                                <th>비고</th>
                                <th>옵션</th>
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
                                    <td>
                                        <img src='/member/trash.png'
                                             className='member-delete-btn'
                                             onClick={ () => onClickDeleteHistory( historys.historyCode ) }
                                        />
                                    </td>
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

export default AdminMyHistoryList;