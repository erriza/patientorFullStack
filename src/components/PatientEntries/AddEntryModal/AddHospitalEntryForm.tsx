import { SyntheticEvent, useState } from "react";
import { Diagnosis, NewEntryForm } from "../../../types";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

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

    const handleDiagnosisChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        const {
          target: { value },
        } = event;
        setDiagnosisCodes(
          typeof value === 'string' ? value.split(',') : value,
        );
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
                <TextField
                    style={{ margin: "0.5rem"}}
                    label="Discharge Date"
                    fullWidth
                    value={discharge.date}
                    onChange={handleDischargeDateChange}
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