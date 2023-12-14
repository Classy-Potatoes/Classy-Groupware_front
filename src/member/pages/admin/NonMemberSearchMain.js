import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ToastContainer} from "react-toastify";
import NonMemberTop from "../../components/common/NonMemberTop";
import {useSearchParams} from "react-router-dom";
import MemberPagingBar from "../../components/common/MemberPagingBar";
import {callNonMembersSearchAPI} from "../../apis/AdminAPICalls";
import NonMemberList from "../../components/lists/NonMemberList";

function NonMemberSearchMain() {

    const dispatch = useDispatch();
    const [ searchParams ] = useSearchParams();
    const infoName = searchParams.get('value');
    const [ currentPage, setCurrentPage ] = useState( 1 );
    const { getNonMembers } = useSelector( state => state.adminReducer );


    useEffect(() => {

        dispatch( callNonMembersSearchAPI( { infoName, currentPage } ) );

    }, [ infoName, currentPage ]);


    return (
        <div className="profile-background-div">
            <ToastContainer hideProgressBar={ true } position="top-center"/>
            <NonMemberTop />
            {
                getNonMembers &&
                <>
                    <NonMemberList data={ getNonMembers.data } />
                    <MemberPagingBar pageInfo={ getNonMembers.pageInfo } setCurrentPage={ setCurrentPage }/>
                </>
            }
        </div>
    );

}

export default NonMemberSearchMain;