import ckeckedIcon from '../../../calendar/images/checked.png';
import {useState} from "react";

function ProjectTodoListItem({todoItems, setListForm}) {

    const newMonth = todoItems.todoListEndDate.split('-')[1];
    const newDate = todoItems.todoListEndDate.split('-')[2];
    const newEndDate = `${newMonth}-${newDate}`;
    console.log(newEndDate, "ddddd")
    return (
        <>
            <div className="td-list-left-box">
                <img src={ckeckedIcon}/>
                <div>{todoItems.todoListBody}</div>
            </div>
            <div className="td-list-right-box">
                <div className="td-list-endDate">{newEndDate}</div>
                <div className="td-list-memberName">{todoItems.managerName}</div>
            </div>
        </>
    );
}

export default ProjectTodoListItem;