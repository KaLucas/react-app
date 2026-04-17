import { useState } from 'react';

type AlertType = 'success' | 'error';

export const useAlert = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<AlertType>('success');

  const showAlert = (msg: string, alertType: AlertType = 'success') => {
    setMessage(msg);
    setType(alertType);
    setOpen(true);
  };

  const closeAlert = () => setOpen(false);

  return {
    open,
    message,
    type,
    showAlert,
    closeAlert,
  };
};
