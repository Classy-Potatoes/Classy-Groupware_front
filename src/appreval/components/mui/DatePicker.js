import * as React from "react";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import ko from "dayjs/locale/ko";

dayjs.locale(ko);

export default function DatePickerValue() {
    const [startDateValue, setStartDateValue] = React.useState(dayjs);
    const [endDateValue, setEndDateValue] = React.useState(dayjs);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                    label="휴가 시작 날짜"
                    value={startDateValue}
                    defaultValue={dayjs}
                    onChange={(newValue) => setStartDateValue(newValue)}
                    format="YYYY-MM-DD"
                    sx={{ width: "100px"}}
                />
                <DatePicker
                    label="휴가 종료 날짜"
                    value={endDateValue}
                    defaultValue={dayjs}
                    onChange={(newValue) => setEndDateValue(newValue)}
                    format="YYYY-MM-DD"
                    sx={{ width: "100px"}}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}