import { Snackbar, Alert } from '@mui/material';

interface CustomAlertProps {
  open: boolean;
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const CustomAlert = ({ open, message, type, onClose }: CustomAlertProps) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      autoHideDuration={3000}
      onClose={(_, reason) => {
        if (reason === 'clickaway') return;
        onClose();
      }}
    >
      <Alert severity={type} sx={{ width: '300px' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
