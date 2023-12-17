import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callMyProfileUpdateAPI} from "../../apis/MemberAPICalls";
import Modal from "react-modal";
import DaumPostcode from "react-daum-postcode";
import MyHistoryList from "../lists/MyHistoryList";
import {callAdminProfileUpdateAPI} from "../../apis/AdminAPICalls";
import {useNavigate} from "react-router-dom";
import {adminUpdateProfile} from "../../modules/AdminModule";

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

function MemberProfileModal( { setModalIsOpen, data, selectMemberCode } ) {

    const dispatch = useDispatch();
    const imageInput = useRef();
    const [ apiModalIsOpen, setApiModalIsOpen ] = useState(false );
    const [ modifyMode, setModifyMode ] = useState( false );
    const [ imageUrl, setImageUrl ] = useState('');
    const navigate = useNavigate();
    const { adminUpdateProfile } = useSelector( state => state.adminReducer );
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


    useEffect(() => {

        if ( adminUpdateProfile === true ) {
            navigate( 0 );
        }

    }, [ adminUpdateProfile ]);


    const onChangeHandler = e => {

        const { name, value } = e.target;

        if (name === 'infoPhone') {
            // 입력된 값에서 숫자만 추출
            const inputValue = value.replace(/\D/g, "");

            const formattedPhoneNumber = inputValue.replace(
                /(\d{1,3})(\d{4})(\d{4})/,
                "$1-$2-$3"
            );

            setForm({
                ...form,
                [ name ]: formattedPhoneNumber,
            });

        } else {

            setForm({
                ...form,
                [ name ]: value,
            });

        }
    }


    // save 버튼 이벤트
    const onClickSaveHandler = () => {

        let profileImgFile = "";

        console.log(form);
        setModifyMode( false );

        if ( imageInput.current.files[0] ) {
            profileImgFile = imageInput.current.files[0];
        }

        dispatch( callAdminProfileUpdateAPI({
            updateRequest : form,
            updateImgRequest : profileImgFile,
            selectMemberCode : selectMemberCode
        }))
    }

    const onClickCloseHandler = () => {
        setModalIsOpen( false );
    }

    /* ----------------------- 수정 모드 관련 -----------------------*/
    // 수정모드가 아닐때 회색 관련 스타일
    const inputStyle = !modifyMode ? { color : 'white' } : { color : 'black' };
    const selectBoxStyle =
        !modifyMode ? { color : 'white', backgroundColor: '#6a6a6a' } : { color : 'black', backgroundColor: 'white' };
    const inputStyleWhite = { color : 'white' };

    // 수정 모드로 변환하는 이벤트
    const onClickModifyModeHandler = () => {

        setModifyMode( true );
        setForm({
            ...data,
            infoEmail: data.infoEmail.split('@')[0],
            emailUrl: '@' + data.infoEmail.split('@')[1]
        });
    }

    /* ----------------------- 수정 모드 관련 -----------------------*/

    /* ----------------------- 주소,모달 관련 -----------------------*/
    // 모달 토글
    const onToggleApiModal = () => {
        setApiModalIsOpen((isCheck) => !isCheck );
    };

    // 주소 data
    const handleComplete = ( addressData ) => {
        console.log( addressData );
        setForm({
            ...form,
            infoZipcode: addressData.zonecode,        // 우편번호
            infoAddress: addressData.address,         // 주소
        });
        onToggleApiModal(); // 주소창은 자동으로 사라지므로 모달만 꺼주면 된다.
    };
    /* ----------------------- 주소,모달 관련 -----------------------*/

    /* ----------------------- 이미지 관련 -----------------------*/
    const onChangeImageUpload = () => {

        const fileReader = new FileReader();

        fileReader.onload = e => {
            const { result } = e.target;

            if( result ) {
                setImageUrl( result );
            }
        }

        const selectedFile = imageInput.current.files[0];

        if( selectedFile ) {
            fileReader.readAsDataURL( selectedFile );
        }

    }

    const onClickImageUpload = () => {
        imageInput.current.click();
    }
    /* ----------------------- 이미지 관련 -----------------------*/


    return (
        <>
            { apiModalIsOpen && (
                <Modal
                    isOpen={ apiModalIsOpen }
                    onRequestClose={ onToggleApiModal }
                    style={ customAddressStyles }
                >
                    <DaumPostcode onComplete={ handleComplete } style={{ height: '450px'}}/>
                </Modal>
            ) }
            <div className='mypage-div'>
            <div className='profile-top'>
                <div  className='adminProfile-top-btn'>
                    {   modifyMode &&
                        <button
                            onClick={ onClickSaveHandler }
                        >
                            SAVE
                        </button>
                    }
                    {   !modifyMode &&
                        <button
                            onClick={ onClickModifyModeHandler }
                        >
                            EDIT
                        </button>
                    }
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
                                    onChange={ onChangeHandler }
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
                                    onChange={ onChangeHandler }
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
                                    onChange={ onChangeHandler }
                                    value={ !modifyMode ? data.infoPhone : form.infoPhone }
                                    disabled={ !modifyMode ? true : false }
                                    style={ inputStyle }
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
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? data.infoEmail.split('@')[0] : form.infoEmail }
                                        disabled={ !modifyMode ? true : false }
                                        style={ inputStyle }
                                    />
                                    <select
                                        name="emailUrl"
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? '@' + data.infoEmail.split('@')[1] : form.emailUrl }
                                        disabled={ !modifyMode ? true : false }
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
                                    onChange={ onChangeHandler }
                                    placeholder="이름"
                                    value={ !modifyMode ? data.infoName : form.infoName }
                                    style={ inputStyle }
                                    disabled={ !modifyMode ? true : false }
                                />
                            </div>
                            <div className='profile-mid-left-row'>
                                <div className='profile-mid-left-title'>부서</div>
                                <select
                                    className='profile-selectBox'
                                    name="deptCode"
                                    onChange={ onChangeHandler }
                                    value={ !modifyMode ? data.deptCode : form.deptCode }
                                    style={ selectBoxStyle }
                                    disabled={ !modifyMode ? true : false }
                                    // disabled={ true }
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
                                    onChange={ onChangeHandler }
                                    value={ !modifyMode ? data.jobCode : form.jobCode }
                                    style={ selectBoxStyle }
                                    disabled={ !modifyMode ? true : false }
                                    // disabled={ true }
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
                            <div style={{ cursor: "pointer"}}
                                 onClick={ onClickImageUpload }
                            >
                                <img src={ !imageUrl ? data.getFilePathName : imageUrl }
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
                                onChange={ onChangeImageUpload }
                                disabled={ !modifyMode ? true : false }
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
                                        onChange={ onChangeHandler }
                                        value={ !modifyMode ? data.infoZipcode : form.infoZipcode }
                                        disabled={ !modifyMode ? true : false }
                                        style={ inputStyle }
                                    />
                                    <button
                                        className="small-search-btn"
                                        onClick={ onToggleApiModal }
                                        disabled={ !modifyMode ? true : false }
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
                                    onChange={ onChangeHandler }
                                    value={ !modifyMode ? data.infoAddress : form.infoAddress }
                                    disabled={ !modifyMode ? true : false }
                                    style={ inputStyle }
                                />
                            </div>
                            <div className='profile-mid-right-div'>
                                <div className='profile-mid-left-title'>상세주소</div>
                                <input
                                    type="text"
                                    name="infoAddressAdd"
                                    placeholder="상세주소"
                                    onChange={ onChangeHandler }
                                    value={ !modifyMode ? data.infoAddressAdd : form.infoAddressAdd }
                                    disabled={ !modifyMode ? true : false }
                                    style={ inputStyle }
                                />
                            </div>
                            <div className='profile-mid-right-div'>
                                <div className='profile-mid-left-title'>회원상태</div>
                                <select
                                    className='profile-selectBox'
                                    name="memberStatus"
                                    onChange={ onChangeHandler }
                                    style={ selectBoxStyle }
                                    value={ !modifyMode ? data.memberStatus : form.memberStatus }
                                    disabled={ !modifyMode ? true : false }
                                    // disabled={ true }
                                >
                                    <option value='ACTIVE'>ACTIVE</option>
                                    <option value='NONACTIVE'>NONACTIVE</option>
                                    <option value='DELETE'>DELETE</option>
                                </select>
                            </div>
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

export default MemberProfileModal;
