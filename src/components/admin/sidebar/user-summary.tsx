import { Card, CardContent, Typography, Box } from '@mui/material';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import type { ReactElement } from 'react';
import { formatDate } from '@utils/format-date';

type UserSummaryProps = {
  total: number;
  createdAt: string;
};

const UserSummary = ({ total, createdAt }: UserSummaryProps): ReactElement => {
  return (
    <Card
      data-test="user-summary-card"
      elevation={0}
      sx={{
        border: '1px solid #eee',
        borderRadius: 3,
        p: 1,
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <PeopleOutlineIcon sx={{ color: '#1976d2' }} />
          <Typography variant="body2" color="text.secondary">
            Total de usuários
          </Typography>
        </Box>
        <Typography data-test="sidebar-count" variant="h4" fontWeight={600}>
          {total}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Último cadastro: {formatDate(createdAt)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserSummary;
