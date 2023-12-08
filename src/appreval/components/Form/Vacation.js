import '../../../style/approval/Vacation.css'
import * as React from "react";
import {useState} from "react";
import {Box, Input, TextField} from "@mui/material";
import DatePickerValue from "../mui/DatePicker";
import BasicSelect from "../mui/VacationSelect";


function Vacation() {

    /* 로그인 정보 가져오기 */
    // const dispatch = useDispatch();
    // const {writer} = useSelector(state => state.approvalReducer);

    // useEffect(() => {
    //     dispatch(callWriterInfoAPI());
    // }, []);


    /* 비상 연락망*/
    const [phoneNumber, setPhoneNumber] = useState("");

    const handlePhoneNumberChange = (event) => {
        // 입력된 값에서 숫자만 추출
        const inputValue = event.target.value.replace(/\D/g, "");

        // 숫자를 하이픈으로 나누어서 핸드폰 번호 형식으로 만들기
        const formattedPhoneNumber = inputValue.replace(
            /(\d{1,3})(\d{4})(\d{4})/,
            "$1-$2-$3"
        );
        setPhoneNumber(formattedPhoneNumber);
    }



        return (
            <>
                <div className="ReportTitle">
                    기안서 작성
                </div>

                <div className="VacationContainer">
                    <div className="vacation-left">
                        <p className="vacationTitle">휴가신청서</p>

                        <div className="referenceMember-Div">
                            <div className="referenceMemberTitle-Button">
                                <p>수신 참조자</p>
                                <button className="referenceLineButton">추가</button>
                            </div>
                            <div className="referenceMember">
                                신짱아,봉미선,김철수,신영만,신짱구
                            </div>

                        </div>


                        <div className="VacationLoginUserProfile">

                            <p className="approval-profile">성함</p>
                            <p className="approval-profile-detail"></p>
                            <p className="approval-profile">부서</p>
                            <p className="approval-profile-detail"></p>
                            <p className="approval-profile">직급</p>
                            <p className="approval-profile-detail"></p>
                            <p className="approval-profile-phone">비상 연락망</p>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': {m: 1, width: '220px'},
                                }}
                                novalidate
                                aotuComplete="off"
                            >
                                <Input
                                    placeholder="'-'를 제외한 핸드폰번호 입력"
                                    value= {phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                    inputProps={{ maxLength: 13}}
                                />
                            </Box>

                        </div>
                        <div className="vacation-mainTitle">
                            <p>제목</p>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': {m: 1, width: '920px', margin: 'auto'},
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField multiline variant="filled" label="제목 입력" id="filled-multiline-static"
                                           placeholder="제목을 입력하세요." rows={1}/>
                            </Box>
                        </div>
                        <div className="vacationStartDate-endDate">
                            <div className="vacationDateTitle">기간</div>
                            <div className="vacationDateBody"><DatePickerValue/></div>
                        </div>
                        <div className="vacationType-div">
                            <div className="vacationType">휴가구분</div>
                            <div className="vacationTypeBody"><BasicSelect/></div>
                        </div>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': {m: 1, width: '1000px', margin: 'auto'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField multiline variant="filled" label="세부사항 입력" id="filled-multiline-static"
                                       placeholder="상세 내용 입력" rows={4}/>
                        </Box>

                        <div className="vacation-guide"> 위와 같이 휴가를 신청하오니 허락하여 주시기 바랍니다.</div>

                        <div className="letter-registTime"> 작성완료 시 날짜,시간 코드 추가</div>

                        <div className="vacation-NameSign"><span>서명</span> 신청자 : 코드추가 (인)</div>

                    </div>

                    <div className="approvalLineDiv">
                        <p>결재선</p>
                        <button className="approvalLineButton">추가</button>
                    </div>
                    <div className="approvalLine">
                        <p className="approvalLine-p">최초 승인자</p>
                        <p className="approvalLine-p">중간 승인자</p>
                        <p className="approvalLine-p">중간 승인자</p>
                        <p className="approvalLine-p">중간 승인자</p>
                        <p>최종 승인자</p>
                    </div>


                </div>


            </>
        );
    }

export default Vacation;