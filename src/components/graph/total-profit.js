import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

export const TotalProfit = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            Nivel promedio
          </Typography>
          <Typography color="textPrimary" variant="h4">
            157
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              height: 56,
              width: 56,
            }}
          >
            <AccessAlarmIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
