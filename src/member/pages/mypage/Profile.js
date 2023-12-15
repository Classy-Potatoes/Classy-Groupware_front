import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ToastContainer} from "react-toastify";
import MypageForm from "../../components/form/MypageForm";
import MyHistoryList from "../../components/lists/MyHistoryList";
import {callMyProfileAPI} from "../../apis/MemberAPICalls";
import {useNavigate} from "react-router-dom";

function Profile() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { getProfile, updateProfile } = useSelector( state => state.memberReducer );

    useEffect(() => {

        dispatch( callMyProfileAPI() );

    }, [ ]);

    useEffect(() => {

        if ( updateProfile === true ) {
            navigate(0);
            dispatch( callMyProfileAPI() );
        }

    }, [ updateProfile ]);


    return (
        <>
            <ToastContainer hideProgressBar={ true } position="top-center" />
            <div className="profile-background-div">
                {
                    getProfile &&
                    <div className='mypage-div'>
                        <MypageForm data={ getProfile } />
                        <MyHistoryList data={ getProfile } />
                    </div>
                }
            </div>
        </>
    );

}

export default Profile;