import PropTypes from "prop-types";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import { ChartBar as ChartBarIcon } from "../../icons/chart-bar";
import { Cog as CogIcon } from "../../icons/cog";
import { User as UserIcon } from "../../icons/user";
import { Users as UsersIcon } from "../../icons/users";
import { Observations as ObservationsIcon } from "../../icons/observation";
import { Pen as PencilIcon } from "../../icons/pen";
import { NavItem } from "./nav-item";
import Logo from "../logo";
import { useContext } from "react";
import UserContext from "../../contexts/user/userContext";

export const DashboardSidebar = (props) => {
  // Context for user selected
  const { user } = useContext(UserContext);

  let items = [];

  if (user?.isMedical) {
    items = [
      {
        href: "/pacientes",
        icon: <UsersIcon fontSize="small" />,
        title: "Pacientes",
      },
      {
        href: "/cuenta",
        icon: <UserIcon fontSize="small" />,
        title: "Mi Cuenta",
      },
      {
        href: "/configuraciones",
        icon: <CogIcon fontSize="small" />,
        title: "Configuraciones",
      },
    ];
  } else {
    items = [
      {
        href: "/",
        icon: <ChartBarIcon fontSize="small" />,
        title: "Reportes",
      },
      {
        href: "/glucosa",
        icon: <PencilIcon fontSize="small" />,
        title: "Registros Glucosa",
      },
      {
        href: "/observaciones",
        icon: <ObservationsIcon fontSize="small" />,
        title: "Observaciones",
      },
      {
        href: "/cuenta",
        icon: <UserIcon fontSize="small" />,
        title: "Mi Cuenta",
      },
      {
        href: "/configuraciones",
        icon: <CogIcon fontSize="small" />,
        title: "Configuraciones",
      },
    ];
  }

  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ paddingX: 4, paddingBottom: 3 }}>
            <Logo styles={{ color: "#ffff" }} widthLogo={"150px"} />
          </Box>
        </div>

        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
