import { SyntheticEvent, useState } from "react";
import { Diagnosis, HealthCheckRating, NewEntryForm } from "../../../types";
import { Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";

interface Props {
    onCancel: ()=> void;
    onSubmit: (values: NewEntryForm) => void;
    id?: string;
}

const AddEntryForm = ({ onCancel, onSubmit, id }: Props) => {
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating["Healthy"]); 

    const entryId = id || '';

    const addEntry = (event: SyntheticEvent) => {
      event.preventDefault();
      onSubmit({
        id: entryId,
        description,
        date,
        specialist,
        diagnosisCodes,
        type: "HealthCheck",
        healthCheckRating,
      });
    };
    return (
        <div>
            <form onSubmit={addEntry}>
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
                <FormControl>
                    <RadioGroup
                        aria-labelledby="health-check-rating-group-label"
                        name="health-check-rating"
                        value={healthCheckRating}
                        onChange={(event) => setHealthCheckRating(Number(event.target.value as unknown as HealthCheckRating))}                    
                        >
                        <FormControlLabel
                        value={HealthCheckRating["Healthy"]}
                        control={<Radio />}
                        label="Healthy"
                        />
                        <FormControlLabel
                        value={HealthCheckRating["LowRisk"]}
                        control={<Radio />}
                        label="Low Risk"
                        />
                        <FormControlLabel
                        value={HealthCheckRating["HighRisk"]}
                        control={<Radio />}
                        label="High Risk"
                        />
                        <FormControlLabel
                        value={HealthCheckRating["CriticalRisk"]}
                        control={<Radio />}
                        label="Critical Risk"
                        />
                        
                    </RadioGroup>
                </FormControl>
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

export default AddEntryForm;