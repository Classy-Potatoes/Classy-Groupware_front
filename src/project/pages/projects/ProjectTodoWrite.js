import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getMemberId} from "../../../calendar/utils/MemberUtils";
import {
    callTodoListAPI, todoListForDashboard
} from "../../../calendar/apis/SecondProjectAPICalls";
import PagingBar from "../../../dashBoard/components/common/PagingBar";
import ProjectTodoRegist from "../../components/items/ProjectTodoRegist";
import ProjectTodoList from "../../components/lists/ProjectTodoList";
import ProjectTodoReviews from "../../components/items/ProjectTodoReviews";
import {ToastContainer} from "react-toastify";

function ProjectTodoWrite() {

    const {projectCode} = useParams();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {allTodoList, postSuccess} = useSelector(state => state.secondProjectReducer);
    const memberId = getMemberId();

    useEffect(() => {
        dispatch(callTodoListAPI({projectCode, currentPage}));
        dispatch(todoListForDashboard())
    }, [currentPage, postSuccess]);

    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            <div className="sch-regist-box">
                <ProjectTodoRegist todoList={allTodoList} projectCode={projectCode} postSuccess={postSuccess}/>
            </div>
            {allTodoList && allTodoList.data.map(todo => (
                    <div className="sch-list-box">
                        <div className="sch-project-list" key={todo.todoCode}>
                            <ProjectTodoList projectCode={projectCode} postSuccess={postSuccess} todo={todo}
                                             memberId={memberId}/>
                            <ProjectTodoReviews projectCode={projectCode} postSuccess={postSuccess} todo={todo}
                                                memberId={memberId}/>
                        </div>
                    </div>
                )
            )
            }
            {allTodoList &&
                <div className="project-post-paging">
                    <PagingBar pageInfo={allTodoList.pageInfo} setCurrentPage={setCurrentPage}/>
                </div>
            }
        </>
    )
        ;

}

export default ProjectTodoWrite;