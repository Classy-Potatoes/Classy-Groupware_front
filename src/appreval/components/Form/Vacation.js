import '../../../style/approval/Vacation.css'
import * as React from "react";
import {useEffect, useState} from "react";
import {Box, Input, TextField} from "@mui/material";
import DatePickerValue from "../mui/ApprovalDatePicker";
import BasicSelect from "../mui/VacationSelect";
import {callRegistVacationAPI, callWriterInfoAPI} from "../../apis/RegistDocumentAPICalls";
import {useDispatch, useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import ReferenceLineModal from "../mui/ReferenceLineModal";
import BasicModal from "../mui/approvalLineModal";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";


function Vacation() {

    const dispatch = useDispatch();
    const [form, setForm] = useState({});
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [ReferenceSelectedMembers, setReferenceSelectedMembers] = useState([]);

    /* 로그인 정보, 맴버전체 가져오기 */
     const {writer} = useSelector(state => state.approvalReducer);

     useEffect(() => {
         dispatch(callWriterInfoAPI());
     }, []);

    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const handleDateChange = ({ startDate, endDate }) => {
        setForm({
            ...form,
            startDate : startDate,
            endDate : endDate,
        });
    };

    const handleSelectChange = (selectedValue) => {
        // 부모 컴포넌트에서 선택된 값을 받아서 처리
        setForm({
            ...form,
            vacationType: selectedValue,
        });
    };



    /* 서버로 보내기 */
    const onClickCompletedHandler = () => {
        /* 유효성 검사 */
         if(!selectedMembers.length) {
             toast.error("결재선 지정이 필요합니다.")
             return;
         } else if (!form.documentTitle) {
             toast.error("제목을 입력해주세요.")
             return;
         } else if (!phoneNumber) {
             toast.error("비상 연락망을 입력해주세요.")
             return;
         } else if (!form.startDate  && !form.endDate) {
             toast.error("휴가 날짜를 선택해주세요.")
             return;
         } else if (!form.vacationType) {
             toast.error("휴가구분을 선택해주세요.")
             return;
         }

        /* json 데이터 */
        const resultData = {

            documentTitle: form.documentTitle,
            vacationBody: form.vacationBody,
            approvalLine: selectedMembers.map((member, index) => ({
                memberCode: member.memberCode,
                turn: index + 1,
            })),
            referenceLine: ReferenceSelectedMembers.map(member => member.memberCode),
            documentType: "휴가신청서",
            vacationType: form.vacationType,
            vacationStartDate : form.startDate ? form.startDate.format("YYYY-MM-DD") : "",
            vacationEndDate : form.endDate ? form.endDate.format("YYYY-MM-DD") : "",
            vacationEmergencyPhone : phoneNumber
        };
        /* 서버로 전달 */
            dispatch(callRegistVacationAPI({ vacationRequest: resultData }));
    }


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

    /* 참조자 지정 */
    const handleRegisterClick_reference = (ReferenceSelectedMembers) => {
        // 여기에서 선택된 멤버를 사용하거나 저장하는 로직을 추가할 수 있습니다.
        setReferenceSelectedMembers(ReferenceSelectedMembers.map(memberCode => writer.memberList.find(member => member.memberCode === memberCode)));
    };
    /* 결재자 지정 */
    const handleRegisterClick_approval = (selectedMembers) => {
        // 여기에서 선택된 멤버를 사용하거나 저장하는 로직을 추가할 수 있습니다.
        setSelectedMembers(selectedMembers.map(memberCode => writer.memberList.find(member => member.memberCode === memberCode)));
    };


        return (
            <>
                <div className="ReportTitle">
                    기안서 작성
                </div>

                <div className="VacationContainer">
                    <ToastContainer
                        position="top-center"
                        autoClose={4000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover={false}
                        theme="dark"
                    />

                    <div className="vacation-left">
                        <p
                            className="vacationTitle"
                            name="documentType"
                            onChange={ onChangeHandler }
                            value="휴가신청서"
                        >휴가신청서</p>

                        <div className="referenceMember-Div">
                            <div className="referenceMemberTitle-Button">
                                <p>수신 참조자</p>
                                {writer &&
                                    <ReferenceLineModal className="approvalLineButton" writer={writer} onRegisterClick={handleRegisterClick_reference}/>
                                }
                            </div>
                            <div className="referenceMember">
                                {ReferenceSelectedMembers.map((selectedMember, index) =>(
                                    <div key={index} className="referenceLine-pickMemberInfo-div" >
                                        {selectedMember && selectedMember.infoName}
                                    </div>
                                ))}
                            </div>

                        </div>


                        <div className="VacationLoginUserProfile">

                            <p className="approval-profile">성함</p>
                            <p className="approval-profile-detail">{writer && writer.loginMember &&  writer.loginMember.infoName}</p>
                            <p className="approval-profile">부서</p>
                            <p className="approval-profile-detail">{writer && writer.loginMember &&  writer.loginMember.deptName}</p>
                            <p className="approval-profile">직급</p>
                            <p className="approval-profile-detail">{writer && writer.loginMember &&  writer.loginMember.jobName}</p>
                            <p className="approval-profile-phone">비상 연락망</p>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': {m: 1, width: '220px'},
                                }}
                                noValidate={true}
                                autoComplete="off"
                            >
                                <Input
                                    placeholder="'-'를 제외한 핸드폰번호 입력"
                                    value= {phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                    name="vacationEmergencyPhone"
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
                                noValidate={true}
                                autoComplete="off"
                            >
                                <TextField
                                    multiline
                                    variant="filled"
                                    label="제목 입력"
                                    id="filled-multiline-static"
                                    placeholder="제목을 입력하세요."
                                    rows={1}
                                    name="documentTitle"
                                    onChange={onChangeHandler}
                                />
                            </Box>
                        </div>
                        <div className="vacationStartDate-endDate">
                            <div className="vacationDateTitle">기간</div>
                            <div className="vacationDateBody"><DatePickerValue onDateChange={handleDateChange}/></div>
                        </div>
                        <div className="vacationType-div">
                            <div className="vacationType">휴가구분</div>
                            <div className="vacationTypeBody"><BasicSelect onSelectChange={handleSelectChange}/></div>
                        </div>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': {m: 1, width: '1000px', margin: 'auto'},
                            }}
                            noValidate={true}
                            autoComplete="off"
                        >
                            <TextField
                                multiline
                                variant="filled"
                                label="세부사항 입력"
                                id="filled-multiline-static"
                                placeholder="상세 내용 입력"
                                rows={4}
                                name="vacationBody"
                                onChange={onChangeHandler}
                            />
                        </Box>

                        <div className="vacation-guide"> 위와 같이 휴가를 신청하오니 허락하여 주시기 바랍니다.</div>


                    </div>

                    <div className="approvalLineDiv">
                        <p>결재선</p>
                        {writer &&
                            <BasicModal className="approvalLineButton" writer={writer} onRegisterClick={handleRegisterClick_approval}/>
                        }
                    </div>
                    <div className="approvalLine">
                        {selectedMembers.map((selectedMember, index) =>(
                            <div key={index}  className="approvalLine-selectMember-div">
                                {selectedMember && selectedMember.infoName}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="approval-completeBtn">
                    <Button variant="contained" endIcon={<SendIcon />} onClick={onClickCompletedHandler}>
                        작성 완료
                    </Button>
                </div>


            </>
        );
    }

export default Vacation;