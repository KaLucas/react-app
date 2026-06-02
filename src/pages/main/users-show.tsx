import { Header } from '@components/main';
import { API_CONFIG } from '@config/api.config';
import { Box, Typography, Container, Grid, Card, CardContent, Stack } from '@mui/material';
import { useGetUsersQuery } from '@services/api';
import type { ReactElement } from 'react';
import type { modeProps } from '@routes/app-routes';
import { CancelPresentationIcon } from '@utils/icons';

const UsersShow = ({ toggleTheme, mode }: modeProps): ReactElement => {
  const {
    data: usersData,
    isFetching: isFetchingUsers,
    isError: isUsersError,
  } = useGetUsersQuery({
    project_id: API_CONFIG.projectId,
  });

  return (
    <Box
      sx={{
        position: 'relative',
        top: '64px',
      }}
    >
      <Header toggleTheme={toggleTheme} mode={mode} />
      <Container sx={{ py: 6 }}>
        {isFetchingUsers && <Typography>Carregando usuários</Typography>}
        {isUsersError && <Typography>Erro ao carregar usuários</Typography>}
        {usersData?.data.length ? (
          <Grid container size={12} spacing={3}>
            {usersData?.data.map((user) => (
              <Grid size={4} key={user.id}>
                <Card
                  sx={(theme) => ({
                    borderRadius: 4,
                    border: `1px solid ${theme.palette.divider}`,
                    width: '100%',
                  })}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={(theme) => ({ color: `${theme.palette.text.primary}` })}
                    >
                      {user.data.first_name} {user.data.last_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={(theme) => ({ color: `${theme.palette.text.secondary}` })}
                    >
                      {user.data.email}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Stack spacing={1} alignItems="center">
            <CancelPresentationIcon fontSize="large" />
            <Typography>Não há usuários cadastrados</Typography>
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default UsersShow;
