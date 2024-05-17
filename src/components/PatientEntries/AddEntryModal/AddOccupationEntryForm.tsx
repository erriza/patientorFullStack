import { SyntheticEvent, useState } from "react";
import { Diagnosis, NewEntryForm } from "../../../types";
import { Button, Grid, TextField } from "@mui/material";

interface Props {
    onCancel: ()=> void;
    onSubmit: (values: NewEntryForm) => void;
    id?: string
}

const AddOccupationalHealthCareForm = ({ onCancel, onSubmit, id}: Props) => {
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);
    const [employerName, setEmployerName] = useState<string>('');


    const entryId = id || '';

    const addOccupationalEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({
            id: entryId,
            description,
            date,
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
                    label="Description"
                    fullWidth
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                <TextField
                    label="Date"
                    fullWidth
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                />
                <TextField
                    label="Specialist"
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                />
                <TextField
                    label="DiagnosisCodes"
                    fullWidth
                    value={diagnosisCodes}
                    onChange={({ target }) => {
                        setDiagnosisCodes(prevDiagnosisCodes => [...prevDiagnosisCodes, target.value]); 
                      }}
                />
                <TextField
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