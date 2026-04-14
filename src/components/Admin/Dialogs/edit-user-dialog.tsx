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
}

interface EditFormData {
  first_name: string;
  last_name: string;
  email: string;
  id?: string;
}

export const EditUserDialog = ({ open, selectedValue, onClose }: EditUserDialogProps) => {
  const [editUser] = useEditUserMutation();
  const [createUser] = useCreateUserMutation();
  const isEditMode = !!selectedValue?.id;

  const { register, handleSubmit, reset, formState } = useForm<EditFormData>({
    defaultValues: selectedValue || { first_name: '', last_name: '', email: '' },
  });

  const { isSubmitting, isDirty } = formState;

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
      onClose('close');
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  const title = isEditMode ? 'Editar dados' : 'Cadastrar novo usuário';

  return (
    <Dialog open={open} onClose={() => onClose('cancel')}>
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2} mt={2}>
            <Box display="flex" gap={2}>
              <TextField label="Nome" {...register('first_name')} fullWidth />
              <TextField label="Sobrenome" {...register('last_name')} fullWidth />
            </Box>
            <TextField label="E-mail" type="email" {...register('email')} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose('cancel')}>Cancelar</Button>
          <Button
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={!isDirty || isSubmitting}
          >
            {isEditMode ? 'Salvar' : 'Criar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditUserDialog;
