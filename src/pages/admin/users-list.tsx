import { useState, type ReactElement } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { EditIcon, DeleteIcon } from '@utils/icons';
import IconButton from '@mui/material/IconButton';
import { useGetUsersQuery } from '@services/api';
import { Box, Typography } from '@mui/material';
import { EditUserDialog } from '@components/admin';
import { formatDate } from '@utils/date';
import { useDialogContext } from '@context/use-dialog-context';

export interface DatagridUsersList {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
}

const UsersList = (): ReactElement => {
  const { isOpenDialog, selectedValue, openEditDialog, closeDialog } = useDialogContext();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const {
    data: usersData,
    isLoading,
    isError,
    error,
  } = useGetUsersQuery({
    project_id: '7534',
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
  });

  if (isLoading) {
    return <div>Carregando filmes...</div>;
  }

  if (isError) {
    console.error('Erro ao buscar filmes:', error);
    return <div>Erro ao carregar filmes. Veja o console para detalhes.</div>;
  }

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

  const handleDelete = (id: string) => {
    console.log('Deletar:', id);
  };

  const isDialogOpen = isOpenDialog === 'edit' || isOpenDialog === 'create';

  return (
    <>
      <Box>
        <h2>Lista de Usuários</h2>
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
          }}
        />
      </Box>
      {isDialogOpen && (
        <EditUserDialog open={isDialogOpen} onClose={closeDialog} selectedValue={selectedValue} />
      )}
    </>
  );
};

export default UsersList;
