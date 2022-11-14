import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import UserContext from "../../contexts/user/userContext";

export const AccountProfile = (props) => {
  // Context for user selected
  const { user } = useContext(UserContext);

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {user.displayName}
          </Typography>
          {user?.city && (
            <Typography color="textSecondary" variant="body2">
              {`${user?.city} ${user?.country}`}
            </Typography>
          )}

          <Typography color="textSecondary" variant="body2">
            {user.isMedical ? "Médico" : "Paciente"}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Cambiar foto
        </Button>
      </CardActions>
    </Card>
  );
};
