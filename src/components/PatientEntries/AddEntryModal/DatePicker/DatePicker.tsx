import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface Props {
    date: dayjs.Dayjs,
    setDate: (values: dayjs.Dayjs) => void;
}
const DatePickerComponent = ({ date, setDate}: Props) => {

    return (
        <DatePicker
            label="Date"
            defaultValue={dayjs()}
            format="YYYY-MM-DD"
            value={dayjs(date)}
            onChange={(newValue) => {
                if(newValue !== null) {
                    setDate(newValue);
                }
            }}
            sx={{ margin: "0.5rem"}}
        />  
    );
};

export default DatePickerComponent;