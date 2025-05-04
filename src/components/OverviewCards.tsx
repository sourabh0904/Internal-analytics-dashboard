import { Grid, Paper, Typography } from "@mui/material";

const data = [
  { label: "Total Users", value: 1200 },
  { label: "Active Sessions", value: 87 },
  { label: "Feedback Score", value: "4.5/5" },
];

export default function OverviewCards() {
  return (
    <Grid container spacing={3} mb={3}>
      {data.map((item, idx) => (
        <Grid item xs={12} sm={4} key={idx}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {item.label}
            </Typography>
            <Typography variant="h5">{item.value}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
