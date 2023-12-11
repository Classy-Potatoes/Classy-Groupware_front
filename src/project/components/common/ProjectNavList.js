import React, { useState } from 'react';
import ProjectPostWrite from "../../pages/projects/ProjectPostWrite";
import ProjectTaskWrite from "../../pages/projects/ProjectTaskWrite";
// import ProjectCalendarWrite from "../../pages/projects/ProjectCalendarWrite";
// import ProjectTodoWrite from "../../pages/projects/ProjectTodoWrite";

function ProjectNavList() {
    const [currentComponent, setCurrentComponent] = useState('post');

    return (
        <>
            <div className="project-Nav-List-border">
                <div className="project-Nav-List">
                    <button onClick={() => setCurrentComponent('post')}>
                        <img src="/project/board.png" alt="글작성" />
                        <p>글작성</p>
                    </button>
                    <button onClick={() => setCurrentComponent('task')}>
                        <img src="/project/task.png" alt="업무" />
                        <p>업무</p>
                    </button>
                    <button onClick={() => setCurrentComponent('calendar')}>
                        <img src="/project/calendar.png" alt="일정" />
                        <p>일정</p>
                    </button>
                    <button onClick={() => setCurrentComponent('todo')}>
                        <img src="/project/todo.png" alt="할일" />
                        <p>할일</p>
                    </button>
                </div>
            </div>
            <div>
                {currentComponent === 'post' && <ProjectPostWrite />}
                {currentComponent === 'task' && <ProjectTaskWrite />}
                {/*{currentComponent === 'calendar' && <ProjectCalendarWrite />}*/}
                {/*{currentComponent === 'todo' && <ProjectTodoWrite />}*/}
            </div>
        </>
    );
}

export default ProjectNavList;