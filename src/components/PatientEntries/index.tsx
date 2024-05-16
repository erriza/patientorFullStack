// import { Box, List, ListItem, Typography } from "@mui/material";
import { Diagnosis, Entry  } from '../../types';
import { useEffect, useState } from "react";
import diagnosisService from "../../services/diagnosis";
import HospitalEntry from "./HospitalEntry";
import HealthCheck from "./HealthCheck";
import OccupationalHealthcare from "./OccupationalHealthcare";

const PatientEntries: React.FC<{ entry: Entry} > = ({ entry }) => {
    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

    console.log(entry);
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

    switch(entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} diagnosis={diagnosis}/>;
        case "HealthCheck":
            return <HealthCheck entry={entry} diagnosis={diagnosis}/>;
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={entry} diagnosis={diagnosis}/>;
    }
    

    // return (
    //     <Box>
    //         <Typography align="left" variant="h5">
    //             entries
    //         </Typography>
    //         <Typography>
    //             {/* {entry.map((entrie: Entry) => ( */}
    //                 <Typography key={entry.id}>
    //                     <Typography>
    //                         <Typography variant="body1"><strong>{entry.date}</strong> </Typography>
    //                         <Typography variant="body1">{entry.description}</Typography>
    //                     </Typography>
    //                     <Typography>
    //                         <List sx={{ listStyleType: 'disc' }}>
    //                             {
    //                             entry.diagnosisCodes?.map(code => (
    //                                 <ListItem key={code} sx={{ display: 'list-item' }}>
    //                                     {code}{" "}
    //                                     {
    //                                     diagnosis?.find((diagnose: Diagnosis) => 
    //                                     diagnose.code === code)?.name
    //                                     } 
    //                                 </ListItem>
    //                             ))
    //                             }
    //                         </List>
    //                     </Typography>
    //                 </Typography>
    //             {/* ))} */}
    //         </Typography>
    //     </Box>
    // );
};

export default PatientEntries;