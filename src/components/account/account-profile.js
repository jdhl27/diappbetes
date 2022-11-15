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

export const AccountProfile = (props) => {
  return (
    <Card
      {...props}
      sx={props.isMedical ? { backgroundColor: "#03a9f41a" } : null}
    >
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: props.isMedical ? "row" : "column",
          }}
        >
          <Avatar
            src={props.user.avatar}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Box
            sx={{
              textAlign: "center",
              marginLeft: props.isMedical ? 2 : 0,
            }}
          >
            <Typography
              color="textPrimary"
              gutterBottom
              variant={props.isMedical ? "h6" : "h5"}
            >
              {props.user.displayName}
            </Typography>
            {props.user?.city && (
              <Typography color="textSecondary" variant="body2">
                {`${props.user?.city} ${props.user?.country}`}
              </Typography>
            )}

            <Typography color="textSecondary" variant="body2">
              {props.user.isMedical
                ? "Médico"
                : props.isMedical
                ? "Mi Médico"
                : "Paciente"}
            </Typography>
            {props.isMedical ? (
              <Typography variant="body2">
                Celular: {props.user.phone} <br />
                {props.user.email}
              </Typography>
            ) : null}
          </Box>
        </Box>
      </CardContent>
      {!props.isMedical ? (
        <>
          <Divider />
          <CardActions>
            <Button color="primary" fullWidth variant="text">
              Cambiar foto
            </Button>
          </CardActions>
        </>
      ) : null}
    </Card>
  );
};
