import { useParams } from "react-router-dom";
import { Entry, Patient } from "../../types";
import patientService from '../../services/patients';
import { useEffect, useState } from "react";
import {Button, Box, Container, Typography, Divider } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import PatientEntries from "../PatientEntries";

// interface Props {
//     patients : Patient[]
// }

const PatientInformationPage = () => {
    const id = useParams().id;
    const [patient, setPatient] = useState<Patient | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPatient = async () => {
            setIsLoading(true); // Set isLoading to true when fetching starts
            if (id) {
                try {
                    const fetchedPatient = await patientService.getById(id);
                    setPatient(fetchedPatient);
                } catch (error) {
                    console.error("Error fetching patient:", error);
                } finally {
                    setIsLoading(false); // Set isLoading to false when fetch completes (success or failure)
                }
            }
        };
        fetchPatient();
    }, [id]);

    if (isLoading) { 
        return <div>Loading patient data ...</div>; 
    }

    if (!patient) { 
        return <div>Patient not found</div>; 
    }

    return (
        <Container>
            <Box>
                <Typography align="left" variant="h4">
                    {patient?.name}

                {(
                    patient.gender == "male" ? 
                    <MaleIcon fontSize="large"/>
                    : 
                    <FemaleIcon fontSize="large"/>
                )}
                </Typography>
            </Box>

            <Typography>
                ssh: {patient?.ssn}
            </Typography>
            <Typography>
                occupation: {patient?.occupation}
            </Typography>
            <Divider orientation="horizontal" flexItem />
            <Box m={2}>
                <Typography>
                    entries
                </Typography>
                {/* <PatientEntries entries={patient.entries}/> */}
                {
                patient.entries.map((entry: Entry) => (
                    <PatientEntries key={entry.id} entry={entry}/>
                ))}
            </Box>
            <Button variant="contained" color="primary">
                Add new entry
            </Button>
        </Container>
    );
};

export default PatientInformationPage;