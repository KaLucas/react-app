import { useState, type ReactElement } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { VisibilityIcon, EditIcon, DeleteIcon } from '@utils/icons';
import IconButton from '@mui/material/IconButton';
import { useGetUsersQuery } from '@services/api';
import { Avatar, Box } from '@mui/material';
import { EditUserDialog } from '@components';

export interface DatagridUsersList {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export const UsersList = (): ReactElement => {
  const [isOpenDialog, setIsOpenDialog] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<DatagridUsersList>();
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
    firstName: user.data.first_name,
    lastName: user.data.last_name,
    email: user.data.email,
    avatar: user.data.avatar,
  }));

  const columns: GridColDef<DatagridUsersList>[] = [
    { field: 'firstName', headerName: 'Nome', flex: 2 },
    { field: 'lastName', headerName: 'Sobrenome', flex: 1 },
    { field: 'email', headerName: 'E-mail', flex: 1 },
    {
      field: 'avatar',
      headerName: 'Imagem',
      width: 100,
      sortable: false,
      renderCell: (params) => <Avatar src={params.value} />,
    },
    {
      field: 'actions',
      headerName: 'Ações',
      sortable: false,
      filterable: false,
      flex: 1,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleViewDetails(params.row)}>
            <VisibilityIcon />
          </IconButton>

          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>

          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleViewDetails = (row: DatagridUsersList) => {
    console.log('Ver detalhes:', row);
  };

  const handleEdit = (row: DatagridUsersList) => {
    setIsOpenDialog('edit');
    setSelectedValue(row);
  };

  const handleDelete = (id: string) => {
    console.log('Deletar:', id);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(null);
  };

  return (
    <>
      <Box>
        <h2>Lista de Personagens</h2>
        <DataGrid
          rows={rows}
          columns={columns}
          paginationMode="server"
          rowCount={usersData?.total ?? 0}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
      {isOpenDialog === 'edit' && (
        <EditUserDialog
          open={isOpenDialog === 'edit'}
          onClose={handleCloseDialog}
          selectedValue={selectedValue as DatagridUsersList}
        />
      )}
    </>
  );
};

export default UsersList;
