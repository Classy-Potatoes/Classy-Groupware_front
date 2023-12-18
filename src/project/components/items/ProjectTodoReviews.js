import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {callProjectInviteAPI} from "../../apis/ProjectAPICalls";
import {
    callProjectReplyDeleteAPI,
    callProjectReplyUpdateAPI,
    callProjectScheduleReplyRegistAPI, callProjectTodoReplyRegistAPI
} from "../../../calendar/apis/SecondProjectAPICalls";

function ProjectTodoReviews({projectCode, postSuccess, todo, memberId}) {

    const [modifyMode, setModifyMode] = useState(false);
    const [form, setForm] = useState({});
    const [modifyForm, setModifyForm] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callProjectInviteAPI({projectCode}));
        setModifyForm(prevState => {
            const updatedForm = { ...prevState };
            todo.replies.forEach(reply => {
                if (!updatedForm[reply.replyCode]) {
                    updatedForm[reply.replyCode] = {
                        replyBody: reply.replyBody || ""
                    };
                }
            });
            return updatedForm;
        });
    }, [todo, postSuccess]);

    useEffect(() => {
        if (postSuccess) {
            setForm({
                replyBody: ""
            })
        }
    }, [todo, postSuccess]);

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
            todoCode: todo.todoCode,
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

        dispatch(callProjectTodoReplyRegistAPI({
            registRequest: form,
            projectCode: projectCode,
            todoCode: todo.todoCode
        }));
    }

    return (
        <>
            {todo.replies && todo.replies.map(reply => (
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
                        {todo.infoCode === reply.infoCode && (
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

export default ProjectTodoReviews;