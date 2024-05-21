import { SyntheticEvent, useState } from "react";
import { Diagnosis, NewEntryForm } from "../../../types";
import { Button, Grid, TextField } from "@mui/material";
import MultipleSelectInput from "./Multiple-Select/MultipleSelectInput";
import dayjs from "dayjs";
import DatePickerComponent from "./DatePicker/DatePicker";

interface Props {
    onCancel: ()=> void;
    onSubmit: (values: NewEntryForm) => void;
    id?: string
}

interface DischargeData {
    date: dayjs.Dayjs;
    criteria: string;
  }
  
const AddHospitalEntryForm = ({ onCancel, onSubmit, id }: Props) => {
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<dayjs.Dayjs>(dayjs());
    const [specialist, setSpecialist] = useState<string>('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);
    const [discharge, setDischarge] = useState<DischargeData>({
        date: dayjs(),
        criteria: '',
    });

    const handleDischargeDateChange = (newValue: dayjs.Dayjs ) => {
        setDischarge((prevState) => ({
            ...prevState,
            date: newValue
        }));
    };

    const handleDischargeDateCriteria = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDischarge((prevState) => ({
            ...prevState,
            criteria: event.target.value
        }));
    };

    const addHospitalEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({
          id: entryId,
          description,
          date: date.format('YYYY-MM-DD'),
          specialist,
          diagnosisCodes,
          type: "Hospital",
          discharge: {
            date: discharge.date.format('YYYY-MM-DD'),
            criteria: discharge.criteria
          }
        });
      };

    const entryId = id || '';
    return(
        <div>
            <form onSubmit={addHospitalEntry}>
                <TextField
                    style={{ margin: "0.5rem"}}
                    label="Description"
                    fullWidth
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                <DatePickerComponent
                    date={date}
                    setDate={setDate}
                />
                <TextField
                    style={{ margin: "0.5rem"}}
                    label="Specialist"
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                />
                <MultipleSelectInput
                    diagnosisCodes={diagnosisCodes}
                    setDiagnosisCodes={setDiagnosisCodes}
                />
                <DatePickerComponent
                    date={discharge.date} 
                    setDate={handleDischargeDateChange} 
                />
                <TextField
                    style={{ margin: "0.5rem"}}
                    label="Discharge Criteria"
                    fullWidth
                    value={discharge.criteria}
                    onChange={handleDischargeDateCriteria}
                />
                <Grid>
                    <Grid item>
                    <Button
                        color="secondary"
                        variant="contained"
                        style={{ float: "left" }}
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel    
                    </Button>
                    </Grid>
                    <Grid item>
                    <Button
                        style={{ float: "right" }}
                        type="submit"
                        variant="contained"
                    >
                        Add
                    </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default AddHospitalEntryForm;