import { useContext, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AppBar,
  Badge,
  Box,
  ClickAwayListener,
  IconButton,
  Skeleton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Bell as BellIcon } from "../../icons/bell";
import { Users as UsersIcon } from "../../icons/users";
import UserContext from "../../contexts/user/userContext";
import ButtonComponent from "../button";
import { styles } from "../header";

import "../header/styles.css";
import { AuthContext } from "../../contexts/auth";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => {
  return {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
  };
});

export const DashboardNavbar = (props) => {
  // Context for user selected
  const { user, updateUser } = useContext(UserContext);
  const { updateToken } = useContext(AuthContext);

  const { onSidebarOpen, ...other } = props;
  const [openAccountPopover, setOpenAccountPopover] = useState(false);

  const name = user?.displayName?.split(" ")[0];

  const handleClick = () => {
    setOpenAccountPopover((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpenAccountPopover(false);
  };

  const onLogout = async () => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("user");
    updateUser({});
    updateToken(null);
  };

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Tooltip title="Rol">
            <h5
              className={
                user?.isMedical ? "logo-rol-medico" : "logo-rol-paciente"
              }
            >
              {user?.isMedical ? "Médico" : "Paciente"}
            </h5>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Contactos">
            <IconButton sx={{ ml: 1 }}>
              <UsersIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notificaciones">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="primary" variant="dot">
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          {Object.keys(user).length > 0 ? (
            <ClickAwayListener onClickAway={handleClickAway}>
              <Box>
                <div className="container-avatar-name" onClick={handleClick}>
                  <img
                    src={user?.avatar}
                    alt="..."
                    className={user?.isMedical ? "avatar" : "avatar-paciente"}
                  />
                  <span>Hola, {name}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="#000000"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-chevron-down "
                  >
                    <g>
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </g>
                  </svg>
                </div>

                {openAccountPopover ? (
                  <Box sx={styles.boxProfile}>
                    <h3 className="title-profile">Tu perfil, {name}</h3>
                    <div
                      className="container-avatar-info"
                      onClick={handleClick}
                    >
                      <img
                        src={user?.avatar}
                        alt="..."
                        className="avatar-long"
                      />
                      <div>
                        <h3>{user?.displayName}</h3>
                        <span style={{ color: "gray" }}>{user?.email}</span>
                        <span style={{ color: "gray" }}>{user?.phone}</span>
                      </div>
                    </div>
                    <hr className="line" />
                    <ButtonComponent
                      text="Cerrar sesión"
                      onClick={() => {
                        onLogout();
                      }}
                      style={{ backgroundColor: "#d30f0f8a" }}
                    />
                  </Box>
                ) : null}
              </Box>
            </ClickAwayListener>
          ) : (
            <div style={{ flexDirection: "row", display: "flex" }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton
                variant="text"
                width={90}
                sx={{ fontSize: "1.5rem", marginLeft: 1 }}
              />
            </div>
          )}
          {/* <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            sx={{
              cursor: 'pointer',
              height: 40,
              width: 40,
              ml: 1
            }}
            src="/static/images/avatars/avatar_1.png"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar> */}
        </Toolbar>
      </DashboardNavbarRoot>
      {/* <AccountPopover
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      /> */}
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
