import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {callDeptListAPI, callInfoRegistAPI, callJobListAPI} from "../../apis/AdminAPICalls";

function MemberInfoRegistModal({ setModalIsOpen }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { getJobs, getDepts, infoRegistResult } = useSelector( state => state.adminReducer );
    const [ form, setForm ] = useState({
        name: '',
        deptCode: 1,
        jobCode: 1
    });

    useEffect(() => {

       dispatch( callDeptListAPI() );
       dispatch( callJobListAPI() );

    }, []);

    useEffect(() => {

        if ( infoRegistResult === true ) {
            navigate(0);
        }

    }, [ infoRegistResult ]);


    const onChangeHandler = e => {
        setForm({
            ...form,
            [ e.target.name ] : e.target.value
        })
    };

    const onclickRegistHandler = () => {

        dispatch( callInfoRegistAPI({ registRequest : form }) );

    };

    // 모달 닫힘
    const onclickCloseHandler = () => {
        setModalIsOpen( false );
    };


    return (
        <div className='member-modal-div'>
            <div className='member-modal-div-title'>회원 정보 등록</div>
            <div className='member-modal-div-input'>
                <div className='member-modal-div-input-title'>이름</div>
                <input type='text'
                       placeholder='이름을 입력해주세요.'
                       name='infoName'
                       onChange={ onChangeHandler }
                />
            </div>
            {   getDepts &&
                <div className='member-modal-div-input'>
                    <div className='member-modal-div-input-title'>부서</div>
                    <select
                        name='deptCode'
                        defaultChecked={ form.deptCode }
                        onChange={ onChangeHandler }
                    >
                        { getDepts.map( dept => (
                            <option key={ dept.deptCode } value={ dept.deptCode }>
                                { dept.deptName }
                            </option>
                        )) }
                    </select>
                </div>
            }
            {   getJobs &&
                <div className='member-modal-div-input'>
                    <div className='member-modal-div-input-title'>직급</div>
                    <select
                        name='jobCode'
                        defaultChecked={ form.jobCode }
                        onChange={ onChangeHandler }
                    >
                        { getJobs.map( job => (
                            <option key={ job.jobCode } value={ job.jobCode } >
                                { job.jobName }
                            </option>
                        )) }
                    </select>
                </div>
            }
            <div className='member-modal-div-btn'>
                <button onClick={ onclickRegistHandler }>회원 정보 등록</button>
                <button onClick={ onclickCloseHandler }>닫기</button>
            </div>
        </div>
    );
}

export default MemberInfoRegistModal;
