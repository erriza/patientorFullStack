import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface Props {
    diagnosisCodes: string[];
    setDiagnosisCodes: (values: string[]) => void;
}
const MultipleSelectInput = ({ diagnosisCodes, setDiagnosisCodes}: Props) => {

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

    const handleDiagnosisChange = (event: SelectChangeEvent<string[]> ) => {
        const { target: { value } } = event;
        setDiagnosisCodes(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <Box>
            <FormControl fullWidth style={{margin: '0.5rem'}}>
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
        </Box>
    );
};

export default MultipleSelectInput;