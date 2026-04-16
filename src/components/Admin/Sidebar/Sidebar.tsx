import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Box, Button } from '@mui/material';
import type { ReactElement } from 'react';
import { useDialogContext } from '@context/use-dialog-context';

export const Sidebar = (): ReactElement => {
  const { openCreateDialog } = useDialogContext();

  function handleLogout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  return (
    <Box>
      <aside>
        <nav>
          <ul className="full-list">
            <li>
              <Button type="button" onClick={openCreateDialog} variant="text">
                <FontAwesomeIcon icon={faPlus} size="lg" />
                <span className="menu-item-parent">Cadastrar Novo</span>
              </Button>
            </li>

            <li>
              <Button type="button" variant="text" onClick={() => handleLogout()}>
                <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                <span className="menu-item-parent">Logout</span>
              </Button>
            </li>
          </ul>
        </nav>
      </aside>
    </Box>
  );
};

export default Sidebar;
