import type { User } from '@models/user.model';
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
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { API_CONFIG } from '@config/api.config';

interface DeleteUserDialogProps {
  data: User;
  open: boolean;
  onClose: (value: string) => void;
  showAlert: (message: string, type?: 'success' | 'error') => void;
}

export const DeleteUserDialog = ({
  data,
  open,
  onClose,
  showAlert,
}: DeleteUserDialogProps): ReactElement => {
  const { first_name, last_name } = data.data;
  const { id } = data;
  const [deleteUser] = useDeleteUserMutation();

  const { handleSubmit, formState } = useForm({ mode: 'all' });
  const { isSubmitting } = formState;

  const onSubmit = async () => {
    try {
      await deleteUser({ project_id: API_CONFIG.projectId, id }).unwrap();

      showAlert('Usuário deletado com sucesso.', 'success');
      onClose('close');
    } catch {
      showAlert('Erro ao deletar usuário.', 'error');
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose('cancel')}>
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
          <Button color="error" onClick={() => onClose('cancel')}>
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
