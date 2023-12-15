import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function ProjectListItem({project : {projectCode, projectTitle, deptName, participantCount} }) {

    const [backgroundColor, setBackgroundColor] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // localStorage에서 저장된 색상을 불러오기
        const storedColor = localStorage.getItem(`projectBackgroundColor_${projectCode}`);

        if (storedColor) {
            // 저장된 색상이 있으면 그 색상을 사용
            setBackgroundColor(storedColor);
        } else {
            // 저장된 색상이 없으면 세 가지 색 중에서 랜덤으로 선택하여 저장
            const colors = ['#F88585', '#F8D885', '#85BAF8'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            setBackgroundColor(randomColor);
            localStorage.setItem(`projectBackgroundColor_${projectCode}`, randomColor);
        }
    }, [projectCode]); // projectCode가 변경될 때마다 useEffect 다시 실행

    const onClickProjectHandler = () => {
        navigate(`/projects/${projectCode}`);
    }

    return(

            <div
                className="project-div"
                style={{ backgroundColor }}
                onClick={ onClickProjectHandler }
            >
                <h3>{ projectTitle }</h3>
                <h5>{ deptName }</h5>
                <h4>{ participantCount }명 참여중</h4>
            </div>

    );

}

export default ProjectListItem;
