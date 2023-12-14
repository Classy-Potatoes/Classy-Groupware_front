import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ProjectScheduleRegist from "../../components/items/ProjectScheduleRegist";
import ProjectScheduleReviews from "../../components/items/ProjectScheduleReviews";
import {useDispatch, useSelector} from "react-redux";
import {callScheduleListAPI} from "../../../calendar/apis/SecondProjectAPICalls";
import PagingBar from "../../../dashBoard/components/common/PagingBar";
import {getMemberId} from "../../../calendar/utils/MemberUtils";
import ProjectScheduleList from "../../components/lists/ProjectScheduleList";

function ProjectCalendarWrite() {

    const {projectCode} = useParams();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {allSchedules} = useSelector(state => state.secondProjectReducer);
    const memberId = getMemberId();

    useEffect(() => {
        dispatch(callScheduleListAPI({projectCode, currentPage}));
    }, [projectCode, currentPage]);

    return (
        <>
            <div className="sch-regist-box">
                <ProjectScheduleRegist projectCode={projectCode}/>
                {allSchedules && allSchedules.data.map(schedule => (
                        <div className="sch-project-list" key={schedule.scheduleCode}>
                            <ProjectScheduleList projectCode={projectCode} schedule={schedule} memberId={memberId}/>
                            <ProjectScheduleReviews projectCode={projectCode} schedule={schedule} memberId={memberId}/>
                        </div>
                    )
                )
                }
                {allSchedules &&
                    <PagingBar pageInfo={allSchedules.pageInfo} setCurrentPage={setCurrentPage}/>
                }
            </div>

        </>
    )
        ;
}

export default ProjectCalendarWrite;