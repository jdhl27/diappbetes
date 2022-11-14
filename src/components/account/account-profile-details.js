import { useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import UserContext from "../../contexts/user/userContext";

const states = [
  {
    value: "colombia",
    label: "Colombia",
  },
  {
    value: "argentina",
    label: "Argentina",
  },
  {
    value: "peru",
    label: "Perú",
  },
];

export const AccountProfileDetails = (props) => {
  // Context for user selected
  const { user, updateUser } = useContext(UserContext);

  const handleChange = (event) => {
    updateUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader
          subheader="Puedes editar la información"
          title="Mi perfil"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Escribe tu nombre"
                label="Nombre"
                name="firstName"
                onChange={handleChange}
                required
                value={user.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Apellido"
                name="lastName"
                onChange={handleChange}
                required
                value={user.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Correo electrónico"
                name="email"
                onChange={handleChange}
                required
                value={user.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Número de celular"
                name="phone"
                onChange={handleChange}
                type="number"
                value={user.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Ciudad"
                name="ciudad"
                onChange={handleChange}
                required
                value={user.country}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="País"
                name="pais"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={user.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained">
            Guardar cambios
          </Button>
        </Box>
      </Card>
    </form>
  );
};
