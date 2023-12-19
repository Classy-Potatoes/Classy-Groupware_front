import Modal from "react-modal";
import {useEffect, useState} from "react";
import MemberProfileModal from "../form/MemberProfileModal";
import {useDispatch, useSelector} from "react-redux";
import {callAdminMemberProfileAPI} from "../../apis/AdminAPICalls";
import {getProfileNetwork} from "../../modules/MemberModule";
import {useNavigate} from "react-router-dom";
import {callNetworkMemberProfileAPI} from "../../apis/MemberAPICalls";
import NetworkProfileModal from "../form/NetworkProfileModal";


// 모달 스타일 설정
const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
    content: {
        width: '950px',
        height: '720px',
        margin: 'auto',
        padding: 0,
        border: 0,
        backgroundColor: 'rgb(0, 0, 0, 60%)',
        borderRadius: '10px',
    },
};

function NetworkMemberList( { data } ) {

    const [ modalIsOpen, setModalIsOpen ] = useState(false );
    const [ selectMemberCode, setSelectMemberCode ] = useState();
    const dispatch = useDispatch();
    const { getProfileNetwork } = useSelector( state => state.memberReducer );


    const onClickRowHandler = ( memberCode ) => {

        setSelectMemberCode( memberCode );
        dispatch( callNetworkMemberProfileAPI( memberCode ) )
        onToggleModal();
    };

    // 모달 토글
    const onToggleModal = () => {
        setModalIsOpen((isCheck) => !isCheck );
    };


    return (
        <>
        { modalIsOpen && getProfileNetwork && (
            <Modal
                isOpen={ modalIsOpen }
                onRequestClose={ onToggleModal }
                style={ customStyles }
            >
                <NetworkProfileModal
                    setModalIsOpen = { setModalIsOpen }
                    data = { getProfileNetwork }
                    selectMemberCode = { selectMemberCode }
                />
            </Modal>
        ) }
        {
            data &&
            <div className="member-div">
                <table className="member-table">
                    <colgroup>
                        <col width="5%" />
                        <col width="15%" />
                        <col width="15%" />
                        <col width="15%" />
                        <col width="15%" />
                        <col width="15%" />
                        <col width="20%" />
                    </colgroup>
                    <thead>
                    <tr>
                        <th>　</th>
                        <th>성명</th>
                        <th>사원 번호</th>
                        <th>직급</th>
                        <th>부서</th>
                        <th>휴대폰</th>
                        <th>이메일</th>
                    </tr>
                    </thead>
                    <tbody>
                    { data.map( members => (
                        <tr key={ members.infoCode }
                            style={{ cursor: "pointer"}}
                            onClick={ () => onClickRowHandler( members.memberCode ) }
                        >
                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <div className='member-table-img-div'>
                                    <img src={ members.filePath } className="member-table-img" />
                                </div>
                            </td>
                            <td>{ members.infoName }</td>
                            <td>{ members.infoCode }</td>
                            <td>{ members.jobName }</td>
                            <td>{ members.deptName }</td>
                            <td>{ members.infoPhone }</td>
                            <td>{ members.infoEmail }</td>
                        </tr>
                    ))
                    }
                    </tbody>
                </table>
            </div>
        }
        </>
    );

}

export default NetworkMemberList;