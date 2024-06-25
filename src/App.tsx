// File: src/App.tsx

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import WelcomePage from "./pages/WelcomePage";
import Dashboard from "./pages/Dashboard";
import SignUpPage from "./pages/SignUpPage";

const theme = createTheme();

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const App: React.FC = () => {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/about" element={<WelcomePage />} />
            <Route path="/contact" element={<WelcomePage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route
              path="/dashboard"
              element={
                <>
                  <SignedIn>
                    <Dashboard />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/" replace />
                  </SignedOut>
                </>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default App;
