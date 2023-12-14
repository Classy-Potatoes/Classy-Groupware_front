import React, { useState } from 'react';
import ProjectPostWrite from "../../pages/projects/ProjectPostWrite";
import ProjectTaskWrite from "../../pages/projects/ProjectTaskWrite";
import ProjectCalendarWrite from "../../pages/projects/ProjectCalendarWrite";
import ProjectTodoWrite from "../../pages/projects/ProjectTodoWrite";
import {useSelector} from "react-redux";
import ProjectPostList from "../lists/ProjectPostList";
import {style} from "redux-logger/src/diff";
// import ProjectTodoWrite from "../../pages/projects/ProjectTodoWrite";

function ProjectNavList() {
    const [currentComponent, setCurrentComponent] = useState('post');
    const {project} = useSelector((state) => state.projectReducer);



    console.log(project, "sdfsdfsdfs")
    // project 객체에서 projectCode를 추출
    const projectCode = project ? project.projectCode : null;

    return (
        <>
            <div className="project-write-div">

                <div className="project-Nav-List-border">
                    <div className="project-Nav-List">
                        <button
                            className={`project-Nav-List-button ${currentComponent === 'post' ? 'active' : ''}`}
                            onClick={() => setCurrentComponent('post')}>
                            <img src="/project/board.png" alt="글작성" />
                            <p>글작성</p>
                        </button>
                        <button
                            className={`project-Nav-List-button ${currentComponent === 'task' ? 'active' : ''}`}
                            onClick={() => setCurrentComponent('task')}>
                            <img src="/project/task.png" alt="업무" />
                            <p>업무</p>
                        </button>
                        <button
                            className={`project-Nav-List-button ${currentComponent === 'calendar' ? 'active' : ''}`}
                            onClick={() => setCurrentComponent('calendar')}>
                            <img src="/project/calendar.png" alt="일정" />
                            <p>일정</p>
                        </button>
                        <button
                            className={`project-Nav-List-button ${currentComponent === 'todo' ? 'active' : ''}`}
                            onClick={() => setCurrentComponent('todo')}>
                            <img src="/project/todo.png" alt="할일" />
                            <p>할일</p>
                        </button>
                    </div>
                </div>
                <div>
                    {currentComponent === 'post' && <ProjectPostWrite projectCode={projectCode}/>}
                    {currentComponent === 'task' && <ProjectTaskWrite projectCode={projectCode}/>}
                    {currentComponent === 'calendar' && <ProjectCalendarWrite />}
                    {currentComponent === 'todo' && <ProjectTodoWrite />}
                </div>
            </div>

            {currentComponent === 'post' || currentComponent === 'task' ?
                <div className="projectList-div">
                    {currentComponent === 'post' && <ProjectPostList/>}
                    {currentComponent === 'task' && <ProjectTaskWrite projectCode={projectCode}/>}
                    {/*{currentComponent === 'calendar' && <ProjectCalendarWrite />}*/}
                    {/*{currentComponent === 'todo' && <ProjectTodoWrite />}*/}
                </div> : <>{style.display === 'none'}</>
            }


        </>
    );
}

export default ProjectNavList;