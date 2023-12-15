import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callProjectPostRegistAPI} from "../../apis/ProjectPostAPICalls";
import {toast} from "react-toastify";

function ProjectPostWrite({projectCode}) {

    const dispatch = useDispatch();
    const {postSuccess} = useSelector((state) => state.projectPostReducer);
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
            const {result} = e.target;
            if (result) {
                const newFileList = [
                    ...attachedFiles,
                    {name: fileInput.current.files[0].name, url: result},
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

    /* 글 작성 버튼 핸들러 */
    const onClickPostRegistrationHandler = () => {

        // 필수 필드가 입력되었는지 확인
        if (!form.postTitle || !form.postBody) {
            // 불완전한 양식에 대한 토스트 메시지 표시
            toast.info("제목과 내용을 모두 입력해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("attachment", fileInput.current.files[0]);
        formData.append(
            "projectPostRequest",
            new Blob([JSON.stringify(form)], {type: "application/json"})
        );
        dispatch(callProjectPostRegistAPI({projectPostRequest: formData}));

        toast.success("게시글 등록이 완료되었습니다.")
    };

    // useEffect를 사용하여 한 번만 등록하도록 함
    useEffect(() => {
        // fileInput이 정의되어 있고 onChangeFileUpload 함수가 등록되어 있지 않으면 등록
        const handleFileChange = () => onChangeFileUpload();

        if (fileInput.current && !fileInput.current.onchange) {
            fileInput.current.onchange = handleFileChange;
        }

        // 컴포넌트가 언마운트될 때 이벤트 리스너 정리
        return () => {
            if (fileInput.current && fileInput.current.onchange) {
                fileInput.current.onchange = null;
            }
        };
    }, [fileInput]);


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
                        style={{display: 'none'}}
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
                        <img src="/project/attem.png" alt="attach"/>
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