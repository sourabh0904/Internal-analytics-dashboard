import { useState } from "react";
import {
  Box,
  Toolbar,
  CssBaseline,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import Header from "../components/Header";
import Sidebar from "./Sidebar";
import UsersTable from "./UsersTable";
import OverviewCards from "./OverviewCards";
import Charts from "./Charts";

const drawerWidth = 240;

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f4f6f8" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Sidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <Header
          drawerWidth={drawerWidth}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Toolbar />

        <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Overview Cards */}
            <Grid item xs={12}>
              <OverviewCards />
            </Grid>

            {/* Charts Section */}
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: "#fff",
                  minHeight: 400,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Charts />
              </Paper>
            </Grid>

            {/* Users Table Section */}
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: "#fff",
                  minHeight: 400,
                }}
              >
                <UsersTable />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
