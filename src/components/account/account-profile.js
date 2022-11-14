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
import { useContext, useEffect } from "react";
import UserContext from "../../contexts/user/userContext";
import User from "../../API/endpoints/user";
import { AuthContext } from "../../contexts/auth";

export const AccountProfile = (props) => {
  // Context for user selected
  const { user, updateUser } = useContext(UserContext);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      if (authToken) {
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
