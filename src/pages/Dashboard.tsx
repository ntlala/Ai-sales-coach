// File: src/pages/Dashboard.tsx

import React, { useState } from "react";
import { UserButton } from "@clerk/clerk-react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { LightbulbOutlined, TrendingUp, Groups } from "@mui/icons-material";

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const Dashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(true);
  const [industry, setIndustry] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [advice, setAdvice] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const chat = model.startChat({
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
      });

      const prompt = `You are a sales coach. Based on the following information, provide concise, step-by-step sales advice:
      Industry: ${industry}
      Company Description: ${companyDescription}
      Job Description: ${jobDescription}
      
      Please provide exactly 3 specific, actionable steps to help improve sales performance. Each step should be on a new line and be concise.`;

      const result = await chat.sendMessage(prompt);
      setAdvice(result.response.text().split("\n"));

      // Generate summary
      const summaryPrompt = `Summarize our conversation and the advice given. Include key points about the industry (${industry}), company (${companyDescription}), and job role (${jobDescription}). Conclude with the main takeaways from the advice. write it in bullet points. write in a readable format.`;
      const summaryResult = await chat.sendMessage(summaryPrompt);
      setSummary(summaryResult.response.text());

      setShowForm(false);
    } catch (error) {
      console.error("Error generating advice:", error);
      setAdvice([
        "An error occurred while generating advice. Please try again.",
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleReenterForm = () => {
    setShowForm(true);
    setAdvice([]);
    setSummary("");
  };

  const icons = [<LightbulbOutlined />, <TrendingUp />, <Groups />];

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">Sales Coach AI Dashboard</Typography>
        <UserButton />
      </Box>

      {showForm ? (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Company Description"
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              margin="normal"
              required
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              label="Job Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              margin="normal"
              required
              multiline
              rows={3}
            />
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Get Advice"}
              </Button>
            </Box>
          </form>
        </Paper>
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            Sales Advice:
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {advice.map((tip, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      {icons[index]}
                      <Typography variant="h6" component="div" ml={1}>
                        Tip {index + 1}
                      </Typography>
                    </Box>
                    <Typography variant="body1">{tip}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Summary:
            </Typography>
            <Typography variant="body1">{summary}</Typography>
          </Paper>

          <Box mt={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleReenterForm}
            >
              Re-enter Information
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
