import React, {useEffect, useState} from "react";
import '../calendarStyle/MiniCalendar.css';

function SideCalendar() {
    const [currYear, setCurrYear] = useState(new Date().getFullYear());
    const [currMonth, setCurrMonth] = useState(new Date().getMonth());
    const [date, setDate] = useState(new Date());
    const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월",
        "8월", "9월", "10월", "11월", "12월"];

    const renderCalendar = () => {
        const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
        const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
        const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
        const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
        const liTags = [];

        for (let i = firstDayofMonth; i > 0; i--) {
            liTags.push(<li key={`inactive-${i}`} className="inactive">{lastDateofLastMonth - i + 1}</li>);
        }

        for (let i = 1; i <= lastDateofMonth; i++) {
            const isToday = i === date.getDate() && currMonth === date.getMonth() && currYear === date.getFullYear();
            liTags.push(<li key={`active-${i}`} className={isToday ? "active" : ""}>{i}</li>);
        }

        for (let i = lastDayofMonth; i < 6; i++) {
            liTags.push(<li key={`inactive-next-${i}`} className="inactive">{i - lastDayofMonth + 1}</li>);
        }

        return liTags;
    }

    const handlePrevNextClick = (direction) => {
        if (direction === "prev") {
            setCurrMonth((prevMonth) => prevMonth - 1);
        } else {
            setCurrMonth((prevMonth) => prevMonth + 1);
        }
        //
        // if (currMonth < 0 || currMonth > 11) {
        //     const newDate = new Date(currYear, currMonth, new Date().getDate());
        //     setCurrYear(newDate.getFullYear());
        //     setCurrMonth(newDate.getMonth());
        // } else {
        //     setDate(new Date());
        // }
    }

    useEffect(() => {
        if (currMonth < 0 || currMonth > 11) {
            const newDate = new Date(currYear, currMonth, new Date().getDate());
            setCurrYear(newDate.getFullYear());
            setCurrMonth(newDate.getMonth());
        } else {
            setDate(new Date());
        }
    }, [currMonth]);

    return (
        <div className="wrapper">
            <header>
                <p className="current-date">{`${months[currMonth]} ${currYear}`}</p>
                <div className="icons">
                    <span id="prev" className="material-symbols-rounded" onClick={() => handlePrevNextClick("prev")}>&lt;</span>
                    <span id="next" className="material-symbols-rounded" onClick={() => handlePrevNextClick("next")}>&gt;</span>
                </div>
            </header>
            <div className="calendar">
                <ul className="weeks">
                    <li>일</li>
                    <li>월</li>
                    <li>화</li>
                    <li>수</li>
                    <li>목</li>
                    <li>금</li>
                    <li>토</li>
                </ul>
                <ul className="days">
                    {renderCalendar()}
                </ul>
            </div>
        </div>
    );
}

export default SideCalendar;