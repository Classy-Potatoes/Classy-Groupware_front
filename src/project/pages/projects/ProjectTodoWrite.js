import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getMemberId} from "../../../calendar/utils/MemberUtils";
import {
    callTodoListAPI
} from "../../../calendar/apis/SecondProjectAPICalls";
import PagingBar from "../../../dashBoard/components/common/PagingBar";
import ProjectTodoRegist from "../../components/items/ProjectTodoRegist";
import ProjectTodoList from "../../components/lists/ProjectTodoList";
import ProjectTodoReviews from "../../components/items/ProjectTodoReviews";

function ProjectTodoWrite() {

    const {projectCode} = useParams();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {allTodoList} = useSelector(state => state.secondProjectReducer);
    const memberId = getMemberId();

    useEffect(() => {
        dispatch(callTodoListAPI({projectCode, currentPage}));
    }, [projectCode, currentPage]);

    return (
        <>
            <div className="sch-regist-box">
                <ProjectTodoRegist projectCode={projectCode}/>
                {allTodoList && allTodoList.data.map(todo => (
                        <div className="sch-project-list" key={todo.todoCode}>
                            <ProjectTodoList projectCode={projectCode} todo={todo} memberId={memberId}/>
                            <ProjectTodoReviews projectCode={projectCode} todo={todo} memberId={memberId}/>
                        </div>
                    )
                )
                }
                {allTodoList &&
                    <PagingBar pageInfo={allTodoList.pageInfo} setCurrentPage={setCurrentPage}/>
                }
            </div>

        </>
    )
        ;

}

export default ProjectTodoWrite;