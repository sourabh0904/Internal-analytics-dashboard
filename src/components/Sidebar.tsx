// components/Sidebar.tsx
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const menuItems = [
  { label: "Dashboard", icon: <DashboardIcon /> },
  { label: "Analytics", icon: <BarChartIcon /> },
  { label: "Settings", icon: <SettingsIcon /> },
  {
    label: "Logout",
    icon: <LogoutIcon />,
    onClick: () => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    },
  },
];

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
          borderRight: "1px solid #e0e0e0",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ px: 2, py: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Menu
          </Typography>
        </Box>
        <List>
          {menuItems.map(({ label, icon, onClick }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton onClick={onClick}>
                <ListItemIcon sx={{ color: "primary.main" }}>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
