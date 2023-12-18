import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ProjectScheduleRegist from "../../components/items/ProjectScheduleRegist";
import ProjectScheduleReviews from "../../components/items/ProjectScheduleReviews";
import {useDispatch, useSelector} from "react-redux";
import {callScheduleListAPI} from "../../../calendar/apis/SecondProjectAPICalls";
import PagingBar from "../../../dashBoard/components/common/PagingBar";
import {getDecodeAccessToken, getMemberId} from "../../../calendar/utils/MemberUtils";
import ProjectScheduleList from "../../components/lists/ProjectScheduleList";

function ProjectCalendarWrite() {

    const {projectCode} = useParams();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {allSchedules, postSuccess} = useSelector(state => state.secondProjectReducer);
    const memberId = getMemberId();

    useEffect(() => {
        dispatch(callScheduleListAPI({projectCode, currentPage}));
    }, [currentPage, postSuccess]);
    console.log(allSchedules, "sdsdsd")

    return (
        <>
            <div className="sch-regist-box">
                <ProjectScheduleRegist postSuccess={postSuccess} projectCode={projectCode}/>
            </div>
            {allSchedules && allSchedules.data.map(schedule => (
                    <div className="sch-list-box">
                        <div className="sch-project-list" key={schedule.scheduleCode}>
                            <ProjectScheduleList postSuccess={postSuccess} projectCode={projectCode} schedule={schedule}
                                                 memberId={memberId}/>
                            <ProjectScheduleReviews postSuccess={postSuccess} projectCode={projectCode} schedule={schedule}
                                                    memberId={memberId}/>
                        </div>
                    </div>
                )
            )}
            {allSchedules &&
                <div className="project-post-paging">
                    <PagingBar pageInfo={allSchedules.pageInfo} setCurrentPage={setCurrentPage}/>
                </div>
            }
        </>
    )
        ;
}

export default ProjectCalendarWrite;