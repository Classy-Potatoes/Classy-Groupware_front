import Modal from "react-modal";
import MemberInfoRegistModal from "../form/MemberInfoRegistModal";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


// 모달 스타일 설정
const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
    content: {
        width: '360px',
        height: '360px',
        margin: 'auto',
        border: 0,
        backgroundColor: 'rgb(0, 0, 0, 60%)',
        borderRadius: '10px',
    },
};

function AdminMemberTop() {

    const navigate = useNavigate();
    const [ modalIsOpen, setModalIsOpen ] = useState(false );
    const [ search, setSearch ] = useState('');

    // 모달 토글
    const onToggleModal = () => {
        setModalIsOpen((isCheck) => !isCheck );
    };

    /* 검색어 입력 값 상태 저장 */
    const onSearchChangeHandler = e => {
        setSearch(e.target.value);
    }

    /* Enter 입력 시 검색 결과 화면으로 이동 */
    const onEnterkeyHandler = e => {

        if (e.key === 'Enter') {
            navigate(`/admin/member/search?value=${search}`)
        }

    }

    return(
        <>
            <div className="member-top">
                <div className="member-top-title-ad">회원 관리</div>
                <div className="member-top-search">
                    <input
                        className="input-style"
                        type="text"
                        placeholder="이름을 검색해주세요."
                        onChange={ onSearchChangeHandler }
                        onKeyUp={ onEnterkeyHandler }
                    />
                </div>
            </div>

            { modalIsOpen && (
                <Modal
                    isOpen={ modalIsOpen }
                    onRequestClose={ onToggleModal }
                    style={ customStyles }
                >
                    <MemberInfoRegistModal
                        setModalIsOpen = { setModalIsOpen }
                    />
                </Modal>
            ) }
        </>
    );
}

export default AdminMemberTop;