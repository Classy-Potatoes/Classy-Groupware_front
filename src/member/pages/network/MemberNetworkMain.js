import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ToastContainer} from "react-toastify";
import MemberPagingBar from "../../components/common/MemberPagingBar";
import NetworkMemberTop from "../../components/common/NetworkMemberTop";
import NetworkMemberList from "../../components/lists/NetworkMemberList";
import {callNetworkMembersAPI} from "../../apis/MemberAPICalls";

function MemberNetworkMain() {

    const dispatch = useDispatch();
    const [ currentPage, setCurrentPage ] = useState( 1 );
    const { getNetworkMembers } = useSelector( state => state.memberReducer );


    useEffect(() => {

        dispatch( callNetworkMembersAPI( { currentPage } ) );

    }, [ currentPage ]);


    return (
        <div className="profile-background-div">
            <ToastContainer hideProgressBar={ true } position="top-center"/>
            <NetworkMemberTop />
            {
                getNetworkMembers &&
                <>
                    <NetworkMemberList data={ getNetworkMembers.data } />
                    <MemberPagingBar pageInfo={ getNetworkMembers.pageInfo } setCurrentPage={ setCurrentPage }/>
                </>
            }
        </div>
    );

}

export default MemberNetworkMain;