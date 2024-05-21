import { useParams } from "react-router-dom";
import { Entry, NewEntryForm, Patient } from "../../types";
import patientService from '../../services/patients';
import { useEffect, useState } from "react";
import {Button, Box, Container, Typography, Divider } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import PatientEntries from "../PatientEntries";
import AddEntryModal from "../PatientEntries/AddEntryModal";
import axios from "axios";

// interface Props {
//     patients : Patient[]
// }

const PatientInformationPage = () => {
    const id = useParams().id;
    const [patient, setPatient] = useState<Patient | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    
    useEffect(() => {
        const fetchPatient = async () => {
            setIsLoading(true);
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

    const openModal = (): void => setModalOpen(true);

    const closeModal = ():void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: NewEntryForm) => {
        try {
            const entry = await patientService.createEntry(values);
            const updatePatient = {
                ...patient,
                entries: [...patient!.entries, entry]
            };
            setPatient(updatePatient as Patient);
            setModalOpen(false);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
              if (e?.response?.data && typeof e?.response?.data === "string") {
                const message = e.response.data.replace('Something went wrong. Error: ', '');
                console.error(message);
                setError(message);
              } else {
                setError("Unrecognized axios error");
              }
            } else {
              console.error("Unknown error", e);
              setError("Unknown error");
            }
          }
    };

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
                {
                patient.entries.map((entry: Entry) => (
                    <PatientEntries key={entry.id} entry={entry}/>
                ))}
            </Box>
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
                id={id}
            />
            <Button variant="contained" color="primary" onClick={() => openModal()}>
                Add new entry
            </Button>
        </Container>
    );
};

export default PatientInformationPage;