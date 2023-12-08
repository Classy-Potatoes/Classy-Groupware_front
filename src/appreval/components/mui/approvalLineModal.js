import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AllMember from "../items/AllMember";
import '../../../style/approval/ApprovalLineModal.css';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {useState} from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "600px",
    height: "800px",
    bgcolor: 'background.paper',
    border: '7px solid #333333',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

export default function BasicModal({writer, onRegisterClick}) {
    const [open, setOpen] = useState(false);
    const [searchMember, setSearchMember] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [selectedMembers, setSelectedMembers] = useState([]);

    /* 검색 기능 */
    const handleSearchChange = (event) => {
        setSearchMember(event.target.value);
    };

    const filteredMembers = writer.memberList.filter((member) =>
        member.infoName.toLowerCase().includes(searchMember.toLowerCase())
    );

    const handleSelectMember = (memberCode) => {

        if (!selectedMembers.includes(memberCode)) {

            if (selectedMembers.length < 5) {
                setSelectedMembers((prevSelected) => [...prevSelected, memberCode]);
            } else {

                console.warn('You can only select up to 5 members.');
            }
        }
    };

    const handleRemoveMember = (index) => {
        const newSelectedMembers = [...selectedMembers];
        newSelectedMembers.splice(index, 1);
        setSelectedMembers(newSelectedMembers);
    };

    const pickMembers = () => {
            return selectedMembers.map((memberCode) =>
                writer.memberList.find((member) => member.memberCode === memberCode)
    );
    }

    /* 결재자 드래그 앤 드롭 */
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedMembers = [...selectedMembers];
        const [removed] = reorderedMembers.splice(result.source.index, 1);
        reorderedMembers.splice(result.destination.index, 0, removed);

        setSelectedMembers(reorderedMembers);
    };

    /* 취소 버튼 */
    const onClickCancelHandler = () => {
        handleClose();
    };

    const onClickRegisterHandler = () => {
          selectedMembers.map((memberCode) =>
            writer.memberList.find((member) => member.memberCode === memberCode)
        )



        onRegisterClick(selectedMembers);
        handleClose();
        console.log("selectedMembers", selectedMembers)

    };




    return (
        <div>
            <Button onClick={handleOpen}
                    style={{width: '30px', height: '30px', backgroundColor: '#2B456D', color: "white", lineHeight: '30px', fontWeight: 'bolder'}}>추가</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="approvalLine-modal-title">
                        결재자 선택
                    </div>
                    <div className="approvalLine-searchInput-memberList-div">
                        <input
                            className="approvalLine-searchInput"
                            type="text"
                            placeholder="이름으로 검색"
                            value={searchMember}
                            onChange={handleSearchChange}
                        />

                        <div className="approvalLine-memberList">
                            {filteredMembers.map((member) => (
                                <AllMember
                                    key={member.memberCode}
                                    member={member}
                                    onSelect={() => handleSelectMember(member.memberCode)}
                                    isSelected={selectedMembers.includes(member.memberCode)}
                                />
                            ))}
                        </div>
                    </div>
                    <span className="approvalLine-pickMember-guide">*드래그로 순서를 지정해주세요.</span>
                    <div className="approvalLine-pickMember">
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="selectedMembers">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="approvalLine-selectMember"
                                    >
                                        {pickMembers().map((selectedMember, index) => (
                                            <Draggable key={`${selectedMember.memberCode}-${selectedMember.infoName}`}
                                                       draggableId={`${selectedMember.memberCode}-${selectedMember.infoName}`} index={index}>
                                                {(provided,snapshot ) => (
                                                    <div
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                        className={`approvalLineNum ${snapshot.isDragging ? 'dragging' : ''}`}
                                                        style={{
                                                            ...provided.draggableProps.style,
                                                            position: 'inherit',

                                                        }}
                                                    >
                                                            <div className="approvalLineNum-num">{index + 1}번 순서</div>
                                                            <div className="approvalLineNum-deptName">{selectedMember.deptName}</div>
                                                            <div className="approvalLineNum-jobName">{selectedMember.jobName}</div>
                                                            <div className="approvalLineNum-infoName">{selectedMember.infoName}</div>
                                                            <div className="approvalLineNum-deleteBtn"><IconButton  aria-label="delete"  onClick={() => handleRemoveMember(index)}><DeleteIcon /></IconButton></div>

                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                    <div className="modal-cancel-sand-btn">
                    <Button variant="contained" onClick={onClickCancelHandler} sx={{marginRight: '20px'}}>취소</Button>
                    <Button variant="contained" onClick={onClickRegisterHandler} className="Modal-sendBtn" endIcon={<SendIcon />}>등록</Button>
                    </div>
                </Box>
            </Modal>
        </div>
);
}