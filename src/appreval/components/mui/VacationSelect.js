import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">휴가구분</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="휴가구분"
                    onChange={handleChange}
                >
                    <MenuItem value="연차">연차</MenuItem>
                    <MenuItem value="반차">반차</MenuItem>
                    <MenuItem value="병가">병가</MenuItem>
                    <MenuItem value="보상휴가">보상휴가</MenuItem>
                    <MenuItem value="기타">기타</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}