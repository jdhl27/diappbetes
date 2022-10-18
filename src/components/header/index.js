import React, { useState } from "react";
import { Box, ClickAwayListener } from "@mui/material";
import Logo from "../logo";
import "./styles.css";
import ButtonComponent from "../button";

function Header({ userData = null, onLogout = {} }) {
  const [open, setOpen] = useState(false);
  const name = userData?.displayName?.split(" ")[0];

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <div className="container-navbar">
      <Logo styles={{ paddingLeft: "42px" }} widthLogo={"150px"} />
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box>
          <div className="container-avatar-name" onClick={handleClick}>
            <img src={userData?.avatar} alt="..." className="avatar" />
            <span>Hola, {name}</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
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

          {open ? (
            <Box sx={styles.boxProfile}>
              <h3 className="title-profile">Tu perfil, {name}</h3>
              <div className="container-avatar-info" onClick={handleClick}>
                <img src={userData?.avatar} alt="..." className="avatar-long" />
                <div>
                  <h3>{userData?.displayName}</h3>
                  <span style={{ color: "gray" }}>{userData?.email}</span>
                  <span style={{ color: "gray" }}>{userData?.phone}</span>
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
    </div>
  );
}

export const styles = {
  boxProfile: {
    color: "black",
    position: "absolute",
    backgroundColor: "white",
    boxShadow: "rgb(0 0 0 / 8%) 1px 2px 10px",
    borderRadius: "5px",
    padding: "11px",
    paddingLeft: "28px",
    width: "300px",
    right: "15px",
  },
};

export default Header;
