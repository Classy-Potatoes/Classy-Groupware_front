import {useDispatch, useSelector} from "react-redux";
import {callInfoDeleteAPI} from "../../apis/AdminAPICalls";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function NonMemberList( { data } ) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { infoDeleteResult } = useSelector(state => state.adminReducer );

    useEffect(() => {

        if( infoDeleteResult === true ) {
            navigate( 0 );
        }

    }, [ infoDeleteResult ]);

    const onClickDeleteNonMember = ( infoCode ) => {

        dispatch( callInfoDeleteAPI( infoCode ) );
    };


    return (
        <>
        {
            data &&
            <div className="member-div">
                <table className="member-table">
                    <colgroup>
                        <col width="5%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="15%" />
                        <col width="15%" />
                        <col width="15%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                    <tr>
                        <th>　</th>
                        <th>성명</th>
                        <th>사원 번호</th>
                        <th>직급</th>
                        <th>부서</th>
                        <th>휴대폰</th>
                        <th>이메일</th>
                        <th>회원 등록 상태</th>
                        <th>옵션</th>
                    </tr>
                    </thead>
                    <tbody>
                    { data.map( nonMembers => (
                        <tr key={ nonMembers.infoCode }>
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <div className='member-table-img-div'>
                                    <img src='/member/signupImg.png' className="member-table-img" />
                                </div>
                            </td>
                            <td>{ nonMembers.infoName }</td>
                            <td>{ nonMembers.infoCode }</td>
                            <td>{ nonMembers.jobName }</td>
                            <td>{ nonMembers.deptName }</td>
                            <td>{ nonMembers.infoPhone }</td>
                            <td>{ nonMembers.infoEmail }</td>
                            <td>{ nonMembers.infoStatus === "NONREGIST" ? "미등록" : "등록" }</td>
                            <td>
                                <img src='/member/trash.png'
                                     className='member-delete-btn'
                                     onClick={ () => onClickDeleteNonMember( nonMembers.infoCode ) }
                                />
                            </td>
                        </tr>
                    ))
                    }
                    </tbody>
                </table>
            </div>
        }
        </>
    );

}

export default NonMemberList;