import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callProjectPostRegistAPI } from "../../apis/ProjectPostAPICalls";
import ProjectPostList from "../../components/lists/ProjectPostList";

function ProjectPostWrite({projectCode}) {

    const dispatch = useDispatch();
    const { postSuccess } = useSelector((state) => state.projectReducer);
    const [fileUrl, setFileUrl] = useState('');
    const [attachedFiles, setAttachedFiles] = useState([]); // 첨부 파일 목록 추가
    const fileInput = useRef();
    const [form, setForm] = useState({
        projectCode,
        postTitle: '',
        postBody: '',
    });


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

    const onClickPostRegistrationHandler = () => {

        const formData = new FormData();
        formData.append("attachment", fileInput.current.files[0]);
        formData.append(
            "projectPostRequest",
            new Blob([JSON.stringify(form)], { type: "application/json" })
        );
        dispatch(callProjectPostRegistAPI({ projectPostRequest: formData }));
        console.log("formData", form);
    };


    return (
        <>
            <div>
                <table>

                    <tbody>
                    <tr>
                        <td>
                            <input
                                type="text"
                                name="postTitle"
                                placeholder="제목을 입력하세요."
                                className="project-postTitle-input"
                                onChange={onChangeHandler}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="text"
                                name="postBody"
                                placeholder="내용을 입력하세요."
                                className="project-postBody-input"
                                onChange={onChangeHandler}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
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
                            ref={fileInput}
                            onChange={onChangeFileUpload}
                            multiple
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

export default ProjectPostWrite;