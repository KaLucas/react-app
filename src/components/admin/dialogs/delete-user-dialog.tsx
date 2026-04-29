import type { DatagridUsersList } from '@models/user.model';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import { useDeleteUserMutation } from '@services/api';
import type { ReactElement, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { API_CONFIG } from '@config/api.config';
import type { DialogType } from '@pages/admin/users-list';

interface DeleteUserDialogProps {
  selectedValue: DatagridUsersList;
  open: boolean;
  onClose: (value: SetStateAction<DialogType>) => void;
  showAlert: (message: string, type?: 'success' | 'error') => void;
}

export const DeleteUserDialog = ({
  selectedValue,
  open,
  onClose,
  showAlert,
}: DeleteUserDialogProps): ReactElement => {
  const { first_name, last_name, id } = selectedValue;
  const [deleteUser] = useDeleteUserMutation();

  console.log('selectedValue', selectedValue);

  const { handleSubmit, formState } = useForm({ mode: 'all' });
  const { isSubmitting } = formState;

  const onSubmit = async () => {
    try {
      await deleteUser({ project_id: API_CONFIG.projectId, id }).unwrap();

      showAlert('Usuário deletado com sucesso.', 'success');
      onClose('none');
    } catch {
      showAlert('Erro ao deletar usuário.', 'error');
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose('none')}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Alert severity="warning">
            <Typography>
              Deseja deletar o usuário{' '}
              <strong>
                {first_name} {last_name}
              </strong>
              ?
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => onClose('none')}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : undefined}
          >
            {isSubmitting ? 'Deletando...' : 'Confirmar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DeleteUserDialog;
