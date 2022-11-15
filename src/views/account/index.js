import { Box, Container, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { AccountProfile } from "../../components/account/account-profile";
import { AccountProfileDetails } from "../../components/account/account-profile-details";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import UserContext from "../../contexts/user/userContext";
import User from "../../API/endpoints/user";
import { Notify } from "../../components/notify";

const AccountUser = () => {
  // Context for user selected
  const { user } = useContext(UserContext);
  const [dataMedical, setDataMedical] = useState({});

  useEffect(() => {
    if (!user?.isMedical) {
      User.GetUserId({ id_user: user?.id_medico })
        .then((response) => {
          if (response.status >= 200 && response.status < 400) {
            setDataMedical(response?.data);
          } else {
            Notify("Ocurrió un error", "error");
          }
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    }
  }, [user]);

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
              <AccountProfile user={user} />
              {!user?.isMedical ? (
                <Box sx={{ marginTop: 2 }}>
                  <AccountProfile user={dataMedical} isMedical={true} />
                </Box>
              ) : null}
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  );
};

export default AccountUser;
