import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callProjectInviteAPI} from "../../apis/ProjectAPICalls";
import {
    callProjectReplyDeleteAPI,
    callProjectReplyUpdateAPI,
    callProjectScheduleReplyRegistAPI
} from "../../../calendar/apis/SecondProjectAPICalls";
import {callProjectTaskListAPI} from "../../apis/ProjectTaskAPICalls";

function ProjectScheduleReviews({postSuccess, projectCode, schedule, memberId}) {


    console.log(schedule , "111")
    const [modifyMode, setModifyMode] = useState(false);
    const [form, setForm] = useState({});
    const [modifyForm, setModifyForm] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        setModifyForm(prevState => {
            const updatedForm = { ...prevState };
            schedule.replies.forEach(reply => {
                if (!updatedForm[reply.replyCode]) {
                    updatedForm[reply.replyCode] = {
                        replyBody: reply.replyBody || ""
                    };
                }
            });
            return updatedForm;
        });
    }, [postSuccess]);

    useEffect(() => {
        if (postSuccess) {
            setForm({
                replyBody: ""
            })
        }
    }, [postSuccess]);

    const onModifyChangeHandler = (e, replyCode) => {
        const {name, value} = e.target;

        setModifyForm(prevState => ({
            ...prevState,
            [replyCode]: {
                ...prevState[replyCode],
                [name]: value
            }
        }));
    };

    const clickedModiSender = (e) => {
        const replyCode = e.target.value;
        const replyBody = modifyForm[replyCode];

        dispatch(callProjectReplyUpdateAPI({
            projectCode: projectCode,
            scheduleCode: schedule.scheduleCode,
            replyCode: replyCode,
            registRequest: replyBody
        }));
    }

    const clickedDelete = (e) => {
        const replyCode = e.target.value;

        dispatch(callProjectReplyDeleteAPI({replyCode: replyCode}))
    }

    const onChangeHandler = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const clickedRegist = () => {

        dispatch(callProjectScheduleReplyRegistAPI({
            registRequest: form,
            projectCode: projectCode,
            scheduleCode: schedule.scheduleCode
        }));
    }

    return (
        <>
            {schedule.replies && schedule.replies.map(reply => (
                <>
                    <div className="sch-review-box" key={reply.replyCode}>
                        <img id="sch-review-img" className="sch-manager-img" src="/project/담당자.png"/>
                        <div className="sch-rev-name">{reply.memberName}</div>
                        <div className="sch-rev-body">
                            <label htmlFor="sch-reivew-write" className="col-form-label"></label>
                            <input type="text"
                                   className="sch-review-body"
                                   id={`sch-reivew-write-${reply.replyCode}`}
                                   name="replyBody"
                                   onChange={(e) => onModifyChangeHandler(e, reply.replyCode)}
                                   // placeholder={
                                   //     reply.replyBody
                                   // }
                                   value={modifyMode ? (modifyForm[reply.replyCode] ? modifyForm[reply.replyCode].replyBody : reply.replyBody) : reply.replyBody}
                                   maxLength={20}
                                   readOnly={!modifyMode}
                            />
                        </div>
                        <div className="sch-rev-created">{reply.replyModifyDate.split('T')[0]}</div>
                        {schedule.infoCode === reply.infoCode && (
                            <div className="sch-rev-stat-box">
                                <div className="sch-rev-modify-box">
                                    {!modifyMode &&
                                        <button value={reply.replyCode} onClick={() => setModifyMode(true)}>수정</button>
                                    }
                                    {modifyMode &&
                                        <button value={reply.replyCode} onClick={clickedModiSender}>등록</button>
                                    }
                                </div>
                                <div className="sch-rev-deleted-box">
                                    {!modifyMode &&
                                        <button value={reply.replyCode} onClick={clickedDelete}>삭제</button>
                                    }
                                    {modifyMode &&
                                        <button value={reply.replyCode} onClick={() => setModifyMode(false)}>취소</button>
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                </>
            ))
            }
            <div className="sch-write-box">
                <img id="sch-review-img" className="sch-manager-img" src="/project/담당자.png"/>
                <div className="sch-write-area">
                    <label htmlFor="sch-reivew-write" className="col-form-label"></label>
                    <input type="text"
                           className="sch-review-regist-area"
                           id="sch-reivew-write"
                           name="replyBody"
                           onChange={onChangeHandler}
                           placeholder={
                               "댓글을 입력하세요."
                           }
                           value={form.replyBody}
                           maxLength={20}
                           readOnly={modifyMode}
                    />
                </div>
                <div className="sch-review-regist">
                    <button onClick={clickedRegist} className="sch-review-btn">등록</button>
                </div>
            </div>
        </>
    )
        ;
}

export default ProjectScheduleReviews;