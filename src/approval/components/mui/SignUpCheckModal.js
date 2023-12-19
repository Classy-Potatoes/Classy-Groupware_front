import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import '../../../style/approval/SignCheckModal.css';
import {FormControlLabel, FormLabel, Radio, RadioGroup, TextareaAutosize, TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import SendIcon from "@mui/icons-material/Send";
import {useDispatch} from "react-redux";
import {callSignupAPI} from "../../../member/apis/MemberAPICalls";
import {useNavigate} from "react-router-dom";
import {callReportSingUpAPI, callSingUpAPI} from "../../apis/SignAPICalls";
import {toast, ToastContainer} from "react-toastify";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "500px",
    height: "300px",
    bgcolor: 'background.paper',
    border: '7px solid #333333',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
};

export default function SignUpCheckModal({approvalCode}) {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('승인');
    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const onClickRegisterHandler = () => {
        const resultData = {
            approvalLineResult: value,
            approvalTurnbackReason: setForm
        };
        try {
        dispatch(callReportSingUpAPI({ signRequest: resultData, navigate, approvalCode }));

        toast.success('결재 완료 되었습니다.',{
            position: toast.POSITION.TOP_CENTER,
            onClose: () => {
                navigate('/approval/sign-waiting');
            }
        });

        } catch (error) {
            toast.error('작성 중 오류가 발생했습니다.')
        }

    };

    /* 취소 버튼 */
    const onClickCancelHandler = () => {
        handleClose();
    };






    return (
        <div>

            <Button onClick={handleOpen}
                    color="success"
                    variant="contained"
                    style={{width: '150px', height: '50px', fontWeight: 'bolder'}}>결재하기</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="approvalLine-modal-title-sign">
                        결재 여부
                    </div>
                    <div className="approval-check">

                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                sx={{display:'flex' , flexDirection: 'row', padding : '30px' , justifyItems: 'center', position:'relative', left:'15px'}}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            >
                                <FormControlLabel value="APPROVE" control={<Radio />} label="승인" sx={{ width:'100px'}}/>
                                <FormControlLabel value="TURNBACK" control={<Radio />} label="반려" sx={{ width:'100px'}}/>
                            </RadioGroup>
                        </FormControl>

                    </div>

                    <div className="modal-cancel-sand-btn-signModal">
                        <Button variant="contained" onClick={onClickCancelHandler} sx={{marginRight: '20px'}}>취소</Button>
                        <Button variant="contained" onClick={onClickRegisterHandler} className="Modal-sendBtn" endIcon={<SendIcon />}>결재</Button>
                    </div>
                </Box>
            </Modal>


        </div>
    );
}