import { Dialog, DialogTitle, DialogContent, Divider, Alert, Button, Box } from '@mui/material';
import { NewEntryForm } from "../../../types";
import AddHealthCheckEntryForm from './AddEntryForm';
import { useState } from 'react';
import AddHospitalEntryForm from './AddHospitalEntryForm';
import AddOccupationalHealthCareForm from './AddOccupationEntryForm';

interface Props {
    modalOpen: boolean;
    onClose: ()=> void;
    onSubmit: (values: NewEntryForm) => void;
    error?: string;
    id?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, id }: Props) => {
    const [selectedForm, setSelectedForm] = useState<string | null>(null); 

    const openHealthCheckModal = (): void => setSelectedForm('HealthCheck');
    const openHospitalModal = (): void => setSelectedForm('Hospital');
    const openOccupationalModal = (): void => setSelectedForm('OccupationalHealthcare');
    const closeModal = (): void => setSelectedForm(null);

    const renderForm = () => {
        switch (selectedForm) {
            case 'HealthCheck':
                return <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={closeModal} id={id} />;
            case 'Hospital':
                return <AddHospitalEntryForm onSubmit={onSubmit} onCancel={closeModal} id={id} />;
            case 'OccupationalHealthcare':
                return <AddOccupationalHealthCareForm onSubmit={onSubmit} onCancel={closeModal} id={id} />;
            default:
                return null;
        }
    };

    return (
        <Dialog fullWidth={true} open={modalOpen} onClose={onClose}>
            <DialogTitle>New Entry</DialogTitle>
            <Divider />
            <DialogContent>
                {error && <Alert severity="error">{error}</Alert>}
                <Button  variant='contained' onClick={openHealthCheckModal}>
                    HealthCheck Entry
                </Button>
                <Box style={{margin: "0.5rem"}}/>
                <Button  variant='contained' onClick={openHospitalModal}>
                    Hospital Entry
                </Button>
                <Box style={{margin: "0.5rem"}}/>
                <Button  variant='contained' onClick={openOccupationalModal}>
                    OccupationalHealthcare Entry
                </Button>
                {selectedForm && ( 
                    <div style={{ marginTop: '20px' }}>{renderForm()}</div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AddEntryModal;

// const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, id}: Props) => {
//     const [healthCheckModalOpen, setHealthModalOpen] = useState<boolean>(false);
//     const [hospitalModalOpen, setHospitalModalOpen] = useState<boolean>(false);
//     const [occupationalHealthcareModalOpen, setoccupationalHealthcareModalOpen] = useState<boolean>(false);


//     const openHealthCheckModal = (): void => setHealthModalOpen(true);
//     const closeHealtCheckModal = (): void => {
//         setHealthModalOpen(false);
//     };

//     const openHospitalModal = (): void => setHospitalModalOpen(true);
//     const closeHospitalModal = (): void => {
//         setHospitalModalOpen(false);
//     };

//     const openOccupationalModal = (): void => setoccupationalHealthcareModalOpen(true);
//     const closeOccupationalModal = (): void => {
//         setoccupationalHealthcareModalOpen(false);
//     };

//     return (
//         <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
//             <DialogTitle>New HealtCheck Entry</DialogTitle>
//             <Divider />
//             <DialogContent>
//                 {error && <Alert severity="error">{error}</Alert>}
//                 <Button  variant='contained' onClick={() => openHealthCheckModal()}>
//                     HealthCheck Entry
//                 </Button>
//                 <Dialog fullWidth={true} open={healthCheckModalOpen} onClose={() => closeHealtCheckModal()}>
//                     <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={closeHealtCheckModal} id={id}/>
//                 </Dialog>
//                 <Divider />
//                 <Button  variant='contained' onClick={() => openHospitalModal()}>
//                     Hospital Entry
//                 </Button>
//                 <Dialog fullWidth={true} open={hospitalModalOpen} onClose={() => closeHospitalModal()}>
//                     <AddHospitalEntryForm onSubmit={onSubmit} onCancel={closeHospitalModal} id={id}/>
//                 </Dialog>
//                 <Divider />
//                 <Button  variant='contained' onClick={() => openOccupationalModal()}>
//                     OccupationalHealthcare Entry
//                 </Button>
//                 <Dialog fullWidth={true} open={occupationalHealthcareModalOpen} onClose={() => closeOccupationalModal()}>
//                     <AddOccupationalHealthCareForm onSubmit={onSubmit} onCancel={closeOccupationalModal} id={id}/>
//                 </Dialog>
//         </DialogContent>
//         </Dialog>
//     );
// };

// export default AddEntryModal;