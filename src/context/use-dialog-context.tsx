import { useContext } from 'react';
import { DialogContext, type DialogContextType } from './dialog-context';

export function useDialogContext(): DialogContextType {
  const ctx = useContext(DialogContext);

  if (ctx === null) {
    throw new Error('useDialogContext deve ser usado dentro do DialogProvider');
  }

  return ctx;
}
