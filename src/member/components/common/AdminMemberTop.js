import {useState} from "react";
import {useNavigate} from "react-router-dom";


function AdminMemberTop() {

    const navigate = useNavigate();
    const [ search, setSearch ] = useState('');



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
        </>
    );
}

export default AdminMemberTop;