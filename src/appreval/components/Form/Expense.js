import '../../../style/approval/Expense.css'
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import {styled} from "@mui/material/styles";
import ReferenceLineModal from "../mui/ReferenceLineModal";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import {
    Box,
    FormControlLabel, Input, Paper,
    Radio,
    RadioGroup,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import BasicModal from "../mui/approvalLineModal";
import SendIcon from "@mui/icons-material/Send";
import {callRegistExpenseAPI, callWriterInfoAPI} from "../../apis/RegistDocumentAPICalls";
import FormControl from "@mui/material/FormControl";
import {useNavigate} from "react-router-dom";


function Expense() {
    /* 총 금액  */
    const [totalAmount, setTotalAmount] = useState(0);
    /* 지출결의서 안의 내용들 */
    const [data, setData] = useState([]);
    /* 개인, 법인 결재 구분 */
    const [value, setValue] = useState('법인');
    const [form, setForm] = useState({});
    /* 모달창에 입력한 결재선 가져오기 */
    const [selectedMembers, setSelectedMembers] = useState([]);
    /* 모달창에 입력한 참조선 가져오기 */
    const [ReferenceSelectedMembers, setReferenceSelectedMembers] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    /* 첨부파일 ref로 참조시키기 */
    const attachmentInput = useRef();
    const dispatch = useDispatch();
    /* 로그인 정보 가져오기 */
    const {writer} = useSelector(state => state.approvalReducer);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(callWriterInfoAPI())
    }, []);

    /* 서버로 보내기 */

    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const onChangefileUpload = () => {
        const files = attachmentInput.current.files;

        // 파일 배열이 비어 있지 않은지 확인
        if (files.length > 0) {
            const fileReaders = [];

            // 각 파일에 대해 FileReader를 만들기
            Array.from(files).forEach((file, index) => {
                const fileReader = new FileReader();

                fileReader.onload = (e) => {
                    const {result} = e.target;

                    // result가 null이 아닌지 확인
                    if (result) {
                        // 새 파일 정보로 selectedFiles 업데이트
                        setSelectedFiles((prevFiles) => [
                            ...prevFiles,
                            {name: file.name, file: file},
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


    /* 테이블(expenseDetail) 데이터 가져오기 */
    const expenseDetails = data.map(row => ({
        expenseAccount: row.account,
        expenseDate: row.date,
        expensePrice: row.price,
        expenseBriefs: row.briefs
    }));

    /* 테이블 빈 공간 방지 유효성 검사 */
    const isTableDataValid = () => {
        const tableValid = data.some(row => Object.values(row).some(value => value === ''));

        if (tableValid) {
            toast.error("지출내역을 모두 입력해주세요.");
            return false;
        }

        return true;
    };

    /* 서버로 보내기 */
    const onClickCompletedHandler = () => {
        /* 유효성 검사 */
         if (!selectedMembers.length) {
             toast.error("결재선 지정이 필요합니다.")
             return;
         } else if (!form.documentTitle) {
             toast.error("제목을 입력해주세요.")
             return;
         } else if (!isTableDataValid()) {
             return;
         }

        /* 서버로 전달한 FormData 형태의 객체 설정 */
        const formData = new FormData();

        formData.append("expenseRequest", new Blob([JSON.stringify({
            documentTitle: form.documentTitle,
            expenseNote: form.expenseNote,
            approvalLine: selectedMembers.map((member, index) => ({
                memberCode: member.memberCode,
                turn: index + 1,
            })),
            referenceLine: ReferenceSelectedMembers.map(member => member.memberCode),
            documentType: "지출결의서",
            expenseStatus: value,
            expenseDetails: expenseDetails,

        })], {type: 'application/json'}));

        // 다중파일 처리
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append("attachment",  selectedFiles[i].file);
        }

        dispatch(callRegistExpenseAPI({expenseRequest: formData , navigate}));
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

    /* 총 금액 */
    const calculateTotalAmount = () => {
        const sum = data.reduce((accumulator, row) => {
            return accumulator + row.price;
        }, 0);
        setTotalAmount(sum);
    };

    useEffect(() => {
        calculateTotalAmount();
    }, [data]);




    // 지출결의서 상세 행 추가
    const handleAddRow = () => {
        const newRow = { id: data.length + 1, account: '', date: '', price: 0, briefs: '' };
        setData([...data, newRow]);
    };
    // 지출결의서 상세 행 삭제
    const handleDeleteRow = (id) => {
        const updatedData = data.filter(row => row.id !== id);
        setData(updatedData);
    };

    /* date 서버 형식에 맞게 포맷*/
    const formatDate = (date) => {
        if (!date) return ''; // Handle the case where date is null or undefined
        const formattedDate = new Date(date).toISOString().split('T')[0];
        return formattedDate;
    };
    // 서버로 보내기 전 가공
    const handleCellChange = (id, key, value) => {
            const sanitizedValue = value.replace(/,/g, ''); // 콤마 제거
            const parsedValue = sanitizedValue.trim() === '' || isNaN(sanitizedValue) ? 0 : parseInt(sanitizedValue, 10);
            const updatedData = data.map(row => (row.id === id ? {
                ...row,
                [key]: key === 'price' ? parsedValue : value
            } : row));
            setData(updatedData);
            calculateTotalAmount();

        };


   // 숫자에 콤마를 추가하는 함수
    const addCommas = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };


        return (
            <>

                <div className="ReportTitle">
                    기안서 작성
                </div>

                <div className="expenseContainer">
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

                    <div className="expense-left">
                        <p
                            className="expenseTitle"
                            name="documentType"
                            onChange={onChangeHandler}
                            value="지출결의서"
                        >
                            지출결의서
                        </p>

                        <div className="referenceMember-Div">
                            <div className="referenceMemberTitle-Button">
                                <p>수신 참조자</p>
                                {writer &&
                                    <ReferenceLineModal className="approvalLineButton" writer={writer}
                                                        onRegisterClick={handleRegisterClick_reference}/>
                                }
                            </div>
                            <div className="referenceMember">
                                {ReferenceSelectedMembers.map((selectedMember, index) => (
                                    <div key={index} className="referenceLine-pickMemberInfo-div">
                                        {selectedMember && selectedMember.infoName}
                                    </div>
                                ))}
                            </div>

                        </div>


                        <div className="expense-loginUserProfile">

                            <p className="approval-profile">성함</p>
                            <p className="approval-profile-detail">{writer && writer.loginMember && writer.loginMember.infoName}</p>
                            <p className="approval-profile">부서</p>
                            <p className="approval-profile-detail">{writer && writer.loginMember && writer.loginMember.deptName}</p>
                            <p className="approval-profile">직급</p>
                            <p className="approval-profile-detail">{writer && writer.loginMember && writer.loginMember.jobName}</p>
                            <div className="expense-file">
                                <Button component="label" variant="contained" startIcon={<CloudUploadIcon/>}
                                        style={{width: 90, height: 43, marginLeft: 3}}>
                                    파일 첨부
                                    <VisuallyHiddenInput multiple type="file" formEncType="multipart/form-data" onChange={onChangefileUpload}
                                                         ref={attachmentInput}/>
                                </Button>
                                {selectedFiles.length > 0 && (
                                    <div className="expense-file-info">
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

                        <div className="expense-maintitle-status">
                            <div className="expense-mainTitle">
                                <p>제목</p>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': {
                                            m: 1,
                                            width: '440px',
                                            margin: 'auto',
                                            borderBottom: '1px solid black',
                                            backgroundColor: 'rgba(0,0,0,0.06)'
                                        },
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
                                    />
                                </Box>
                            </div>
                            <div className="expense-status">
                                <div className="expenseStatus-title">
                                    <p>결제 구분</p>
                                </div>
                                <div className="expense-radio">
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            value={value}
                                            onChange={handleChange}
                                            sx={{display: 'flex', flexDirection: 'row'}}
                                        >
                                            <FormControlLabel value="법인" control={<Radio/>} label="법인"/>
                                            <FormControlLabel value="개인" control={<Radio/>} label="개인"/>
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>

                        </div>


                                <div>
                                    <TableContainer component={Paper} sx={{ width: '997px', overflow: 'auto', height: '300px', fontFamily: 'Noto Sans' }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{fontSize: '15px', fontWeight: 'bold'}}>계정과목</TableCell>
                                                    <TableCell sx={{fontSize: '15px', fontWeight: 'bold'}}>지출일자</TableCell>
                                                    <TableCell sx={{fontSize: '15px', fontWeight: 'bold'}}>금액</TableCell>
                                                    <TableCell sx={{fontSize: '15px', fontWeight: 'bold'}}>적요</TableCell>
                                                    <TableCell>{""}</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {data.map(row => (
                                                    <TableRow key={row.id}>
                                                        <TableCell>
                                                            <Input
                                                                value={row.account}
                                                                onChange={(e) => handleCellChange(row.id, 'account', e.target.value)}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Input
                                                                type="date"
                                                                value={formatDate(row.date)}
                                                                onChange={(e) => handleCellChange(row.id, 'date', e.target.value)}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Input
                                                                type="text"
                                                                value={addCommas(row.price)}
                                                                onChange={(e) => handleCellChange(row.id, 'price', e.target.value)}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Input
                                                                value={row.briefs}
                                                                onChange={(e) => handleCellChange(row.id, 'briefs', e.target.value)}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button onClick={() => handleDeleteRow(row.id)} variant="outlined" color="error">
                                                                삭제
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    <Button onClick={handleAddRow} variant="outlined" color="primary" sx={{width: '200px'}}>
                                        행 추가
                                    </Button>
                                    </TableContainer>
                                        <div className="expense-totalAmount">총 금액 : {addCommas(totalAmount)+ "원"}</div>


                                </div>





                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': {m: 1, width: '997px', margin: 'auto'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                multiline
                                variant="filled"
                                id="filled-multiline-static"
                                placeholder="비고"
                                rows={1}
                                name="expenseNote"
                                onChange={onChangeHandler}
                                sx={{
                                    backgroundColor : 'white',
                                    borderTop : '1px solid black',
                            }}
                            />
                        </Box>

                        <div className="expense-guide"> 위 금액을 청구하오니 결재 바랍니다.</div>


                    </div>

                    <div className="approvalLineDiv">
                        <p>결재선</p>
                        {writer &&
                            <BasicModal className="approvalLineButton" writer={writer}
                                        onRegisterClick={handleRegisterClick_approval}/>
                        }
                    </div>
                    <div className="approvalLine">
                        {selectedMembers.map((selectedMember, index) => (
                            <div key={index} className="approvalLine-selectMember-div">
                                {selectedMember && selectedMember.infoName}
                            </div>
                        ))}
                    </div>

                </div>
                <div className="approval-completeBtn">
                    <Button variant="contained" endIcon={<SendIcon/>} onClick={onClickCompletedHandler}>
                        작성 완료
                    </Button>
                </div>


            </>
        );
    }

    export default Expense;