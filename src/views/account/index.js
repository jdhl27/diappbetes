import { Box, Container, Grid, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { AccountProfile } from "../../components/account/account-profile";
import { AccountProfileDetails } from "../../components/account/account-profile-details";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";

const AccountUser = () => {
  const token = window.localStorage.token;
  // if (token) {
    return (
      <DashboardLayout>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Typography sx={{ mb: 3 }} variant="h4">
              Mi Cuenta
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} xs={12}>
                <AccountProfile />
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                <AccountProfileDetails />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </DashboardLayout>
    );
  // }
  // return <Navigate to="/login" replace={true} />;
};

export default AccountUser;