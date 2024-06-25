// File: src/pages/WelcomePage.tsx

import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { SignIn, SignUp, useUser } from "@clerk/clerk-react";
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
} from "@mui/material";
import { Home, Info, ContactSupport } from "@mui/icons-material";

const drawerWidth = 240;

const WelcomePage: React.FC = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

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

  const getContent = () => {
    switch (location.pathname) {
      case "/":
        return (
          <>
            <Typography variant="h2" align="center" gutterBottom>
              Welcome to Sales Coach AI
            </Typography>
            <Typography variant="h5" align="center" paragraph>
              Unlock your sales potential with AI-powered insights and
              personalized coaching.
            </Typography>
          </>
        );
      case "/about":
        return (
          <>
            <Typography variant="h2" align="center" gutterBottom>
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
            <Typography variant="h2" align="center" gutterBottom>
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
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                textDecoration:
                  location.pathname === item.path ? "underline" : "none",
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Container maxWidth="sm">
          {getContent()}
          {isSignedIn ? (
            <Box textAlign="center" mt={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDashboardClick}
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
                >
                  Sign Up Now
                </Button>
              </Box>
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default WelcomePage;
