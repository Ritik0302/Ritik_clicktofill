import React from "react";
import { Typography, Paper, Box } from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// PaymentSuccess Component
const SuccessPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // This makes the Box take the full viewport height
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 2, // Add some padding around the Paper content
        }}
      >
        <CheckCircleOutlineIcon sx={{ color: "green", fontSize: 40 }} />
        <Typography variant="h5" component="h3">
          Form Successfully Submitted!
        </Typography>
      </Paper>
    </Box>
  );
};

export default SuccessPage;
