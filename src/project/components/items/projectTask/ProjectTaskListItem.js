import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useState} from "react";
import {
    callProjectTaskCheckAPI,
    callProjectTaskDeleteAPI,
    callProjectTaskModifyAPI,
    callProjectTaskReplyRegistAPI
} from "../../../apis/ProjectTaskAPICalls";
import ProjectTaskReplyList from "../../lists/ProjectTask/ProjectTaskReplyList";
import {toast} from "react-toastify";
import DatePicker from "react-datepicker";
import {ko} from 'date-fns/esm/locale';
import Select from "react-select";

function ProjectTaskListItem({projectTask}) {

    const dispatch = useDispatch();
    const [form, setForm] = useState({});
    const [modifyMode, setModifyMode] = useState(false);
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
    /* 날짜 */
    const [startDate, setStartDate] = useState(new Date(projectTask.taskStartDate));
    const [endDate, setEndDate] = useState(new Date(projectTask.taskEndDate));
    /* 우선 순위 */
    const [priorityOptions, setPriorityOptions] = useState(['낮음', '보통', '높음']);
    const [selectedPriority, setSelectedPriority] = useState('');
    // 참석자추가
    const [attendants, setAttendants] = useState([]);
    const {projectMember} = useSelector((state) => state.projectReducer);


    const {taskCode} = projectTask;

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    /* 수정 모드로 변환하는 이벤트 */
    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({...projectTask});
    }

    /* 업무 수정 요청하는 이벤트 */
    const onClickProjectPostUpdateHandler = () => {

        const newForm = {
            ...form,
            taskStartDate: startDate.toISOString(),
            taskEndDate: endDate.toISOString(),
            taskPriority: selectedPriority,
            projectManagers: attendants.map((attendant) => ({
                infoCode: attendant.value,
            })),
        };
        dispatch(callProjectTaskModifyAPI({taskCode, TaskUpdateRequest: newForm}))
            .then((response) => {
                toast.info("글 수정 완료 되었습니다.",);
            });
    };


    /* 프로젝트 업무 삭제 모달 창 */
    const onClickPostDeleteHandler = () => {
        setConfirmDeleteModal(true);
    };

    /* 업무 삭제 */
    const confirmDelete = () => {

        dispatch(callProjectTaskDeleteAPI({taskCode}));
        setConfirmDeleteModal(false);
    };

    const cancelDelete = () => {
        setConfirmDeleteModal(false);
    };

    /* 댓글 작성 */
    const onClickTaskReplyRegistHandler = () => {
        const newForm = {
            ...form,
            taskCode
        };

        dispatch(callProjectTaskReplyRegistAPI({replyCreateRequest: newForm}));
    };


    const inputStyle = !modifyMode ? {border: 0, background: 'none', color: 'black'} : null;

    /* 파일 다운로드 */
    const onClickImgLink = useCallback((srcUrl: string, name: string) => {
        fetch(srcUrl, {method: 'GET'}).then((res) => res.blob()).then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            setTimeout((_) => {
                window.URL.revokeObjectURL(url);
            }, 1000);
            a.remove();
        }).catch((err) => {
            console.error('err', err);
        });
    }, []);

    /* 업무 확인 */
    const onClickTaskCheckHandler = () => {

        const newForm = {
            taskStatus: "진행"
        };
        dispatch(callProjectTaskCheckAPI({taskCode, taskCheckRequest: newForm}));
        toast.info("업무 확인 했습니다.");
    }

    /* 업무 보류 */
    const onClickTaskHoldHandler = () => {

        const newForm = {
            taskStatus: "보류"
        };
        dispatch(callProjectTaskCheckAPI({taskCode, taskCheckRequest: newForm}));
        toast.info("업무 보류 했습니다.");
    }

    /* 업무 완료 */
    const onClickTaskCompleteHandler = () => {

        const newForm = {
            taskStatus: "완료"
        };
        dispatch(callProjectTaskCheckAPI({taskCode, taskCheckRequest: newForm}));
        toast.info("업무 완료 했습니다.");
    }

    /* 우선순위 선택 핸들러 */
    const handlePriorityChange = (e) => {
        setSelectedPriority(e.target.value);
    };

    return (
        <>
        {confirmDeleteModal && (
            <div className="confirm-delete-modal">
                <p>정말 삭제하시겠습니까?</p>
                <button className="confirm-delete-modal-button" onClick={confirmDelete}>확인</button>
                <button onClick={cancelDelete}>취소</button>
            </div>
        )}
        <div className="project-post-item-div">

            <div className="project-task-title">
                <label>제목 : </label>
                <input
                    name="taskTitle"
                    placeholder="게시글 제목"
                    value={modifyMode ? form.taskTitle : projectTask.taskTitle}
                    disabled={!modifyMode}
                    style={inputStyle}
                    onChange={onChangeHandler}
                />

                <div className="project-task-name">
                    <span>{projectTask.memberName}</span> <br/>
                    {projectTask.taskRequestDate}
                </div>
                <div>
                    {projectTask.memberCode === projectTask.customUser.infoCode && (
                        <div className="project-postList-button">
                            {!modifyMode &&
                                <button
                                    onClick={onClickModifyModeHandler}
                                >수정
                                </button>
                            }
                            {modifyMode &&
                                <button
                                    onClick={onClickProjectPostUpdateHandler}
                                >
                                    수정완료
                                </button>
                            }
                            <button
                                onClick={onClickPostDeleteHandler}
                            >
                                삭제
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="project-task-request">
                <img src="/project/요청.png"/>
                <span>{projectTask.taskStatus}</span>
                {projectTask.managers.some(manager => manager.memberCode === projectTask.customUser.infoCode) && (
                    <>
                        {(projectTask.taskStatus === '요청' || projectTask.taskStatus === '보류') && (
                            <button onClick={onClickTaskCheckHandler}>확인하기</button>
                        )}
                        {projectTask.taskStatus === '요청' && (
                            <button onClick={onClickTaskHoldHandler}>보류하기</button>
                        )}
                        {projectTask.taskStatus === '진행' && (
                            <button onClick={onClickTaskCompleteHandler}>완료하기</button>
                        )}
                    </>
                )}
            </div>

            <div className="project-task-info">
                <img src="/project/담당자.png"/>
                {/*{modifyMode ? (*/}
                {/*    <Select*/}
                {/*        placeholder="담당자 추가"*/}
                {/*        isMulti*/}
                {/*        options={projectMember.map((member) => ({*/}
                {/*            value: member.infoCode,*/}
                {/*            label: member.memberName,*/}
                {/*        }))}*/}
                {/*        value={attendants}*/}
                {/*        onChange={(selectedOptions) => {*/}
                {/*            setAttendants(selectedOptions);*/}
                {/*        }}*/}
                {/*    />*/}
                {/*) : (*/}
                {/*    <>*/}
                {/*        {projectTask.managers &&*/}
                {/*            projectTask.managers.map((manager, index) => (*/}
                {/*                <span key={index}>*/}
                {/*                    {manager.memberName} /!* manager 객체에서 원하는 필드를 선택 *!/*/}
                {/*                    {index < projectTask.managers.length - 1 && ", "} /!* 쉼표 추가 (마지막 요소 제외) *!/*/}
                {/*                </span>*/}
                {/*            ))}*/}
                {/*    </>*/}
                {/*)}*/}

                {modifyMode ? (
                    <Select
                        placeholder="담당자 추가"
                        isMulti
                        options={projectMember.map((member) => ({
                            value: member.infoCode,
                            label: member.memberName,
                        }))}
                        value={projectTask.managers.map((manager) => ({
                            value: manager.infoCode,
                            label: manager.memberName,
                        }))}
                        onChange={(selectedOptions) => {
                            setAttendants(selectedOptions);
                        }}
                    />
                ) : (
                    <>
                        {projectTask.managers &&
                            projectTask.managers.map((manager, index) => (
                            <span key={index}>
                             {manager.memberName} {/* manager 객체에서 원하는 필드를 선택 */}
                                    {index < projectTask.managers.length - 1 && ", "} {/* 쉼표 추가 (마지막 요소 제외) */}
                             </span>
                            ))}
                    </>
                )}

        </div>

        <div className="project-task-info">
            <img src="/project/calender-icon2.png"/>
            {/*<span>{projectTask.taskStartDate} ~ {projectTask.taskEndDate}</span>*/}
            <div>
                {modifyMode ? (
                    <>
                        <DatePicker
                            dateFormat='yyyy-MM-dd'
                            name="taskStartDate"
                            selected={startDate}
                            onChange={(date: Date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            minDate={new Date()}
                            locale={ko}
                        />
                        ~
                        <DatePicker
                            dateFormat='yyyy-MM-dd'
                            name="taskEndDate"
                            selected={endDate}
                            onChange={(date: Date) => setEndDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            locale={ko}
                        />
                    </>
                ) : (
                    <>
                        <span>{projectTask.taskStartDate}</span>
                        {' ~ '}
                        <span>{projectTask.taskEndDate}</span>
                    </>
                )}
            </div>
        </div>

        <div className="project-task-info">
            <img src="/project/우선순위.png"/>

            {modifyMode ? (
                <select
                    name="taskPriority"
                    onChange={handlePriorityChange}
                    value={projectTask.taskPriority}
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
            ) : (
                <span>{projectTask.taskPriority}</span>
            )}
        </div>

        <div className="project-task-Body">
                    <textarea
                        name="taskBody"
                        placeholder="게시글 내용"
                        value={modifyMode ? form.taskBody : projectTask.taskBody}
                        disabled={!modifyMode}
                        style={inputStyle}
                        onChange={onChangeHandler}
                    />
        </div>

        <div className="project-post-file">
            <label>첨부파일 : </label>
            {projectTask.files && projectTask.files.map(({fileName, filePathName}) => (
                <div
                    key={fileName}
                    onClick={() => onClickImgLink({filePathName}, fileName)}
                >
                    <div className="fileNameButton">{fileName}</div>
                </div>
            ))}
        </div>
        <div>
            <ProjectTaskReplyList projectTask={projectTask} reply={projectTask.replies}/>
        </div>

        <div className="reply-regist">
            <img src="/project/담당자.png" alt="Profile"/>
            <input
                className="reply-regist-input"
                type="text"
                name="replyBody"
                placeholder="댓글을 입력하세요."
                onChange={onChangeHandler}
            />
            <button onClick={onClickTaskReplyRegistHandler}>등록</button>
        </div>
        </div>
</>
)
    ;
}

export default ProjectTaskListItem;