import { Dialog } from '@mui/material';
import type { DatagridUsersList } from '@pages/admin/users-list';

interface EditUserDialogProps {
  open: boolean;
  selectedValue: DatagridUsersList;
  onClose: (value: string) => void;
}

export const EditUserDialog = (props: EditUserDialogProps) => {
  const { onClose, open } = props;

  return <Dialog onClose={onClose} open={open}></Dialog>;
};

export default EditUserDialog;
