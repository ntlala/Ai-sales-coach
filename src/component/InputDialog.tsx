import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

interface InputDialogProps {
  open: boolean;
  title: string;
  fieldName: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const InputDialog: React.FC<InputDialogProps> = ({
  open,
  title,
  fieldName,
  value,
  onChange,
  onSubmit,
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={fieldName}
          type="text"
          fullWidth
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InputDialog;
