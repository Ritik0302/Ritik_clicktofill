import React, { useState } from 'react';
import axios from 'axios';

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Container,
  Box,
} from "@mui/material";


// import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';




function UserForm() {
  const Host = process.env.REACT_APP_API_URL || "http:localhost:5001";
  const [open, setOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    uID: '',
    employeeID: '',
    email: '',
    password: '',
    accessLevel: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const baseUrl = new URL(Host).origin;
      // Assuming `baseUrl` and `token` are defined in your scope
      const response = await axios.post(`${baseUrl}/api/auth/createUserByMasterAdmin`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('Submission successful', response.data.message);
        setSnackbarMessage(response.data.message);
        setOpen(true);
        // Handle success response
      } else {
        console.error('Submission failed');
        // Handle non-success response
      }
    } catch (error) {
      console.error('Error during submission:', error);
      // Handle error response
    }
  }
  const handleSendForVerify = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const baseUrl = new URL(Host).origin;
      // Assuming `baseUrl` and `token` are defined in your scope
      const response = await axios.post(`${baseUrl}/api/auth/signup`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('Submission successful', response.data.message);
        setSnackbarMessage(response.data.message);
        setOpen(true);
        // Handle success response
      } else {
        console.error('Submission failed');
        // Handle non-success response
      }
    } catch (error) {
      console.error('Error during submission:', error);
      // Handle error response
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  let accessLevel = null;
  const checkAccessLevel = () => {
    try {
      const userString = localStorage.getItem("user");
      // Only parse if userString is not null
      if (userString) {
        const temp = JSON.parse(userString);
        accessLevel = temp.accessLevel;
        // console.log("accessLevel: ", accessLevel);
      } else {
        // Handle the case where the user key is not found in localStorage
        console.log("User not found in localStorage.");
      }
    } catch (error) {
      // Handle any parsing errors
      console.error("Error parsing user data from localStorage:", error);
    }
  };
  checkAccessLevel();


  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom mt={'14px'} textAlign="center">
          Add User Details
        </Typography>
        <form>
          <TextField
            label="User Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="User ID"
            name="uID"
            value={formData.uID}
            onChange={handleChange}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="employee ID"
            name="employeeID"
            value={formData.employeeID}
            onChange={handleChange}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            fullWidth
            required
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="access-level-label">Access Level</InputLabel>
            <Select
              labelId="access-level-label"
              id="accessLevel"
              name="accessLevel"
              value={formData.accessLevel}
              label="Access Level"
              onChange={handleChange}
            >
              <MenuItem value={0}>Admin</MenuItem>
              <MenuItem value={1}>User</MenuItem>
            </Select>
          </FormControl>

          <div>
            {accessLevel < 0 && (<Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                mb: 2,
                background: "#88cc00",
                "&:hover": {
                  backgroundColor: "green", // Changes background color to green on hover
                },
                "&:active": {
                  backgroundColor: "darkgreen", // Changes background color to a darker green when clicked
                },
              }}
              fullWidth
              onClick={handleSubmit}
            >
              Submit
            </Button>)}

            {accessLevel === 0 && (<Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                mb: 2,
                background: "#88cc00",
                "&:hover": {
                  backgroundColor: "green", // Changes background color to green on hover
                },
                "&:active": {
                  backgroundColor: "darkgreen", // Changes background color to a darker green when clicked
                },
              }}
              fullWidth
              onClick={handleSendForVerify}
            >
              Send For Verify User
            </Button>)}

            <Snackbar open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Alert
                onClose={handleClose}
                severity={snackbarMessage === "new user registered" ? "success" : "error"}
                variant="filled"
                sx={{ width: '100%', bgcolor: snackbarMessage === "new user registered" ? undefined : 'error.main' }}>

                {snackbarMessage}
              </Alert>
            </Snackbar>

          </div>
        </form>
      </Box>


    </Container>

  );
}

export default UserForm;
