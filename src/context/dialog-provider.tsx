import { useState, type ReactNode } from 'react';
import { DialogContext, type DialogContextType } from './dialog-context';
import type { DatagridUsersList } from '@models/user.model';

type Props = {
  children: ReactNode;
};

export function DialogProvider({ children }: Props) {
  const [isOpenDialog, setIsOpenDialog] = useState<DialogContextType['isOpenDialog']>(null);
  const [selectedValue, setSelectedValue] = useState<DatagridUsersList>();

  const openEditDialog = (user: DatagridUsersList) => {
    setSelectedValue(user);
    setIsOpenDialog('edit');
  };

  const openCreateDialog = () => {
    setSelectedValue(undefined);
    setIsOpenDialog('create');
  };
  const openDeleteDialog = () => {
    setSelectedValue(undefined);
    setIsOpenDialog('delete');
  };

  const closeDialog = () => {
    setIsOpenDialog(null);
    setSelectedValue(undefined);
  };

  return (
    <DialogContext.Provider
      value={{
        isOpenDialog,
        selectedValue,
        openEditDialog,
        openCreateDialog,
        openDeleteDialog,
        closeDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}
