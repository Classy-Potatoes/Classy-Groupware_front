import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callProjectRegistAPI} from "../../apis/ProjectAPICalls";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';
import {useNavigate} from "react-router-dom";

function NewProjectWriteModal({ setNewProjectWriteModal }) {

        const [form, setForm] = useState({});
        const dispatch = useDispatch();
        const [startDate, setStartDate] = useState(new Date());
        const [endDate, setEndDate] = useState(new Date());
        const { postSuccess } = useSelector(state => state.projectReducer);
        const navigate = useNavigate();

        useEffect(() => {
                if(postSuccess === true) {
                        navigate(`/projects`, { replace : true });
                }
        }, [postSuccess]);

        /* 입력 양식 값 변경 시 state 수정 */
        const onChangeHandler = e => {
                setForm({
                        ...form,
                        [e.target.name] : e.target.value
                })
        }

        /* 프로젝트 생성 버튼 클릭 시 이벤트 */
        const onClickProjectRegistHandler = () => {
                const newForm = {
                        ...form,
                        projectStartDate: startDate.toISOString(),
                        projectEndDate: endDate.toISOString(),
                };

                dispatch(callProjectRegistAPI({ projectRegistRequest : newForm}));
                console.log('Form 담겼니? : ', newForm);

        };


        return(
                <div className="newProject-modal">
                    <div className="newProject-modal-container">
                            <div className="newProject-name-div">
                                    <div><p>프로젝트 만들기</p></div>
                                    <div>
                                         <button
                                               onClick={() => setNewProjectWriteModal(false)}
                                         >X
                                         </button>
                                    </div>
                            </div>
                            <div className="project-info-div">
                                    <table>
                                            <tbody>
                                                    <tr>
                                                            <td>
                                                                    <input
                                                                        type='text'
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
                                                                        type="text"
                                                                        name="projectBody"
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
                                                                dateFormat='yyyy-MM-dd'
                                                                name="projectStartDate"
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
                                                                dateFormat='yyyy-MM-dd'
                                                                name="projectEndDate"
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
                                    <button
                                        className="project-button-div"
                                            onClick={ onClickProjectRegistHandler }
                                            >
                                            프로젝트생성
                                    </button>
                    </div>
                </div>
        );
}

export default NewProjectWriteModal;