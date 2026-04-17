import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import type { DatagridUsersList } from '@pages/admin/users-list';
import { useEditUserMutation, useCreateUserMutation } from '@services/api';

interface EditUserDialogProps {
  open: boolean;
  selectedValue?: DatagridUsersList;
  onClose: (value: string) => void;
  showAlert: (message: string, type?: 'success' | 'error') => void;
}

interface EditFormData {
  first_name: string;
  last_name: string;
  email: string;
  id?: string;
}

export const EditUserDialog = ({
  open,
  selectedValue,
  onClose,
  showAlert,
}: EditUserDialogProps) => {
  const [editUser] = useEditUserMutation();
  const [createUser] = useCreateUserMutation();
  const isEditMode = !!selectedValue?.id;

  const { register, handleSubmit, reset, formState } = useForm<EditFormData>({
    mode: 'all',
    defaultValues: selectedValue || { first_name: '', last_name: '', email: '' },
  });

  const { isSubmitting, isValid, errors } = formState;

  useEffect(() => {
    if (open) {
      if (selectedValue) {
        reset(selectedValue);
      } else {
        reset({ first_name: '', last_name: '', email: '' });
      }
    }
  }, [open, selectedValue, reset]);

  const onSubmit = async (data: EditFormData) => {
    try {
      const payload = {
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        ...(isEditMode && { id: data.id }),
      };

      if (isEditMode) {
        await editUser({ project_id: '7534', data: payload }).unwrap();
      } else {
        await createUser({ project_id: '7534', data: payload }).unwrap();
      }

      showAlert(
        isEditMode ? 'Usuário salvo com sucesso.' : 'Usuário criado com sucesso.',
        'success',
      );
      onClose('close');
    } catch (error) {
      showAlert('Erro ao salvar usuário.', 'error');
    }
  };

  const title = isEditMode ? 'Editar dados' : 'Cadastrar novo usuário';

  return (
    <Dialog open={open} onClose={() => onClose('cancel')}>
      <DialogTitle>{title}</DialogTitle>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2} mt={2}>
            <Box display="flex" gap={2}>
              <TextField
                label="Nome"
                {...register('first_name', {
                  required: 'Nome é obrigatório',
                })}
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
                fullWidth
                required
              />
              <TextField label="Sobrenome" {...register('last_name')} fullWidth />
            </Box>
            <TextField
              label="E-mail"
              type="email"
              {...register('email', {
                required: 'E-mail é obrigatório',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'E-mail inválido',
                },
              })}
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => onClose('cancel')}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            loading={isSubmitting}
            color="success"
            disabled={!isValid || isSubmitting}
          >
            {isEditMode ? 'Salvar' : 'Criar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditUserDialog;
