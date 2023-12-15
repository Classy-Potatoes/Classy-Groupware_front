import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callProjectDetailAPI, callProjectModifyAPI, callProjectRegistAPI} from "../../apis/ProjectAPICalls";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';
import {useNavigate, useParams} from "react-router-dom";

function ProjectModifyModal({ setProjectModifyModal }) {

        const [form, setForm] = useState({});
        const dispatch = useDispatch();
        const [startDate, setStartDate] = useState(new Date());
        const [endDate, setEndDate] = useState(new Date());
        const { putSuccess, project } = useSelector(state => state.projectReducer);
        const navigate = useNavigate();
        const { projectCode } =useParams();

        /* 최초 랜더링 시 상품 상세 정보 조회 */
        useEffect(() => {
                dispatch(callProjectDetailAPI({projectCode}));
        }, [dispatch, projectCode]);

        useEffect(() => {
                // project에 필요한 속성들이 있을 것으로 가정합니다.
                if (project) {
                        setForm({
                                projectTitle: project.projectTitle || '',
                                projectBody: project.projectBody || '',
                                projectStartDate: project?.projectStartDate,
                                projectEndDate: project?.projectEndDate,
                                deptCode: project?.deptCode,
                        });
                }
        }, [project]);               /* 선생님한테 질문하기 !! */

        /* 수정 성공시 */
        useEffect(() => {
                if(putSuccess === true) {
                        navigate(`/projects`, { replace : true });
                }
        }, [putSuccess]);


        /* 입력 양식 값 변경 시 state 수정 */
        const onChangeHandler = e => {
                setForm({
                        ...form,
                        [e.target.name] : e.target.value
                })
        }


        // /* 프로젝트 수정 버튼 클릭 시 이벤트 */
        const onClickProjectModifyHandler = () => {
                const newForm = {
                        ...form,
                        projectStartDate: startDate.toISOString(),
                        projectEndDate: endDate.toISOString(),
                };

                dispatch(callProjectModifyAPI({ projectCode, projectModifyRequest: newForm }));
                console.log('Form 담겼니? : ', newForm);
        };


        return(
                <div className="newProject-modal">
                    <div className="newProject-modal-container">
                            <div className="newProject-name-div">
                                    <div><p>프로젝트 만들기</p></div>
                                    <div>
                                         <button
                                               onClick={() => setProjectModifyModal(false)}
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
                                                                        name='projectTitle'
                                                                        placeholder='프로젝트 이름을 입력하세요.'
                                                                        value={ form.projectTitle}
                                                                        className="project-info-input"
                                                                        onChange={ onChangeHandler }

                                                                    />
                                                            </td>
                                                    </tr>
                                                    <tr>
                                                            <td>
                                                                    <input
                                                                        name="projectBody"
                                                                        placeholder='프로젝트 설명을 입력하세요.'
                                                                        value={form.projectBody}
                                                                        className="project-info-input"
                                                                        onChange={ onChangeHandler }
                                                                    />
                                                            </td>
                                                    </tr>
                                            <tr className="newProject-date">
                                                    <td className="newProject-date-label">
                                                    {/*        <label>시작 날짜  </label>*/}
                                                    {/*        <DatePicker*/}
                                                    {/*            dateFormat='yyyy-MM-dd'*/}
                                                    {/*            name="projectStartDate"*/}
                                                    {/*            value={form.projectStartDate}*/}
                                                    {/*            selected={startDate}*/}
                                                    {/*            onChange={(date: Date) => setStartDate(date)}*/}
                                                    {/*            selecetsStart*/}
                                                    {/*            startDate={startDate}*/}
                                                    {/*            endDate={endDate}*/}
                                                    {/*            minDate={new Date()}*/}
                                                    {/*            locale={ko}*/}
                                                    {/*        />*/}
                                                    {/*</td>*/}

                                                    {/*<td className="newProject-date-label">*/}
                                                    {/*        <label>마감 날짜  </label>*/}
                                                    {/*        <DatePicker*/}
                                                    {/*            dateFormat='yyyy-MM-dd'*/}
                                                    {/*            name="projectEndDate"*/}
                                                    {/*            value={form.projectEndDate}*/}
                                                    {/*            selected={endDate}*/}
                                                    {/*            onChange={(date: Date) => setEndDate(date)}*/}
                                                    {/*            selecetsStart*/}
                                                    {/*            startDate={startDate}*/}
                                                    {/*            endDate={endDate}*/}
                                                    {/*            minDate={startDate}*/}
                                                    {/*            locale={ko}*/}
                                                    {/*        />*/}
                                                    </td>
                                            </tr>
                                            <tr>
                                                    <td className="newProject-dept">
                                                            <label>부서 선택 : </label>
                                                    </td>
                                                    <td className="newProject-date-radio">
                                                         <div>
                                                            <label><input type="radio" onChange={ onChangeHandler } name="deptCode" value="1" />인사팀</label> &nbsp;
                                                            <label><input type="radio" onChange={ onChangeHandler } name="deptCode" value="2" />개발팀</label> &nbsp;
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
                                        onClick={ onClickProjectModifyHandler }
                                    >
                                            프로젝트수정
                                    </button>
                    </div>
                </div>
        );
}

export default ProjectModifyModal;