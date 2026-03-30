import type { ReactElement } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { VisibilityIcon, EditIcon, DeleteIcon } from "../../icons";
import IconButton from "@mui/material/IconButton";
import { useGetUsersQuery } from "../../services/api";
import { Avatar } from "@mui/material";

interface DatagridUsersList {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export const UsersList = (): ReactElement => {
  const {
    data: usersData,
    isLoading,
    isError,
    error,
  } = useGetUsersQuery({ project_id: "7534" });

  if (isLoading) {
    return <div>Carregando filmes...</div>;
  }

  if (isError) {
    console.error("Erro ao buscar filmes:", error);
    return <div>Erro ao carregar filmes. Veja o console para detalhes.</div>;
  }

  const rows = (usersData?.data ?? []).map((user) => ({
    id: user.id,
    firstName: user.data.first_name,
    lastName: user.data.last_name,
    email: user.data.email,
    avatar: user.data.avatar,
  }));

  console.log("usersData?.data", usersData);

  const columns: GridColDef<DatagridUsersList>[] = [
    { field: "firstName", headerName: "Nome", flex: 2 },
    { field: "lastName", headerName: "Sobrenome", flex: 1 },
    { field: "email", headerName: "E-mail", flex: 1 },
    {
      field: "avatar",
      headerName: "Imagem",
      width: 100,
      sortable: false,
      renderCell: (params) => <Avatar src={params.value} />,
    },
    {
      field: "actions",
      headerName: "Ações",
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
    console.log("Ver detalhes:", row);
  };

  const handleEdit = (row: DatagridUsersList) => {
    console.log("Editar:", row);
  };

  const handleDelete = (id: string) => {
    console.log("Deletar:", id);
  };

  return (
    <div className="movie-list">
      <h2>Lista de Usuários</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default UsersList;

