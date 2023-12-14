import {useEffect} from "react";
import {useSelector} from "react-redux";
import {ToastContainer} from "react-toastify";
import MypageForm from "../../components/form/MypageForm";

function Profile() {

    // const { signupResult } = useSelector(state => state.memberReducer );


    useEffect(() => {

        // 업데이트 관련 성공 처리하기
        // if ( signupResult === true ) {
        //     window.location.replace("/");
        // }

    }, [  ]);


    return (
        <>
            <ToastContainer hideProgressBar={ true } position="top-center" />
            <div className="profile-background-div">
                <div className='mypage-div'>
                    <MypageForm />
                    <div>이력 컴포넌트 들어가야할 부분</div>
                </div>
            </div>
        </>
    );

}

export default Profile;