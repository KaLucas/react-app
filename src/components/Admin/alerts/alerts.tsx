import { Alert, Snackbar } from '@mui/material';

type LoginErrorAlertProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export function LoginErrorAlert({ open, setOpen }: LoginErrorAlertProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
    >
      <Alert severity="error">Email ou senha inválidos.</Alert>
    </Snackbar>
  );
}
