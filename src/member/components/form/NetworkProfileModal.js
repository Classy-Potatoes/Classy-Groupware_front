import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Modal from "react-modal";
import DaumPostcode from "react-daum-postcode";
import MyHistoryList from "../lists/MyHistoryList";
import {callAdminProfileUpdateAPI} from "../../apis/AdminAPICalls";
import {useNavigate} from "react-router-dom";

// 주소 모달 스타일 설정
const customAddressStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
    content: {
        width: '560px',
        height: '500px',
        margin: 'auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '20px',
    },
};

function NetworkProfileModal( { setModalIsOpen, data, selectMemberCode } ) {

    const dispatch = useDispatch();
    const imageInput = useRef();
    const [ apiModalIsOpen, setApiModalIsOpen ] = useState(false );
    const [ modifyMode, setModifyMode ] = useState( false );
    const [ imageUrl, setImageUrl ] = useState('');
    const navigate = useNavigate();
    const [ form, setForm ] = useState({
        infoCode : "",
        memberId : "",
        infoPhone : "",
        infoEmail : "",
        emailUrl: "",
        infoName: "",
        deptCode: "",
        jobCode: "",
        infoZipcode : "",
        infoAddress : "",
        infoAddressAdd : "",
        memberStatus : "",
    });



    const onClickCloseHandler = () => {
        setModalIsOpen( false );
    }

    // 수정모드가 아닐때 회색 관련 스타일
    const selectBoxStyle = { color : 'white', backgroundColor: '#6a6a6a' };
    const inputStyleWhite = { color : 'white' };




    return (
        <>
            <div className='mypage-div'>
            <div className='profile-top'>
                <div  className='networkProfile-top-btn'>
                    <button
                        onClick={ onClickCloseHandler }
                    >
                        CLOSE
                    </button>
                </div>
            </div>
            {
                <>
                data &&
                <div className='profile-mid'>
                    <div className='profile-mid-left'>
                        <div className='profile-mid-left-div'>
                            <div className='profile-mid-left-row'>
                                <div className='profile-mid-left-title'>사원번호</div>
                                <input
                                    type="text"
                                    name="infoCode"
                                    placeholder="사원번호"
                                    value={ data.infoCode }
                                    disabled={ true }
                                    style={ inputStyleWhite }
                                />
                            </div>
                            <div className='profile-mid-left-row'>
                                <div className='profile-mid-left-title'>아이디</div>
                                <input
                                    type="text"
                                    name="memberId"
                                    placeholder="아이디"
                                    value={ data.memberId }
                                    disabled={ true }
                                    style={ inputStyleWhite }
                                />
                            </div>
                            <div className='profile-mid-left-row'>
                                <div className='profile-mid-left-title'>휴대번호</div>
                                <input
                                    type="text"
                                    name="infoPhone"
                                    placeholder="휴대번호"
                                    value={ data.infoPhone }
                                    disabled={ true }
                                    style={ inputStyleWhite }
                                />
                            </div>
                            <div className='profile-mid-left-row'>
                                <div className='profile-mid-left-title'>이메일</div>
                                <div className="signup-div-left-email">
                                    <input
                                        type="text"
                                        className="profile-email-input"
                                        name="infoEmail"
                                        placeholder="이메일"
                                        value={ data.infoEmail.split('@')[0] }
                                        disabled={ true }
                                        style={ inputStyleWhite }
                                    />
                                    <select
                                        name="emailUrl"
                                        value={ '@' + data.infoEmail.split('@')[1] }
                                        disabled={ true }
                                        style={ selectBoxStyle }
                                    >
                                        <option value="@gmail.com">@gmail.com</option>
                                        <option value="@naver.com">@naver.com</option>
                                    </select>
                                </div>
                            </div>
                            <div className='profile-mid-left-row'>
                                <div className='profile-mid-left-title'>이름</div>
                                <input
                                    type="text"
                                    className="disabledInput"
                                    name='infoName'
                                    placeholder="이름"
                                    value={ data.infoName }
                                    style={ inputStyleWhite }
                                    disabled={ true }
                                />
                            </div>
                            <div className='profile-mid-left-row'>
                                <div className='profile-mid-left-title'>부서</div>
                                <select
                                    className='profile-selectBox'
                                    name="deptCode"
                                    value={ data.deptCode }
                                    style={ selectBoxStyle }
                                    disabled={ true }
                                >
                                    { data.dept.map( dept => (
                                        <option key={ dept.deptCode } value={ dept.deptCode }>
                                            { dept.deptName }
                                        </option>
                                    )) }
                                </select>
                            </div>
                            <div className='profile-mid-left-row'>
                                <div className='profile-mid-left-title'>직급</div>
                                <select
                                    className='profile-selectBox'
                                    name="jobCode"
                                    value={ data.jobCode }
                                    style={ selectBoxStyle }
                                    disabled={ true }
                                >
                                    { data.job.map( job => (
                                        <option key={ job.jobCode } value={ job.jobCode }>
                                            { job.jobName }
                                        </option>
                                    )) }
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='profile-mid-right'>
                        <div className='profile-mid-img-div'>
                            <div>
                                <img src={ data.getFilePathName }
                                     alt='profileImg'
                                     className="signup-div-profile-img"/>
                            </div>
                            <div className="signup-div-profile-title">프로필 사진</div>
                            <input
                                style={ { display: 'none' }}
                                type="file"
                                name='profileImage'
                                accept='image/jpg,image/png,image/jpeg,image/gif'
                                ref={ imageInput }
                                disabled={ true }
                            />
                        </div>
                        <div className='profile-mid-input-div'>
                            <div className='profile-mid-right-div'>
                                <div className='profile-mid-left-title'>우편번호</div>
                                <div className="signup-div-left-address">
                                    <input
                                        type="text"
                                        name="infoZipcode"
                                        className="width130-input"
                                        placeholder="우편번호"
                                        value={ data.infoZipcode }
                                        disabled={ true }
                                        style={ inputStyleWhite }
                                    />
                                    <button
                                        className="small-search-btn"
                                        style={{ cursor: "auto"}}
                                        disabled={ true }
                                    >
                                        주소찾기
                                    </button>
                                </div>
                            </div>
                            <div className='profile-mid-right-div'>
                                <div className='profile-mid-left-title'>주소</div>
                                <input
                                    type="text"
                                    name="infoAddress"
                                    placeholder="주소"
                                    value={ data.infoAddress }
                                    disabled={ true }
                                    style={ inputStyleWhite }
                                />
                            </div>
                            <div className='profile-mid-right-div'>
                                <div className='profile-mid-left-title'>상세주소</div>
                                <input
                                    type="text"
                                    name="infoAddressAdd"
                                    placeholder="상세주소"
                                    value={ data.infoAddressAdd }
                                    disabled={ true }
                                    style={ inputStyleWhite }
                                />
                            </div>
                            {/*<div className='profile-mid-right-div'>*/}
                            {/*    <div className='profile-mid-left-title'>회원상태</div>*/}
                            {/*    <select*/}
                            {/*        className='profile-selectBox'*/}
                            {/*        name="memberStatus"*/}
                            {/*        style={ selectBoxStyle }*/}
                            {/*        value={ !modifyMode ? data.memberStatus : form.memberStatus }*/}
                            {/*        disabled={ true }*/}
                            {/*    >*/}
                            {/*        <option value='ACTIVE'>ACTIVE</option>*/}
                            {/*        <option value='NONACTIVE'>NONACTIVE</option>*/}
                            {/*        <option value='DELETE'>DELETE</option>*/}
                            {/*    </select>*/}
                            {/*</div>*/}
                        </div>

                    </div>
                </div>
                <MyHistoryList data={ data } />
                </>
            }
            </div>
        </>
    );
}

export default NetworkProfileModal;
