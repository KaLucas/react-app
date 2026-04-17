import { useState, type ReactElement } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { EditIcon, DeleteIcon } from '@utils/icons';
import IconButton from '@mui/material/IconButton';
import { useGetUsersQuery } from '@services/api';
import { Box, LinearProgress, Typography } from '@mui/material';
import { EditUserDialog } from '@components/admin';
import { formatDate } from '@utils/format-date';
import { useDialogContext } from '@context/use-dialog-context';
import { DeleteUserDialog } from '@components/admin/dialogs';
import type { User, DatagridUsersList } from '@models/user.model';
import { useAlert } from '@hooks/alert-hook';
import { CustomAlert } from '@components/admin';
import { API_CONFIG } from '@config/api.config';

const UsersList = (): ReactElement => {
  const { isOpenDialog, selectedValue, openEditDialog, openDeleteDialog, closeDialog } =
    useDialogContext();
  const [selectedUser, setSelectedUser] = useState<User>();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const { open, message, type, showAlert, closeAlert } = useAlert();

  const {
    data: usersData,
    isFetching: isFetchingUsers,
    isError: isUsersError,
  } = useGetUsersQuery({
    project_id: API_CONFIG.projectId,
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
  });

  const rows = (usersData?.data ?? []).map((user) => ({
    id: user.id,
    first_name: user.data.first_name,
    last_name: user.data.last_name,
    email: user.data.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  }));

  const columns: GridColDef<DatagridUsersList>[] = [
    { field: 'first_name', headerName: 'Nome', flex: 1 },
    { field: 'last_name', headerName: 'Sobrenome', flex: 1 },
    { field: 'email', headerName: 'E-mail', flex: 1 },
    {
      field: 'created_at',
      headerName: 'Criado em',
      flex: 1,
      renderCell: (params) => <Typography>{formatDate(params.row.created_at)}</Typography>,
    },
    {
      field: 'updated_at',
      headerName: 'Atualizado em',
      flex: 1,
      renderCell: (params) => <Typography>{formatDate(params.row.updated_at)}</Typography>,
    },
    {
      field: 'actions',
      headerName: 'Ações',
      sortable: false,
      filterable: false,
      flex: 1,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => openEditDialog(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const isDialogOpen = isOpenDialog === 'edit' || isOpenDialog === 'create';

  const handleDelete = (id: string): void => {
    const selectedData = usersData?.data.filter((user) => user.id === id);
    setSelectedUser(selectedData?.[0]);
    openDeleteDialog();
  };

  const handleCloseDeleteDialog = () => {
    closeDialog();
    setSelectedUser(undefined);
  };

  return (
    <>
      <Box>
        <h2>Lista de Usuários</h2>
        {isFetchingUsers && <LinearProgress />}
        {isUsersError ? (
          <Typography>Erro ao carregar usuários</Typography>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            paginationMode="server"
            rowCount={usersData?.total ?? 0}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 25, 50]}
            disableRowSelectionOnClick
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            sx={{
              '& .MuiDataGrid-cell': {
                display: 'flex',
                alignItems: 'center',
              },
              opacity: isFetchingUsers ? 0.5 : 1,
            }}
          />
        )}
      </Box>
      <CustomAlert open={open} message={message} type={type} onClose={closeAlert} />
      {isDialogOpen && (
        <EditUserDialog
          open={isDialogOpen}
          onClose={closeDialog}
          selectedValue={selectedValue}
          showAlert={showAlert}
        />
      )}
      {selectedUser && (
        <DeleteUserDialog
          data={selectedUser as User}
          open={selectedUser ? true : false}
          onClose={handleCloseDeleteDialog}
          showAlert={showAlert}
        />
      )}
    </>
  );
};

export default UsersList;
