import { BrowserRouter } from 'react-router-dom';
import './app.css';
import { Box, Divider } from '@mui/material';
import { Sidebar } from '@components/admin';
import { UsersList } from '@pages/admin';

function App() {
  return (
    <BrowserRouter>
      <Box display="flex" height="100vh">
        <Box p={2} mt={3}>
          <Sidebar />
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box flex={1} p={2} overflow="auto">
          <UsersList />
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
