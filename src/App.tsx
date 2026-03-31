import { BrowserRouter } from 'react-router-dom';
import './app.css';
import { Box, Divider } from '@mui/material';
import { UsersList } from '@pages';
import { Sidebar } from '@components';

function App() {
  const openForm = () => {
    console.log('abrir formulário');
  };

  const signOut = () => {
    console.log('logout');
  };

  return (
    <BrowserRouter>
      <Box display="flex" height="100vh">
        <Box p={2} mt={3}>
          <Sidebar openForm={openForm} signOut={signOut} />
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
