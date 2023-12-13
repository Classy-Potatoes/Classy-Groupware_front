// function testNonMemberList( { data } ) {
//
//     const onClickRowHandler = ( name ) => {
//         // alert(name);
//     };
//
//
//     return (
//         <>
//         {
//             data &&
//             <div className="member-div">
//                 <table className="member-table">
//                     <colgroup>
//                         <col width="5%" />
//                         <col width="10%" />
//                         <col width="10%" />
//                         <col width="10%" />
//                         <col width="10%" />
//                         <col width="15%" />
//                         <col width="20%" />
//                         <col width="20%" />
//                     </colgroup>
//                     <thead>
//                     <tr>
//                         <th>　</th>
//                         <th>성명</th>
//                         <th>사원 번호</th>
//                         <th>직급</th>
//                         <th>부서</th>
//                         <th>휴대폰</th>
//                         <th>이메일</th>
//                         <th>회원 등록 상태</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     { data.map( nonMembers => (
//                         <tr key={ nonMembers.infoCode }>
//                             <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
//                                 <div className='member-table-img-div'>
//                                     <img src={ nonMembers.filePath } className="member-table-img" />
//                                 </div>
//                             </td>
//                             <td>{ nonMembers.infoName }</td>
//                             <td>{ nonMembers.infoCode }</td>
//                             <td>{ nonMembers.jobName }</td>
//                             <td>{ nonMembers.deptName }</td>
//                             <td>{ nonMembers.infoPhone }</td>
//                             <td>{ nonMembers.infoEmail }</td>
//                             <td>{ nonMembers.memberStatus === "NONACTIVE" ? "비활동" : "반납(탈퇴)" }</td>
//                         </tr>
//                     ))
//                     }
//                     </tbody>
//                 </table>
//             </div>
//         }
//         </>
//     );
//
// }
//
// export default testNonMemberList;