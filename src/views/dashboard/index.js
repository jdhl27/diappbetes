import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import { Budget } from "../../components/graph/budget";
import { Sales } from "../../components/graph/sales";
import { TasksProgress } from "../../components/graph/tasks-progress";
import { TotalCustomers } from "../../components/graph/total-customers";
import { TotalProfit } from "../../components/graph/total-profit";
import { TrafficByDevice } from "../../components/graph/traffic-by-device";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalProfit sx={{ height: "100%" }} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalCustomers />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TasksProgress />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <Sales />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <TrafficByDevice sx={{ height: "100%" }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
