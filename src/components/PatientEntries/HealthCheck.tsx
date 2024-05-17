import { Box, Card, Container, List, ListItem, Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

interface Props {
    entry : Entry;
    diagnosis: Diagnosis[]
}
const HealthCheck = ({ entry, diagnosis }: Props) => {

    return (
        <Container>
            <Card variant="outlined" style={{padding: "20px"}}>
                    <Box key={entry.id} m={2}>
                        <Box>
                            <Typography variant="body1" ><strong>
                                {entry.date}</strong> <HealthAndSafetyIcon/>
                            </Typography>
                            <Typography variant="body1">{entry.description}</Typography>
                        </Box>
                        <Box>
                            <List sx={{ listStyleType: 'disc' }}>
                                {
                                    entry.diagnosisCodes?.map(code => (
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
                        </Box>
                    </Box>
                    <Box>
                        diagnose by {entry.specialist}
                    </Box>
            </Card>
        </Container>
    );
};

export default HealthCheck;