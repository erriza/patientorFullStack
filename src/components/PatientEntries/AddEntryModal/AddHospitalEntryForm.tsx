import { SyntheticEvent, useState } from "react";
import { Diagnosis, NewEntryForm } from "../../../types";
import { Button, Grid, TextField } from "@mui/material";

interface Props {
    onCancel: ()=> void;
    onSubmit: (values: NewEntryForm) => void;
    id?: string
}

interface DischargeData {
    date: string;
    criteria: string;
  }
  
const AddHospitalEntryForm = ({ onCancel, onSubmit, id }: Props) => {
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);
    const [discharge, setDischarge] = useState<DischargeData>({
        date: '',
        criteria: '',
    });


    const handleDischargeDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDischarge((prevState) => ({
            ...prevState,
            date: event.target.value
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
            date,
            specialist,
            diagnosisCodes,
            type: "Hospital",
            discharge
        });
    };

    const entryId = id || '';
    return(
        <div>
            <form onSubmit={addHospitalEntry}>
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
                    label="Discharge Date"
                    fullWidth
                    value={discharge.date}
                    onChange={handleDischargeDateChange}
                />
                <TextField
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