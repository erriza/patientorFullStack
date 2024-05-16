import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientService from '../../services/patients';
import { useEffect, useState } from "react";
import { Box, Container, Typography, Divider } from "@mui/material";
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


    if (isLoading) { // Check if loading
        return <div>Loading patient data ...</div>; 
    }

    if (!patient) { // Check for no patient after loading
        return <div>Patient not found</div>; // Or handle this case appropriately
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
            <PatientEntries entries={patient.entries}/>
        </Container>
    );
};

export default PatientInformationPage;