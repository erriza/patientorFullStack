import { SyntheticEvent, useState } from "react";
import { Diagnosis, HealthCheckRating, NewEntryForm } from "../../../types";
import { Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField } from "@mui/material";

interface Props {
    onCancel: ()=> void;
    onSubmit: (values: NewEntryForm) => void;
    id?: string;
}

const AddHealthCheckEntryForm = ({ onCancel, onSubmit, id }: Props) => {
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating["Healthy"]); 

    const codes = [
        'M24.2',
        'S03.5',
        'M51.2',
        'J10.1',
        'J06.9',
        'Z57.1',
        'N30.0',
        'H54.7',
        'J03.0',
        'L60.1',
        'Z74.3',
        'L20',
        'F43.2',
        'S62.5',
        'H35.29'

    ];

    const entryId = id || '';

    const handleDiagnosisChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
      const {
        target: { value },
      } = event;
      setDiagnosisCodes(
        typeof value === 'string' ? value.split(',') : value,
      );
    };

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
                    style={{ margin: "0.5rem"}}
                    label="Description"
                    fullWidth
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                <TextField
                    style={{ margin: "0.5rem"}}
                    label="Date"
                    fullWidth
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                />
                <TextField
                    style={{ margin: "0.5rem"}}
                    label="Specialist"
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                />
                <FormControl fullWidth
                    style={{ margin: "0.5rem"}}
                    >
                        <InputLabel id="multiple-diagnosiscodes">Diagnosis Codes</InputLabel>
                        <Select
                            labelId="multiple-diagnosiscodes"
                            multiple
                            value={diagnosisCodes}
                            onChange={handleDiagnosisChange}
                        >
                            {codes.map((code) => (
                                <MenuItem
                                    key={code}
                                    value={code}
                                >
                                    {code}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                <FormControl 
                    style={{ margin: "0.5rem"}}
                    >
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

export default AddHealthCheckEntryForm;