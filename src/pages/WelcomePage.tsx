
import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { SignIn, useUser } from "@clerk/clerk-react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Container,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Home, Info, ContactSupport, Menu } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const drawerWidth = 240;

// Custom theme with 3 colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue
    },
    secondary: {
      main: "#f50057", // Pink
    },
    background: {
      default: "#f5f5f5", // Light gray
    },
  },
});

const WelcomePage = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDashboardClick = () => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  };

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "About", icon: <Info />, path: "/about" },
    { text: "Contact", icon: <ContactSupport />, path: "/contact" },
  ];

  const drawer = (
    <Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            onClick={isMobile ? handleDrawerToggle : undefined}
            sx={{
              backgroundColor:
                location.pathname === item.path
                  ? theme.palette.action.selected
                  : "transparent",
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const getContent = () => {
    switch (location.pathname) {
      case "/":
        return (
          <>
            <Typography variant="h3" align="center" gutterBottom>
              Welcome to Sales Coach AI
            </Typography>
            <Typography variant="h6" align="center" paragraph>
              Unlock your sales potential with AI-powered insights and
              personalized coaching.
            </Typography>
          </>
        );
      case "/about":
        return (
          <>
            <Typography variant="h3" align="center" gutterBottom>
              About Sales Coach AI
            </Typography>
            <Typography variant="body1" paragraph>
              Sales Coach AI is an innovative platform that leverages artificial
              intelligence to provide personalized sales coaching and insights.
              Our mission is to empower sales professionals with cutting-edge
              tools and strategies to excel in their careers.
            </Typography>
          </>
        );
      case "/contact":
        return (
          <>
            <Typography variant="h3" align="center" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1" paragraph>
              Have questions or need support? Reach out to our team at:
            </Typography>
            <Typography variant="body1">
              Email: support@salescoach.ai
            </Typography>
            <Typography variant="body1">Phone: +1 (555) 123-4567</Typography>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Sales Coach AI
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Container maxWidth="md">
            {getContent()}
            {isSignedIn ? (
              <Box textAlign="center" mt={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDashboardClick}
                  size="large"
                >
                  Go to Dashboard
                </Button>
              </Box>
            ) : (
              <>
                <Box mt={4}>
                  <SignIn />
                </Box>
                <Box mt={4} textAlign="center">
                  <Typography variant="h6" gutterBottom>
                    Don't have an account?
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate("/sign-up")}
                    size="large"
                  >
                    Sign Up Now
                  </Button>
                </Box>
              </>
            )}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default WelcomePage;
