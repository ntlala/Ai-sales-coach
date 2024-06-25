import React, { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  Card,
  CardContent,
  CardActions,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { LightbulbOutlined, TrendingUp, Groups } from "@mui/icons-material";

interface AdviceStep {
  text: string;
  icon: React.ReactElement;
}

interface AdviceDisplayProps {
  advice: string;
  summary: string;
  onDiscussionRequest: (advice: string, question: string) => void;
}

const AdviceDisplay: React.FC<AdviceDisplayProps> = ({
  advice,
  summary,
  onDiscussionRequest,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAdvice, setSelectedAdvice] = useState("");
  const [discussionQuestion, setDiscussionQuestion] = useState("");

  const adviceSteps: AdviceStep[] = [
    { text: advice.split("\n")[0], icon: <LightbulbOutlined /> },
    { text: advice.split("\n")[1], icon: <TrendingUp /> },
    { text: advice.split("\n")[2], icon: <Groups /> },
  ];

  const handleOpenDialog = (advice: string) => {
    setSelectedAdvice(advice);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDiscussionQuestion("");
  };

  const handleDiscussionRequest = () => {
    onDiscussionRequest(selectedAdvice, discussionQuestion);
    handleCloseDialog();
  };

  return (
    <Paper elevation={3} sx={{ mt: 2, p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Top 3 Sales Advice:
      </Typography>
      <Grid container spacing={2}>
        {adviceSteps.map((step, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  {step.icon}
                  <Typography variant="h6" component="div" ml={1}>
                    Tip {index + 1}
                  </Typography>
                </Box>
                <Typography variant="body1">{step.text}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => handleOpenDialog(step.text)}
                >
                  Discuss Further
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Summary:
        </Typography>
        <Typography>{summary}</Typography>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Discuss Advice</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {selectedAdvice}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Your question or comment"
            type="text"
            fullWidth
            variant="outlined"
            value={discussionQuestion}
            onChange={(e) => setDiscussionQuestion(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDiscussionRequest} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AdviceDisplay;
