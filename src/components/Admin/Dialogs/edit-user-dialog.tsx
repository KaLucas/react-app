import { Dialog } from '@mui/material';
import { useRecordContext } from '@context/use-record-context';

interface EditUserDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export const EditUserDialog = (props: EditUserDialogProps) => {
  const record = useRecordContext();
  const { onClose, selectedValue, open } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };

  console.log('record', record);
  // const handleListItemClick = (value: string) => {
  //   onClose(value);
  // };

  return <Dialog onClose={handleClose} open={open}></Dialog>;
};

export default EditUserDialog;
