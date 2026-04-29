import { useState, type ReactElement } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { EditIcon, DeleteIcon } from '@utils/icons';
import IconButton from '@mui/material/IconButton';
import { useGetUsersQuery } from '@services/api';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { EditUserDialog, DeleteUserDialog } from '@components/admin/index';
import { formatDate } from '@utils/format-date';
import type { DatagridUsersList } from '@models/user.model';
import { useAlert } from '@hooks/alert-hook';
import { CustomAlert } from '@components/admin';
import { API_CONFIG } from '@config/api.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export type DialogType = 'edit' | 'delete' | 'create' | 'none';

const UsersList = (): ReactElement => {
  const [isOpenDialog, setIsOpenDialog] = useState<DialogType>('none');
  const [selectedUser, setSelectedUser] = useState<DatagridUsersList>();
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
          <IconButton
            data-test="edit-user"
            onClick={() => {
              setIsOpenDialog('edit');
              setSelectedUser(params.row);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            data-test="delete-user"
            onClick={() => {
              setIsOpenDialog('delete');
              setSelectedUser(params.row);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const isEditCreateDialogOpen = isOpenDialog === 'edit' || isOpenDialog === 'create';
  const isDeleteDialogOpen = isOpenDialog === 'delete';

  const handleCloseDeleteDialog = () => {
    setIsOpenDialog('none');
    setSelectedUser(undefined);
  };

  return (
    <>
      <Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          <h2>Lista de Usuários</h2>
          <Button
            data-test="create-user"
            variant="contained"
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            size="small"
            sx={{
              minHeight: 'unset',
              height: '38px',
              padding: '0 10px',
              boxShadow: 'none',
            }}
            onClick={() => setIsOpenDialog('create')}
          >
            Cadastrar novo
          </Button>
        </Box>
        {isFetchingUsers && <LinearProgress />}
        {isUsersError ? (
          <Typography>Erro ao carregar usuários</Typography>
        ) : (
          <Box data-test="users-list-result">
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
          </Box>
        )}
      </Box>
      <CustomAlert open={open} message={message} type={type} onClose={closeAlert} />
      {isEditCreateDialogOpen && (
        <EditUserDialog
          open={isEditCreateDialogOpen}
          onClose={handleCloseDeleteDialog}
          selectedValue={selectedUser as DatagridUsersList}
          showAlert={showAlert}
        />
      )}
      {isDeleteDialogOpen && (
        <DeleteUserDialog
          open={isDeleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          selectedValue={selectedUser as DatagridUsersList}
          showAlert={showAlert}
        />
      )}
    </>
  );
};

export default UsersList;
