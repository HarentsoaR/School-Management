
import TextField from '@mui/material/TextField';

const DateTimePicker = ({ dateTime, setDateTime }) => {
    return (
        <TextField
            fullWidth
            className='mt-2'
            label="Date and Time"
            type="datetime-local"
            value={dateTime}
            InputLabelProps={{
                shrink: true,
            }}
            onChange={(e) => setDateTime(e.target.value)}
        />
    );
};

export default DateTimePicker;
