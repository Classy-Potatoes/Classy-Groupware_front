import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {removeToken} from "../../utils/TokenUtils";
import {callMemberReturnAPI} from "../../apis/MemberAPICalls";

function ReturnItem() {

    const dispatch = useDispatch();
    const { memberReturnResult } = useSelector(state => state.memberReducer);
    const [ isCheckBox, setIsCheckBox ] = useState(false);


    useEffect(() => {

        if ( memberReturnResult === true ) {
            toast.info(
                <div>반납 완료<br />
                    이용해 주셔서 감사합니다.</div>,
                {
                    autoClose : 1000,
                    onClose: () => {
                        removeToken();
                        window.location.replace("/");
                    }
                }
            );
        }

    }, [ memberReturnResult ]);


    const onClickReturnHandler = () => {

        if ( isCheckBox ) {

            dispatch( callMemberReturnAPI());

        } else {

            toast.dismiss();
            toast.error(
                <div>동의 해주셔야<br />
                    반납이 완료됩니다.</div>,
                {
                    autoClose : 1000
                }
            );
        }
    }

    const onCheckboxChangeHandle = () => {
        setIsCheckBox(!isCheckBox);
    }


    return (
        <>
            <div className="login-div-title">회원 반납</div>
            <div className="return-div-layout">
                <div className='return-div-items-top'>
                    <div className='return-div-items-title'>회원반납 시 개인정보 및 Classy Groupware에서 만들어진 모든 데이터는 삭제 됩니다.</div>
                    <div className='return-div-items-title'>(단, 아래 항목은 표기된 법류에 따라 특정 기간 동안 보관됩니다.)</div>
                    <div className='return-div-items-content'>1.계약 또는 청약철회 등에 관한 기록 보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률 / 보존기간 : 5년</div>
                    <div className='return-div-items-content'>2.대금결제 및 재화 등의 공급에 관한 기록 보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률 / 보존기간 : 5년</div>
                    <div className='return-div-items-content'>3.전자금융 거래에 관한 기록 보존 이유 : 전자금융거래법 보존 기간 / 5년</div>
                    <div className='return-div-items-content'>4.소비자의 불만 또는 분쟁처리에 관한 기록 보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률 보존 기간 / 3년</div>
                    <div className='return-div-items-content'>5.신용정보의 수집/처리 및 이용 등에 관한 기록 보존 이유 : 신용정보의 이용 및 보호에 관한 법률 보존기간 / 3년</div>
                    <div className='return-div-items-content'>6.전자(세금)계산서 시스템 구축 운영하는 사업자가 지켜야 할 사항 고시(국세청 고시 제 2016-3호)</div>
                    <div className='return-div-items-content'> (전자세금계산서 사용자에 한함) : 5년 (단, (세금)계산서 내 개인식별번호는 3년 경과 후 파기)</div>
                </div>
                <div className='return-div-items-mid'>
                    <div className='return-div-items-title'>유의사항</div>
                    <div className='return-div-items-content'>- 회원반납 처리 후에는 회원님의 개인정보를 복원할 수 없으며,</div>
                    <div className='return-div-items-content'>&nbsp;&nbsp;&nbsp;회원반납 진행시 해당 아이디는 영구적으로 삭제되어 재가입이 불가합니다.</div>
                    <div className='return-div-items-content'>- 소속된 회사가 존재할 경우, “반납”회원으로 조회됩니다.</div>
                    <div className='return-div-items-content'>- 회사가 Classy Groupware 내에 존재하는 경우, 회사에 귀속된 데이터에 대해서는 보관 됩니다.</div>
                </div>
                <div className='return-div-items-bot'>
                    <label onChange={ onCheckboxChangeHandle }
                            style={{cursor: 'pointer'}}>
                        <input type='checkbox'
                               checked={ isCheckBox }
                               className='return-checkbox'
                               onChange={ onCheckboxChangeHandle }
                        />
                        해당 내용은 모두 확인했으며, 회원 반납에 동의합니다.
                    </label>
                </div>
            </div>
            <button
                className="search-button"
                onClick={ onClickReturnHandler }
            >
                반납하기
            </button>
        </>
    );
}

export default ReturnItem;