import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { callProjectPostRegistAPI } from "../../apis/ProjectPostAPICalls";
import DatePicker from "react-datepicker";
import {ko} from "date-fns/esm/locale";
import Select from 'react-select';
import {callProjectTaskRegistAPI} from "../../apis/ProjectTaskAPICalls";

function ProjectTaskWrite({ projectCode }) {

    const dispatch = useDispatch();
    const { postSuccess, projectMember } = useSelector((state) => state.projectReducer);
    const [fileUrl, setFileUrl] = useState('');
    const [attachedFiles, setAttachedFiles] = useState([]); // 첨부 파일 목록 추가
    const fileInput = useRef();
    const [form, setForm] = useState({
        projectCode
    });

    const [selectedMembers, setSelectedMembers] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [priorityOptions, setPriorityOptions] = useState(['낮음', '보통', '높음']);
    const [selectedPriority, setSelectedPriority] = useState('');
    // 참석자추가
    const [attendants, setAttendants] = useState([]);


    useEffect(() => {
        // Update projectCode in form when the prop changes
        setForm((prevForm) => ({
            ...prevForm,
            projectCode,
        }));
    }, [projectCode]);

    useEffect(() => {
        if (postSuccess === true) {
            window.location.reload();
        }
    }, [postSuccess]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    /* 파일 핸들러 */
    const onClickFileUpload = () => {
        fileInput.current.click();
    };

    const onChangeFileUpload = () => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            const { result } = e.target;
            if (result) {
                const newFileList = [
                    ...attachedFiles,
                    { name: fileInput.current.files[0].name, url: result },
                ];
                setAttachedFiles(newFileList);
            }
        };
        if (fileInput.current.files[0]) {
            fileReader.readAsDataURL(fileInput.current.files[0]);
        }
    };

    // 첨부 파일 목록에서 파일 취소
    const cancelAttachment = (index) => {
        const newAttachedFiles = [...attachedFiles];
        newAttachedFiles.splice(index, 1);
        setAttachedFiles(newAttachedFiles);
    };

    /* 등록 눌렀을때 핸들러 */
    const onClickPostRegistrationHandler = async () => {
        const formData = new FormData();

        // 첨부 파일 추가
        // formData.append("attachment", fileInput.current.files[0]);
        attachedFiles.forEach((file, index) => {
            formData.append('attachment[]', file); // 'attachment[]'로 수정
        });

        const taskRequest = {
            taskTitle: form.taskTitle,
            taskBody: form.taskBody,
            taskStartDate: startDate.toISOString().split('T')[0],
            taskEndDate: endDate.toISOString().split('T')[0],
            taskPriority: selectedPriority,
            projectCode: form.projectCode,
            projectManagers: attendants.map((attendant) => ({
                infoCode: attendant.value,
            })),
        };

        formData.append(
            "projecttaskRequest",
            new Blob([JSON.stringify(taskRequest)], { type: "application/json" })
        );

        try {
            // API 호출 시에는 FormData 전송
            await dispatch(callProjectTaskRegistAPI({ projecttaskRequest: formData }));

            // 등록 후 선택한 멤버 및 파일 초기화
            setSelectedMembers([]);
            setAttachedFiles([]);
        } catch (error) {
            console.error("API 호출 중 오류:", error);
        }
    };


    /* 우선순위 선택 핸들러 */
    const handlePriorityChange = (e) => {
        setSelectedPriority(e.target.value);
    };

    return (
        <>
            <div>
                <div>
                            <input
                                type="text"
                                name="taskTitle"
                                placeholder="제목을 입력하세요."
                                className="project-taskTitle-input"
                                onChange={onChangeHandler}
                            />
                </div>
                <div>
                            <input
                                type="text"
                                name="taskBody"
                                placeholder="내용을 입력하세요."
                                className="project-taskBody-input"
                                onChange={onChangeHandler}
                            />
                </div>

                <div className="task-middle">
                    <div className="task-request">
                         <img src="/project/요청.png" />
                         <p>요청</p>
                    </div>

                    <div className="task-manager">
                            {/* 담당자 이미지 */}
                            <img src="/project/담당자.png" />

                            {/* react-select을 사용한 다중 선택 셀렉트 박스 */}
                            <Select
                                placeholder="담당자 추가"
                                isMulti
                                options={projectMember.map((member) => ({
                                    value: member.infoCode,
                                    label: member.memberName,
                                }))}
                                value={attendants}
                                onChange={(selectedOptions) => {
                                    setAttendants(selectedOptions);
                                }}
                            />
                    </div>

                    <div>
                        <div className="task-date-label">
                            <img src="/project/calender-icon2.png" />
                            <label>시작 일시  </label>
                            <DatePicker
                                dateFormat='yyyy-MM-dd'
                                name="taskStartDate"
                                selected={startDate}
                                onChange={(date: Date) => setStartDate(date)}
                                selecetsStart
                                startDate={startDate}
                                endDate={endDate}
                                minDate={new Date()}
                                locale={ko}
                            />
                        </div>

                        <div className="task-date-label">
                            <img src="/project/calender-icon2.png" />
                            <label>마감 일시  </label>
                            <DatePicker
                                dateFormat='yyyy-MM-dd'
                                name="taskEndDate"
                                selected={endDate}
                                onChange={(date: Date) => setEndDate(date)}
                                selecetsStart
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                locale={ko}
                            />
                        </div>
                    </div>

                    <div className="task-priority">
                        <img src="/project/우선순위.png" />
                        <select
                            name="taskPriority"
                            onChange={handlePriorityChange}
                            value={selectedPriority}
                        >
                            <option value="" disabled>
                                우선순위 선택
                            </option>
                            {priorityOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
            </div>

            <div className="project-post-button">
                <div>
                    {attachedFiles.length > 0 && (
                        <div>
                            첨부 파일:
                            {attachedFiles.map((file, index) => (
                                <span key={index}>
                    {file.name}
                                    <button
                                        className="attachment-cencel"
                                        onClick={() => cancelAttachment(index)}
                                    >X</button>
                                    &nbsp;
                </span>
                            ))}
                        </div>
                    )}
                    <input
                        style={{ display: 'none' }}
                        type="file"
                        name="attachment"
                        accept="image/jpg,image/png,image/jpeg,image/gif, txt"
                        ref={fileInput}
                        onChange={onChangeFileUpload}
                    />
                    <button
                        className="project-post-button"
                        onClick={onClickFileUpload}
                    >
                        <img src="/project/attem.png" alt="attach" />
                    </button>
                </div>

                <button
                    className="project-postregist-button"
                    onClick={onClickPostRegistrationHandler}
                >
                    등록
                </button>
            </div>
        </>
    );
}

export default ProjectTaskWrite;