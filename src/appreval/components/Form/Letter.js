import '../../../style/approval/Letter.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import {Box, TextField} from "@mui/material";
import {callRegistLetterAPI, callWriterInfoAPI} from "../../apis/RegistDocumentAPICalls";
import {useDispatch, useSelector} from "react-redux";
import BasicModal from "../mui/approvalLineModal";
import ReferenceLineModal from "../mui/ReferenceLineModal";
import SendIcon from "@mui/icons-material/Send";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";


function Letter() {

    const [form, setForm] = useState({});
    /* 모달창에 입력한 결재선 가져오기 */
    const [selectedMembers, setSelectedMembers] = useState([]);
    /* 모달창에 입력한 참조선 가져오기 */
    const [ReferenceSelectedMembers, setReferenceSelectedMembers] = useState([]);
    const [selectedFiles, setSelectedFiles] = React.useState([]);
    const attachmentInput = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }
    const onChangefileUpload = () => {
        const files = attachmentInput.current.files;

        // 파일 배열이 비어 있지 않은지 확인
        if (files.length > 0) {
            const fileReaders = [];

            // 각 파일에 대해 FileReader를 만들기
            Array.from(files).forEach((file, index) => {
                const fileReader = new FileReader();

                fileReader.onload = (e) => {
                    const { result } = e.target;

                    // result가 null이 아닌지 확인
                    if (result) {
                        // 새 파일 정보로 selectedFiles 업데이트
                        setSelectedFiles((prevFiles) => [
                            ...prevFiles,
                            { name: file.name, file: file },
                        ]);
                    }
                };

                // 파일을 데이터 URL로 읽기
                fileReader.readAsDataURL(file);

                // 완료 시 FileReader 인스턴스를 정리하는 데 사용됩니다.
                fileReaders.push(fileReader);
            });

            // 읽기가 완료되면 FileReader 인스턴스 정리
            fileReaders.forEach((fileReader) => {
                fileReader.onloadend = () => {
                    fileReader.abort();
                };
            });
        }
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
        } else if (!form.letterBody) {
            toast.error("상세내용을 입력해주세요.")
            return;
        }

        /* 서버로 전달한 FormData 형태의 객체 설정 */
        const formData = new FormData();


        formData.append("letterRequest", new Blob([JSON.stringify({
            documentTitle: form.documentTitle,
            letterBody: form.letterBody,
            approvalLine: selectedMembers.map((member, index) => ({
                memberCode: member.memberCode,
                turn: index + 1,
            })),
            referenceLine: ReferenceSelectedMembers.map(member => member.memberCode),
            documentType: "품의서",
        })], { type: 'application/json' }));

        // 다중파일 처리
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append("attachment",  selectedFiles[i].file);
        }

        dispatch(callRegistLetterAPI({letterRequest : formData, navigate}));
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


    /* 로그인 정보 가져오기 */
     const {writer} = useSelector(state => state.approvalReducer);

    useEffect(() => {
        dispatch(callWriterInfoAPI());
    }, []);





    /* 첨부파일 버튼 css */
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });


    return (
        <>

            <div className="ReportTitle" >
                기안서 작성
            </div>

            <div className="letterContainer">
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

                <div className="letter-left">
                    <p
                        className="letterTitle"
                        name="documentType"
                        onChange={ onChangeHandler }
                        value="품의서"
                    >
                        품의서
                    </p>

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


                    <div className="loginUserProfile">

                        <p className="approval-profile">성함</p>
                        <p className="approval-profile-detail">{writer && writer.loginMember &&  writer.loginMember.infoName}</p>
                        <p className="approval-profile">부서</p>
                        <p className="approval-profile-detail">{writer && writer.loginMember && writer.loginMember.deptName}</p>
                        <p className="approval-profile">직급</p>
                        <p className="approval-profile-detail">{writer && writer.loginMember && writer.loginMember.jobName}</p>
                        <div className="letter-file">
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon/>}
                                    style={{width: 90, height: 43, marginLeft: 3}}>
                                파일 첨부
                                <VisuallyHiddenInput multiple type="file" formEncType="multipart/form-data" onChange={onChangefileUpload} ref={attachmentInput}/>
                            </Button>
                            {selectedFiles.length > 0 && (
                                <div className="letter-file-info">
                                    {selectedFiles.map((file, index) => (
                                        <div className="approval-files" key={index}>
                                            <FileCopyIcon style={{fontSize: 20, marginRight: 5}}/>
                                            {file.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="letter-mainTitle">
                        <p>제목</p>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '920px', margin: 'auto'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                multiline
                                ariant="filled"
                                label="제목 입력"
                                id="filled-multiline-static"
                                placeholder="제목을 입력하세요."
                                rows={1}
                                name="documentTitle"
                                onChange={onChangeHandler}
                                sx={{ backgroundColor : 'rgba(0,0,0,0.06)'}}
                            />
                        </Box>
                    </div>
                    <div className="letter-notice">
                        <p>품의 사유 및 상세내용</p>
                    </div>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '1000px', margin: 'auto'},
                        }}
                        noValidate
                        autoComplete="off"
                        >
                    <TextField
                        multiline
                        variant="filled"
                        label="품의 사유 및 상세 내용"
                        id="filled-multiline-static"
                        placeholder="상세 내용 입력"
                        rows={8}
                        name="letterBody"
                        onChange={onChangeHandler}
                    />
                    </Box>

                    <div className="letter-guide"> 위와 같은 품의 사유로, 검토 후 결재 바랍니다. </div>





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

export default Letter;