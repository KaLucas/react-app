import { createContext } from 'react';
import type { DatagridUsersList } from '@models/user.model';

export interface DialogContextType {
  isOpenDialog: 'edit' | 'delete' | 'create' | null;
  selectedValue?: DatagridUsersList;
  openEditDialog: (user: DatagridUsersList) => void;
  openCreateDialog: () => void;
  openDeleteDialog: () => void;
  closeDialog: () => void;
}

export const DialogContext = createContext<DialogContextType | null>(null);
