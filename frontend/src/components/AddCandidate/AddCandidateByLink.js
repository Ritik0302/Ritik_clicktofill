import React, { useState } from 'react';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import axios from 'axios';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Container, Box, Typography } from '@mui/material';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const useQuery = () => new URLSearchParams(useLocation().search);



export default function CandidateForm() {
  const host = process.env.REACT_APP_API_URL || "http://localhost:5001";
  const frontendHost = process.env.REACT_APP_API_URL || "http:localhost:3000";

  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const [formData, setFormData] = useState({
    candidateName: '',
    contactNumber: '',
    alternateNumber: '',
    emailID: '',
    currentLocation: '',
    landmark: '',
    qualification: '',
    currentCompany: '',
    role: '',
    department: '',
    experience: '',
    industry: '',
    annualSalary: '',
    noticePeriod: '',
    gender: '',
    dob: '',
    applicationStatus: '',
    recruiterFeedback: '',
    blackList: false,
    selectionStatus: '',
    candidateStatus: '',
    offerStatus: '',
    blackListAdmin: false,
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(`${host}/api/auth/add_candidate`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      // Update starts here
      // console.log(response.data.message);
      setSnackbarMessage(response.data.message);
      if (response.data.message === "Candidate Added and Assigned" || response.data.message === "Candidate Added") {
        setSnackbarSeverity('success');
      } else {
        setSnackbarSeverity('error');
      }
      // Update ends here
    } catch (error) {
      setSnackbarMessage('Error during submission');
      setSnackbarSeverity('error');
    } finally {
      setOpen(true);
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

  // Enhanced generateLink function
  const generateLink = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // Assuming you're using tokens for authorization
      const response = await axios.get(`${host}/api/auth/generate_link`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the authorization header
        },
      });

      // Construct the shareable link using the linkToken from the response
      const baseUrl = `${frontendHost}/FormPage`; // Adjust the base URL as needed
      const shareableLink = `${baseUrl}?token=${response.data.linkToken}`; // Use the linkToken to form the link

      setSnackbarMessage(`Shareable Link Generated: ${shareableLink}`);
      setSnackbarSeverity('success');
      setOpen(true); // Open the Snackbar to show the message

      // Optional: Copy the link to the clipboard for user convenience
      navigator.clipboard.writeText(shareableLink).then(() => {
        console.log('Shareable Link copied to clipboard');
      }).catch(err => {
        console.error('Failed to copy the link to clipboard', err);
      });

    } catch (error) {
      console.error('Error generating link:', error);
      setSnackbarMessage('Error generating shareable link');
      setSnackbarSeverity('error');
      setOpen(true); // Open the Snackbar to show the error message
    }
  };

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
          Add Candidate Details
        </Typography>
        <Button variant="contained" color="secondary" onClick={generateLink}>Generate Shareable Link</Button>

        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField fullWidth label="Candidate Name" name="candidateName" value={formData.candidateName} margin="normal" onChange={handleChange} required />
          <TextField fullWidth label="Contact Number" name="contactNumber" value={formData.contactNumber} margin="normal" onChange={handleChange} required />
          <TextField fullWidth label="Alternate Number" name="alternateNumber" value={formData.alternateNumber} margin="normal" onChange={handleChange} />
          <TextField fullWidth label="Email ID" name="emailID" value={formData.emailID} margin="normal" onChange={handleChange} />
          <TextField fullWidth label="Current Location" name="currentLocation" value={formData.currentLocation} margin="normal" onChange={handleChange} />
          <TextField fullWidth label="Landmark" name="landmark" value={formData.landmark} margin="normal" onChange={handleChange} />
          <TextField fullWidth label="Qualification" name="qualification" value={formData.qualification} margin="normal" onChange={handleChange} />
          <TextField fullWidth label="Current Company" name="currentCompany" value={formData.currentCompany} margin="normal" onChange={handleChange} />
          <TextField fullWidth label="Role" name="role" value={formData.role} margin="normal" onChange={handleChange} />
          <TextField fullWidth label="Department" name="department" value={formData.department} margin="normal" onChange={handleChange} />
          <TextField fullWidth label="Experience" name="experience" value={formData.experience} margin="normal" onChange={handleChange} />
          <TextField fullWidth label="Industry" name="industry" value={formData.industry} margin="normal" onChange={handleChange} />
          <TextField fullWidth label="Annual Salary" name="annualSalary" value={formData.annualSalary} margin="normal" onChange={handleChange} />
          <TextField fullWidth label="Notice Period" name="noticePeriod" value={formData.noticePeriod} margin="normal" onChange={handleChange} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange}>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField fullWidth label="DOB" name="dob" value={formData.dob} margin="normal" onChange={handleChange} type="date" InputLabelProps={{ shrink: true }} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Application Status</InputLabel>
            <Select label="Application Status" name="applicationStatus" value={formData.applicationStatus} onChange={handleChange}>
              <MenuItem value="shortlisted">Shortlisted</MenuItem>
              <MenuItem value="notShortlisted">Not Shortlisted</MenuItem>
              <MenuItem value="rnr">RNR</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            margin="normal"
            fullWidth
          >
            <InputLabel>Recruiter Feedback</InputLabel>
            <Select
              name="recruiterFeedback"
              value={formData.recruiterFeedback}
              onChange={handleChange}
              label="Application Status"
            >
              <MenuItem value="stabilityIssue">
                STABILITY ISSUE
              </MenuItem>
              <MenuItem value="shiftIssue">
                SHIFT ISSUE
              </MenuItem>
              <MenuItem value="notFit">
                NOT FIT FOR INTERNATIONAL PROCESS
              </MenuItem>
              <MenuItem value="salaryIssue">
                SALARY ISSUE
              </MenuItem>
              <MenuItem value="poorCommunication">
                Poor Communication
              </MenuItem>
              <MenuItem value="abscondedCase">
                Absconded Case
              </MenuItem>
              <MenuItem value="notInterestedInBPO">
                Not Interested In BPO
              </MenuItem>
              <MenuItem value="interestedForWFH">
                Interested For WFH
              </MenuItem>
              <MenuItem value="overage">Over age</MenuItem>
              <MenuItem value="lookingOnlyNightShift">
                Looking only Night Shift
              </MenuItem>
              <MenuItem value="lookingOnlyDayShift">
                Looking Only Day Shift
              </MenuItem>
              <MenuItem value="technicalBackground">
                Technical Background
              </MenuItem>
              <MenuItem value="cantJoinImmediately">
                Can't Join Immediately
              </MenuItem>
              <MenuItem value="others">Others</MenuItem>
            </Select>
          </FormControl>


          <FormControl
            fullWidth
            margin="normal"
          >
            <InputLabel>Blacklist</InputLabel>
            <Select
              name="blackList"
              value={formData.blackList}
              onChange={handleChange}
              label="Application Status"
            >
              <MenuItem value="true">True</MenuItem>
              <MenuItem value="false">false </MenuItem>
            </Select>
          </FormControl>


          {accessLevel <= 0 && (<FormControl fullWidth margin="normal">
            <InputLabel>Selection Status</InputLabel>
            <Select label="Selection Status" name="selectionStatus" value={formData.selectionStatus} onChange={handleChange}>
              <MenuItem value="clientSelected">Client Selected</MenuItem>
              <MenuItem value="clientRejected">Client Rejected</MenuItem>
              {/* Add other statuses as needed */}
            </Select>
          </FormControl>)}


          {accessLevel <= 0 && (<FormControl
            fullWidth
            margin="normal"
          >
            <InputLabel>Candidate Status</InputLabel>
            <Select
              name="candidateStatus"
              value={formData.candidateStatus}
              onChange={handleChange}
              label="Application Status"
            // disabled={accessLevel > 0} // Disables the TextField based on accessLevel
            >
              <MenuItem value="joined">Joined</MenuItem>
              <MenuItem value="offerDrop">Offer Drop</MenuItem>
            </Select>
          </FormControl>)}


          {accessLevel <= 0 && (<TextField fullWidth label="Offer Status" name="offerStatus" value={formData.offerStatus} margin="normal" onChange={handleChange} />)}




          {
            accessLevel <= 0 && (
              <FormControl
                fullWidth
                margin="normal"
              >
                <InputLabel>Admin Blacklist</InputLabel>
                <Select
                  name="blackListAdmin"
                  value={formData.blackListAdmin}
                  onChange={handleChange}
                  label="Application Status"
                // disabled={accessLevel > 0} // Disables the TextField based on accessLevel
                >
                  <MenuItem value="true">True</MenuItem>
                  <MenuItem value="false">false </MenuItem>
                </Select>
              </FormControl>)
          }

          <div>
            <Button
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
            </Button>

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
                severity={snackbarMessage.includes("Added") || snackbarMessage.includes("Shareable Link Generated") ? "success" : "error"}
                variant="filled"
                sx={{
                  width: '100%',
                  bgcolor: (snackbarMessage.includes("Added") || snackbarMessage.includes("Shareable Link Generated")) ? undefined : 'error.main'
                }}
              >
                {snackbarMessage}
              </Alert>



            </Snackbar>

          </div>
        </form>

      </Box>
    </Container>
  );
}
