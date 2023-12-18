import DashBoardMyApprevalListItem from "../item/DashBoardMyApprevalListItem";
import {useNavigate} from "react-router-dom";

function DashBoardMyApprevalList({data}) {


    const navigate = useNavigate();

    const onClickmoveApprevalsHandler = () => {
        navigate('/approval/report-waiting');
    }


    return (
        <>
            <div>
                <div className="dashBoard-project">
                    <img src="/project/Rectangle.png"/>
                    <p>내 기안서</p>
                    <img
                        className="goProjects"
                        onClick={ onClickmoveApprevalsHandler }
                        src="/project/eva_arrow-left-fill.png"/>
                </div>
                {data &&
                    data.map((myAppreval, index) => (
                        <DashBoardMyApprevalListItem key={myAppreval.approvalCode || index} myAppreval={myAppreval} />
                    ))}
            </div>
        </>
    );
}

export default DashBoardMyApprevalList;