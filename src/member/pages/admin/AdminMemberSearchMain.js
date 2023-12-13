import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ToastContainer} from "react-toastify";
import AdminMemberTop from "../../components/common/AdminMemberTop";
import {callAdminMembersAPI, callAdminMembersSearchAPI} from "../../apis/AdminAPICalls";
import MemberPagingBar from "../../components/common/MemberPagingBar";
import AdminMemberList from "../../components/lists/AdminMemberList";
import {useSearchParams} from "react-router-dom";

function AdminMemberMain() {

    const dispatch = useDispatch();
    const [ searchParams ] = useSearchParams();
    const infoName = searchParams.get('value');
    const [ currentPage, setCurrentPage ] = useState( 1 );
    const { getAdminMembers } = useSelector( state => state.adminReducer );


    useEffect(() => {

        dispatch( callAdminMembersSearchAPI( { infoName, currentPage } ) );

    }, [ infoName, currentPage ]);


    return (
        <div className="profile-background-div">
            <ToastContainer hideProgressBar={ true } position="top-center"/>
            <AdminMemberTop />
            {
                getAdminMembers &&
                <>
                    <AdminMemberList data={ getAdminMembers.data } />
                    <MemberPagingBar pageInfo={ getAdminMembers.pageInfo } setCurrentPage={ setCurrentPage }/>
                </>
            }
        </div>
    );

}

export default AdminMemberMain;