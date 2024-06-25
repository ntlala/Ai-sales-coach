// File: src/pages/SignUpPage.tsx

import React from "react";
import { SignUp } from "@clerk/clerk-react";
import { Container, Typography, Box } from "@mui/material";

const SignUpPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up for Sales Coach AI
        </Typography>
        <SignUp signInUrl="/" />
      </Box>
    </Container>
  );
};

export default SignUpPage;
