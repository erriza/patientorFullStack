import { Box, List, ListItem, Typography } from "@mui/material";
import { Diagnosis, Entry  } from '../../types';
import { useEffect, useState } from "react";
import diagnosisService from "../../services/diagnosis";

interface Props {
    entries : Entry[]
}

const PatientEntries = ({ entries }: Props) => {
    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

    console.log(entries[0].type);
    useEffect(() => {
        const fetchDiagnosis = async () => {
            try {
                const fetchedDiagnosis = await diagnosisService.getAll();
                setDiagnosis(fetchedDiagnosis);
            } catch(error) {
                console.error("Error fetching diagnosis", error);
            }
        };
        void fetchDiagnosis();
    },[]);
    
    return (
        <Box>
            <Typography align="left" variant="h5">
                entries
            </Typography>
            <Typography>
                {entries.map((entrie: Entry) => (
                    <Typography key={entrie.id}>
                        <Typography>
                            <Typography variant="body1"><strong>{entrie.date}</strong> </Typography>
                            <Typography variant="body1">{entrie.description}</Typography>
                        </Typography>
                        <Typography>
                            <List sx={{ listStyleType: 'disc' }}>
                                {
                                entrie.diagnosisCodes?.map(code => (
                                    <ListItem key={code} sx={{ display: 'list-item' }}>
                                        {code}{" "}
                                        {
                                        diagnosis?.find((diagnose: Diagnosis) => 
                                        diagnose.code === code)?.name
                                        } 
                                    </ListItem>
                                ))
                                }
                            </List>
                        </Typography>
                    </Typography>
                ))}
            </Typography>
        </Box>
    );
};

export default PatientEntries;