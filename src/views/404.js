import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Page404 = () => (
  <Box
    component="main"
    sx={{
      alignItems: "center",
      justifyContent: 'center',
      display: "flex",
      flexGrow: 1,
      minHeight: "100%",
    }}
  >
    <Container maxWidth="md">
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography align="center" color="textPrimary" variant="h1">
          404: La página que buscas no está aquí
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle2">
          O intentaste una ruta sombría o viniste aquí por error. Sea lo que
          sea, intenta usar la navegación
        </Typography>
        <Button
          component="a"
          startIcon={<ArrowBackIcon fontSize="small" />}
          sx={{ mt: 3 }}
          variant="contained"
        >
          Ve devuelta
        </Button>
      </Box>
    </Container>
  </Box>
);

export default Page404;
