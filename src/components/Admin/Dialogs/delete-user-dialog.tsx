import type { User } from '@models/user.model';
import { Alert, Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import { useDeleteUserMutation } from '@services/api';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

interface DeleteUserDialogProps {
  data: User;
  open: boolean;
  onClose: (value: string) => void;
}

export const DeleteUserDialog = ({ data, open, onClose }: DeleteUserDialogProps): ReactElement => {
  const { first_name, last_name } = data.data;
  const { id } = data;
  const [deleteUser] = useDeleteUserMutation();

  const { handleSubmit, formState } = useForm({ mode: 'all' });
  const { isSubmitting } = formState;

  const onSubmit = async () => {
    try {
      await deleteUser({ project_id: '7534', id }).unwrap();
      onClose('close');
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose('cancel')}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Confirmar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DeleteUserDialog;
