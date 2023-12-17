import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callNetworkMembersSearchAPI} from "../../apis/MemberAPICalls";
import {ToastContainer} from "react-toastify";
import NetworkMemberTop from "../../components/common/NetworkMemberTop";
import NetworkMemberList from "../../components/lists/NetworkMemberList";
import MemberPagingBar from "../../components/common/MemberPagingBar";
import {useSearchParams} from "react-router-dom";

function MemberNetworkSearchMain() {

    const dispatch = useDispatch();
    const [ searchParams ] = useSearchParams();
    const infoName = searchParams.get('value');
    const [ currentPage, setCurrentPage ] = useState( 1 );
    const { getNetworkMembers } = useSelector( state => state.memberReducer );


    useEffect(() => {

        dispatch( callNetworkMembersSearchAPI( { infoName, currentPage } ) );

    }, [ infoName, currentPage ]);


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

export default MemberNetworkSearchMain;