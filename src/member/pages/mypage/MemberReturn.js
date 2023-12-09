import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

function MemberReturn() {

    const dispatch = useDispatch();
    // const { profileInfo } = useSelector( state => state.memberReducer );


    useEffect(() => {

        // dispatch( callMemberAPI() );

    }, []);


    return (
        <div className="profile-background-div">
            {/*{*/}
            {/*    profileInfo &&*/}
            {/*        <ProfileItem profileInfo={ profileInfo } />*/}
            {/*}*/}
        </div>
    );

}

export default MemberReturn;