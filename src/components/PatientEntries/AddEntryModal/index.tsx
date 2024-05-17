import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import { NewEntryForm } from "../../../types";
import AddEntryForm from './AddEntryForm';

interface Props {
    modalOpen: boolean;
    onClose: ()=> void;
    onSubmit: (values: NewEntryForm) => void;
    error?: string;
    id?: string;
}
const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, id}: Props) => {
    return (
        <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
            <DialogTitle>New HealtCheck Entry</DialogTitle>
            <Divider />
            <DialogContent>
                {error && <Alert severity="error">{error}</Alert>}
            <AddEntryForm onSubmit={onSubmit} onCancel={onClose} id={id}/>
        </DialogContent>
        </Dialog>
    );
};

export default AddEntryModal;