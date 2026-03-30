import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faPen,
  faPlus,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Button } from "@mui/material";

type SidebarProps = {
  openForm: () => void;
  signOut: () => void;
};

export default function Sidebar({ openForm, signOut }: SidebarProps) {
  return (
    <Box>
      <aside>
        <nav>
          <ul className="full-list">
            <li>
              <NavLink
                to="/lista"
                title="Lista"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FontAwesomeIcon icon={faList} size="lg" />
                <span className="menu-item-parent">Filmes Publicados</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/rascunho"
                title="Rascunho"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <FontAwesomeIcon icon={faPen} size="lg" />
                <span className="menu-item-parent">Rascunho</span>
              </NavLink>
            </li>

            <li>
              <Button type="button" onClick={openForm} variant="text">
                <FontAwesomeIcon icon={faPlus} size="lg" />
                <span className="menu-item-parent">Cadastrar Novo</span>
              </Button>
            </li>

            <li>
              <Button type="button" onClick={signOut} variant="text">
                <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                <span className="menu-item-parent">Logout</span>
              </Button>
            </li>
          </ul>
        </nav>
      </aside>
    </Box>
  );
}

