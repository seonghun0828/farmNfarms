import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

const DatePicker = ({ date, setDate }) => {
  const [value, setValue] = useState(date ? date : null);

  const onChangeHandler = (newValue) => {
    setValue(newValue);
    setDate(newValue);
  }
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          value={value}
          onChange={onChangeHandler}
          inputFormat={"yyyy-MM-dd"}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
}

export default DatePicker;