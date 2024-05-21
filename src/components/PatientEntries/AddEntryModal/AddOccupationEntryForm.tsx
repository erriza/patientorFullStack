import { SyntheticEvent, useState } from "react";
import { Diagnosis, NewEntryForm } from "../../../types";
import { Button, Grid, TextField } from "@mui/material";
import MultipleSelectInput from "./Multiple-Select/MultipleSelectInput";
import DatePickerComponent from "./DatePicker/DatePicker";
import dayjs from "dayjs";

interface Props {
    onCancel: ()=> void;
    onSubmit: (values: NewEntryForm) => void;
    id?: string
}

const AddOccupationalHealthCareForm = ({ onCancel, onSubmit, id}: Props) => {
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<dayjs.Dayjs>(dayjs());
    const [specialist, setSpecialist] = useState<string>('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);
    const [employerName, setEmployerName] = useState<string>('');

    const entryId = id || '';

    const addOccupationalEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({
            id: entryId,
            description,
            date: date.format('YYYY-MM-DD'),
            specialist,
            diagnosisCodes,
            type: "OccupationalHealthcare",
            employerName
        });
    };

    return(
        <div>
            <form onSubmit={addOccupationalEntry}>
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
                <TextField
                    style={{ margin: "0.5rem"}}
                    label="EmployerName"
                    fullWidth
                    value={employerName}
                    onChange={({ target }) => setEmployerName(target.value)}
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

    export default AddOccupationalHealthCareForm;