import * as React from "react";
import {useState} from "react";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import ko from "dayjs/locale/ko";

dayjs.locale(ko);

export default function ReportDatePiker({onDateChange}) {
    const [startDateValue, setStartDateValue] = useState(null);
    const [endDateValue, setEndDateValue] = useState(null);


    const handleStartDateChange = (newValue) => {
        setStartDateValue(newValue);
        onDateChange({ startDate: newValue, endDate: endDateValue });
    };

    const handleEndDateChange = (newValue) => {
        setEndDateValue(newValue);
        onDateChange({ startDate: startDateValue, endDate: newValue });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']} sx={{width: '500px'}}>
                <DatePicker
                    label="검색 시작 날짜"
                    value={startDateValue}
                    onChange={(newValue) =>handleStartDateChange(newValue)}
                    format="YYYY-MM-DD"
                    sx={{ width: "70px"}}
                />
                <DatePicker
                    label="검색 종료 날짜"
                    value={endDateValue}
                    onChange={(newValue) => handleEndDateChange(newValue)}
                    format="YYYY-MM-DD"
                    sx={{ width: "70px"}}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}