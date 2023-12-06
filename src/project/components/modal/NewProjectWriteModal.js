import {useState} from "react";
import {useDispatch} from "react-redux";
import {callProjectRegisAPI} from "../../apis/ProjectAPICalls";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';

function NewProjectWriteModal({setNewProjectWriteModal}) {

        const [form, setForm] = useState({});
        const dispatch = useDispatch();
        const [startDate, setStartDate] = useState(new Date());
        const [endDate, setEndDate] = useState(new Date());

        /* 입력 양식 값 변경 시 state 수정 */
        const onChangeHandler = e => {
                setForm({
                        ...form,
                        [e.target.name] : e.target.value
                })
        }

        /* 프로젝트 생성 버튼 클릭 시 이벤트 */
        const onClickProjectRegistHandler = () => {
                const formData = new FormData();
                formData.append("projectRequest", new Blob([JSON.stringify(form)], { type : 'application/json'}));

                dispatch(callProjectRegisAPI({projectRegistRequest : formData}));
        }

        return(
                <div className="newProject-modal">
                    <div className="newProject-modal-container">
                            <div className="newProject-name-div">
                                    <div><p>프로젝트 만들기</p></div>
                                    <div><p>X</p></div>
                            </div>
                            <div className="project-info-div">
                                    <table>
                                            <tbody>
                                                    <tr>
                                                            <td>
                                                                    <input
                                                                        name='projectTitle'
                                                                        placeholder='프로젝트 이름을 입력하세요.'
                                                                        className="project-info-input"
                                                                        onChange={ onChangeHandler }
                                                                    />
                                                            </td>
                                                    </tr>
                                                    <tr>
                                                            <td>
                                                                    <input
                                                                        name='projectBody'
                                                                        placeholder='프로젝트 설명을 입력하세요.'
                                                                        className="project-info-input"
                                                                        onChange={ onChangeHandler }
                                                                    />
                                                            </td>
                                                    </tr>
                                            <tr className="newProject-date">
                                                    <td className="newProject-date-label">
                                                            <label>시작 날짜  </label>
                                                            <DatePicker
                                                                selected={startDate}
                                                                onChange={(date: Date) => setStartDate(date)}
                                                                selecetsStart
                                                                startDate={startDate}
                                                                endDate={endDate}
                                                                minDate={new Date()}
                                                                locale={ko}
                                                            />
                                                    </td>

                                                    <td className="newProject-date-label">
                                                            <label>마감 날짜  </label>
                                                            <DatePicker
                                                                selected={endDate}
                                                                onChange={(date: Date) => setEndDate(date)}
                                                                selecetsStart
                                                                startDate={startDate}
                                                                endDate={endDate}
                                                                minDate={startDate}
                                                                locale={ko}
                                                            />
                                                    </td>
                                            </tr>
                                            <tr>
                                                    <td className="newProject-dept">
                                                            <label>부서 선택 : </label>
                                                    </td>
                                                    <td className="newProject-date-radio">
                                                         <div>
                                                            <label><input type="radio" onChange={ onChangeHandler } name="deptCode" value="1"/>인사팀</label> &nbsp;
                                                            <label><input type="radio" onChange={ onChangeHandler } name="deptCode" value="2"/>개발팀</label> &nbsp;
                                                            <label><input type="radio" onChange={ onChangeHandler } name="deptCode" value="3"/>기획팀</label> &nbsp;
                                                            <label><input type="radio" onChange={ onChangeHandler } name="deptCode" value="4"/>영업팀</label> &nbsp;
                                                            <label><input type="radio" onChange={ onChangeHandler } name="deptCode" value="5"/>디자인팀</label> &nbsp;
                                                         </div>
                                                    </td>
                                            </tr>
                                            </tbody>
                                    </table>
                            </div>
                            <div className="project-button-div">
                                    <button
                                            onClick={ onClickProjectRegistHandler }
                                            >
                                            프로젝트생성
                                    </button>

                            </div>
                    </div>
                </div>
        );
}

export default NewProjectWriteModal;