import { createContext } from 'react';
import type { DatagridUsersList } from '@pages/admin/users-list';

export interface DialogContextType {
  isOpenDialog: 'edit' | 'delete' | 'create' | null;
  selectedValue?: DatagridUsersList;
  openEditDialog: (user: DatagridUsersList) => void;
  openCreateDialog: () => void;
  closeDialog: () => void;
}

export const DialogContext = createContext<DialogContextType | null>(null);
