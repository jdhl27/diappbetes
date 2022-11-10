import { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  IconButton,
  Skeleton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Bell as BellIcon } from "../../icons/bell";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import { Users as UsersIcon } from "../../icons/users";
import UserContext from "../../contexts/user/userContext";
import ButtonComponent from "../button";
import { useNavigate } from "react-router-dom";
import { styles } from "../header";
import User from "../../API/endpoints/user";

import "../header/styles.css";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => {
  return {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
  };
});

export const DashboardNavbar = (props) => {
  // Context for user selected
  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      const token = window.localStorage.token;
      if (token) {
        User.GetUser()
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              updateUser(response?.data?.user);
            }
          })
          .catch((err) => {
            console.log("error: ", err);
          });
      }
    }
  }, []);

  const navigate = useNavigate();

  console.log("user: ", user);

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
    updateUser({});
    setTimeout(() => {
      navigate("/");
    }, 1000);
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
          <Tooltip title="Buscar">
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
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
                  <img src={user?.avatar} alt="..." className="avatar" />
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
