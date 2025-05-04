import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { LogInIcon } from "lucide-react";

interface HeaderProps {
  drawerWidth: number;
  handleDrawerToggle: () => void;
  title?: string;
}

export default function Header({
  drawerWidth,
  handleDrawerToggle,
  title = "Dashboard",
}: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  //   const user = {
  //     name: "John Doe",
  //     email: "john@company.com",
  //     avatar: "JD",
  //   };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: { name: string; email: string } = jwtDecode(token);
        setUser({ name: decoded.name || "user", email: decoded.email });
        setIsLoggedIn(true);
      } catch (error) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode<JwtPayload>(token);
          if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            handleLogout();
          }
        } catch {
          handleLogout();
        }
      }
    };

    // Check every 5 minutes
    const interval = setInterval(checkTokenExpiration, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>

        {/* Center: Search Bar (optional, can remove if not needed) */}
        {!isMobile && (
          <Box
            sx={{
              position: "relative",
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.action.hover, 0.1),
              "&:hover": {
                backgroundColor: alpha(theme.palette.action.hover, 0.2),
              },
              ml: 3,
              mr: 3,
              width: "100%",
              maxWidth: 300,
            }}
          >
            <Box
              sx={{
                padding: theme.spacing(0, 2),
                height: "100%",
                position: "absolute",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Search…"
              sx={{
                color: "inherit",
                width: "100%",
                pl: 5,
                py: 0.8,
              }}
            />
          </Box>
        )}

        {/* Right: Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {isLoggedIn && (
            <Box
              sx={{ textAlign: "right", display: { xs: "none", md: "block" } }}
            >
              <Typography variant="body2">{user?.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
          )}
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              {isLoggedIn ? user?.name?.[0] || "U" : "?"}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{ sx: { mt: 1.5 } }}
          >
            {isLoggedIn ? (
              <>
                <MenuItem disabled>
                  <Typography variant="subtitle2">{user?.name}</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 1 }} /> Logout
                </MenuItem>
              </>
            ) : (
              <MenuItem onClick={() => (window.location.href = "/login")}>
                <LogInIcon sx={{ mr: 1 }} /> Login
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
