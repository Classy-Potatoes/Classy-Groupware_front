import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Modal from "react-modal";
import {
    callDuplicateIdAPI,
    callEmailSearchPwdAPI,
    callSearchInfoCodeAPI,
    callSignupAPI
} from "../../apis/MemberAPICalls";
import {useDispatch, useSelector} from "react-redux";
import DaumPostcode from "react-daum-postcode";
import {hide} from "react-modal/lib/helpers/ariaAppHider";
import {toast} from "react-toastify";
import {searchInfoCodeResult} from "../../modules/MemberModule";
import {signupInputChecks} from "../../utils/SignupInputChecks";


// 모달 스타일 설정
const customStyles = {
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

Modal.setAppElement('#root');

function SignupForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const imageInput = useRef();
    const [ modalIsOpen, setModalIsOpen ] = useState(false );
    const [ imageUrl, setImageUrl ] = useState('');
    const { searchInfoCodeResult, duplicateIdResult, signupResult } = useSelector( state => state.memberReducer );
    const [ form, setForm ] = useState({
        infoCode : "",
        memberId : "",
        memberPassword : "",
        memberPasswordCheck : "",
        infoPhone : "",
        infoEmail : "",
        emailUrl: "@gmail.com",
        infoZipcode : "",
        infoAddress : "",
        infoAddressAdd : "",
    });

    useEffect(() => {
        // 중복확인
        if( duplicateIdResult?.isCheck === true ) {
            toast.dismiss();
            toast.error('다른 아이디를 사용해주세요.', {
                autoClose : 1000
            });

        } else if( duplicateIdResult?.isCheck === false ) {

            if( form.memberId === "" ) {
                toast.dismiss();
                toast.warning('값을 입력해주세요.', {
                    autoClose : 1000
                });
            } else if( !/^[a-zA-Z0-9]+$/.test( form.memberId ) ) {
                toast.dismiss();
                toast.error('한글을 제외한 다른 문자로 아이디를 입력해주세요.', {
                    autoClose: 1000
                });
            } else {
                toast.dismiss();
                toast.success('사용 가능한 아이디 입니다.', {
                    autoClose : 1000
                });
            }
        }

    }, [ duplicateIdResult ]);


    useEffect(() => {

        if( signupResult === true ) {
            // { replace : true } 히스토리를 지워버리겠다. 뒤로가기 불가
            navigate('/product-management', { replace : true });
        }

    }, [ signupResult ]);


    const onChangeHandler = e => {
        setForm({
            ...form,
            [ e.target.name ]: e.target.value
        });
    }

    // 가입하기 버튼 이벤트
    const onClickSignupHandler = () => {

        const selectedFile = imageInput.current.files[0];

        // input 검증 메서드
        const checkedForm = signupInputChecks( form, imageInput );

        if ( checkedForm ) {
            const profileImgFile = imageInput.current.files[0];

            dispatch( callSignupAPI({ signupRequest : checkedForm, signupImgRequest : profileImgFile } ));
        }

    }


    // 메인으로 버튼 이벤트
    const onClickBackHandler = () => {
        window.location.replace("/");
    }
    // 아이디 중복 검사 버튼 이벤트
    const onClickIdCheckHandler = () => {
        dispatch( callDuplicateIdAPI( { duplicateIdRequest : form } ) );
    }
    // 사번 검증 버튼 이벤트
    const onClickInfoCodeCheckHandler = () => {
        dispatch( callSearchInfoCodeAPI( { searchInfoCodeRequest : form } ) );
    }



    /* ----------------------- 주소,모달 관련 -----------------------*/
    // 모달 토글
    const onToggleModal = () => {
        setModalIsOpen((isCheck) => !isCheck );
    };

    // 주소 data
    const handleComplete = ( data ) => {
        console.log( data );
        setForm({
            ...form,
            infoZipcode: data.zonecode,        // 우편번호
            infoAddress: data.address,         // 주소
        });
        onToggleModal(); // 주소창은 자동으로 사라지므로 모달만 꺼주면 된다.
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
            { modalIsOpen && (
                <Modal
                    isOpen={ modalIsOpen }
                    onRequestClose={ onToggleModal }
                    style={ customStyles }
                >
                    <DaumPostcode onComplete={ handleComplete } style={{ height: '450px'}}/>
                </Modal>
            ) }
            <div className="login-div-title">회원가입</div>
            <div className="signup-div-profile">

                <div onClick={ onClickImageUpload } >
                    { imageUrl ? (
                        <img src={ imageUrl }
                             alt='profileImg'
                             className="signup-div-profile-img"/>
                    ) : (
                        <img src="/member/signupImg.png"
                             alt='profileImg'
                             className="signup-div-profile-img"/>
                    )}
                </div>
                <div className="signup-div-profile-title">프로필 사진</div>
                <input
                    style={ { display: 'none' }}
                    type="file"
                    name='profileImage'
                    accept='image/jpg,image/png,image/jpeg,image/gif'
                    ref={ imageInput }
                    onChange={ onChangeImageUpload }
                />
            </div>
            <div className="signup-div-form">
                <div className="signup-div-left">
                    <span>* 사전에 받은 사원번호를 입력해주세요.</span>
                    <div className="signup-div-left-address">
                        <input
                            type="text"
                            name="infoCode"
                            className="width130-input"
                            placeholder="* 사원번호"
                            onChange={ onChangeHandler }
                        />
                        <button
                            className="small-search-btn"
                            onClick={ onClickInfoCodeCheckHandler }
                        >
                            사번확인
                        </button>
                    </div>
                    <div className="signup-div-left-address">
                        <input
                            type="text"
                            name="memberId"
                            className="width130-input"
                            placeholder="* 아이디"
                            onChange={ onChangeHandler }
                            disabled={ !searchInfoCodeResult ? true : false }
                        />
                        <button
                            className="small-search-btn"
                            onClick={ onClickIdCheckHandler }
                            disabled={ !searchInfoCodeResult ? true : false }
                        >
                            중복확인
                        </button>
                    </div>
                    <input
                        type="password"
                        name="memberPassword"
                        placeholder="* 비밀번호"
                        onChange={ onChangeHandler }
                        disabled={ !searchInfoCodeResult ? true : false }
                    />
                    <input
                        type="password"
                        name="memberPasswordCheck"
                        placeholder="* 비밀번호 확인"
                        onChange={ onChangeHandler }
                        disabled={ !searchInfoCodeResult ? true : false }
                    />
                    <input
                        type="text"
                        name="infoPhone"
                        placeholder="* 휴대번호"
                        onChange={ onChangeHandler }
                        disabled={ !searchInfoCodeResult ? true : false }
                    />
                    <div className="signup-div-left-email">
                        <input
                            type="text"
                            className="email-input"
                            name="infoEmail"
                            placeholder="* 이메일"
                            onChange={ onChangeHandler }
                            disabled={ !searchInfoCodeResult ? true : false }
                        />
                        <select
                            name="emailUrl"
                            onChange={ onChangeHandler }
                            disabled={ !searchInfoCodeResult ? true : false }
                        >
                            <option value="@gmail.com">@gmail.com</option>
                            <option value="@naver.com">@naver.com</option>
                        </select>
                    </div>

                </div>

                <div className="signup-div-right">
                    <span>* 은 필수 입력 사항입니다.</span>
                    {
                        searchInfoCodeResult &&
                        <>
                            <input
                                type="text"
                                className="disabledInput"
                                placeholder="이름"
                                value={ searchInfoCodeResult?.infoName }
                                disabled={ true }
                            />
                            <input
                                type="text"
                                className="disabledInput"
                                placeholder="부서"
                                value={ searchInfoCodeResult?.deptName }
                                disabled={ true }
                            />
                            <input
                                type="text"
                                className="disabledInput"
                                placeholder="직급"
                                value={ searchInfoCodeResult?.jobName }
                                disabled={ true }
                            />
                        </>
                    }

                    <div className="signup-div-left-address">
                        <input
                            type="text"
                            name="infoZipcode"
                            className="width130-input"
                            placeholder="* 우편번호"
                            value={ form.infoZipcode }
                            onChange={ onChangeHandler }
                            disabled={ !searchInfoCodeResult ? true : false }
                        />
                        <button
                            className="small-search-btn"
                            onClick={ onToggleModal }
                            disabled={ !searchInfoCodeResult ? true : false }
                        >
                            주소찾기
                        </button>
                    </div>

                    <input
                        type="text"
                        name="infoAddress"
                        placeholder="* 주소"
                        value={ form.infoAddress }
                        onChange={ onChangeHandler }
                        disabled={ !searchInfoCodeResult ? true : false }
                    />
                    <input
                        type="text"
                        name="infoAddressAdd"
                        placeholder="* 상세주소"
                        onChange={ onChangeHandler }
                        disabled={ !searchInfoCodeResult ? true : false }
                    />
                </div>
            </div>
            <div className="signup-div-button">
                <button
                    onClick={ onClickBackHandler }
                >
                    메인으로
                </button>
                <button
                    onClick={ onClickSignupHandler }
                    // disabled={ isInput() ? true : false }
                >
                    가입하기
                </button>
            </div>



        </>
    );

}

export default SignupForm;