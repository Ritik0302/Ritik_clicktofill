import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";

import axios from "axios";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Box,
  Typography,
} from "@mui/material";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const useQuery = () => new URLSearchParams(useLocation().search);

export default function CandidateForm() {
  const host = process.env.REACT_APP_API_URL || "http://localhost:5001";
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const [formData, setFormData] = useState({
    candidateName: "",
    candidateName: "",
    alternateNumber: "",
    emailID: "",
    currentLocation: "",
    landmark: "",
    qualification: "",
    highestQualificationStartDate: "",
    highestQualificationEndDate: "",
    currentCompany: "",
    role: "",
    department: "",
    experience: "",
    industry: "",
    annualSalary: "",
    noticePeriod: "",
    gender: "",
    dob: "",
    applicationStatus: "",
    recruiterFeedback: "",
    blackList: false,
    selectionStatus: "",
    candidateStatus: "",
    offerStatus: "",
    blackListAdmin: false,
    aadhar: "",
    pfaccount: "",
    candidateFatherName: "",
    processExpedia: "",
    age: "",
    address: "",
    city: "",
    pincode: "",
    lastCompanysName: "",
    lastCompanysStartDate: "",
    lastCompanysEndDate: "",
    inHandSalary: "",
    lastAnnualCtc: "",
    designation: "",
    employeeId: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields in formData
      // Assuming you know which fields are required, e.g., 'name' and 'email'
      const requiredFields = ["candidateName", "candidateName"]; // Add your actual required fields here
      const missingFields = requiredFields.filter((field) => !formData[field]);

      if (missingFields.length > 0) {
        // If there are missing required fields, show a message and abort submission
        setSnackbarMessage("Please fill all required fields");
        setSnackbarSeverity("error");
        setOpen(true);
        return; // Stop execution
      }

      // Retrieve the URL token from the query string
      const urlParams = new URLSearchParams(window.location.search);
      const urlToken = urlParams.get("token");

      // Prepare the data for sending
      const dataToSend = {
        ...formData,
        urlToken, // Include the URL token in the body
      };

      console.log(dataToSend);
      // Send the request with the data in the body
      const response = await axios.post(
        `${host}/api/save_link_data`,
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Redirect to SuccessPage upon successful form submission
      navigate("/SuccessPage");

      // You can set a success message here if you want
      // setSnackbarMessage('Form submitted successfully');
      // setSnackbarSeverity('success');
      // setOpen(true);
    } catch (error) {
      // Update error handling to set a generic error message
      setSnackbarMessage("Error during submission");
      setSnackbarSeverity("error");
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          mt={"14px"}
          textAlign="center"
        >
          Add Candidate Details
        </Typography>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Candidate Name"
            name="candidateName"
            value={formData.candidateName}
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Alternate Number"
            name="alternateNumber"
            value={formData.alternateNumber}
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Email ID"
            name="emailID"
            value={formData.emailID}
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Current Location"
            name="currentLocation"
            value={formData.currentLocation}
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Landmark"
            name="landmark"
            value={formData.landmark}
            margin="normal"
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Qualification</InputLabel>
            <Select
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              label="Highest Qualification"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="BA">BA</MenuItem>
              <MenuItem value="BCA">BCA</MenuItem>
              <MenuItem value="B.Sc">B.Sc</MenuItem>
              <MenuItem value="B.COM">B.COM</MenuItem>
              <MenuItem value="B.tech">B.tech</MenuItem>
              <MenuItem value="UG">UG</MenuItem>
              <MenuItem value="PG">PG</MenuItem>
              <MenuItem value="12th">12th</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Qualificaation Start Data"
            name="highestQualificationStartDate"
            type="date"
            value={formData.highestQualificationStartDate}
            onChange={handleChange}
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Qualificaation End Data"
            name="highestQualificationEndDate"
            type="date"
            value={formData.highestQualificationEndDate}
            onChange={handleChange}
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="College Name"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="University"
            name="university"
            value={formData.university}
            onChange={handleChange}
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            fullWidth
            label="Current Company"
            name="currentCompany"
            value={formData.currentCompany}
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Role"
            name="role"
            value={formData.role}
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Department"
            name="department"
            value={formData.department}
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Experience"
            name="experience"
            value={formData.experience}
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Industry"
            name="industry"
            value={formData.industry}
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Annual Salary"
            name="annualSalary"
            value={formData.annualSalary}
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Notice Period"
            name="noticePeriod"
            value={formData.noticePeriod}
            margin="normal"
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="DOB"
            name="dob"
            value={formData.dob}
            margin="normal"
            onChange={handleChange}
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Aadhar"
            name="aadhar"
            value={formData.aadhar}
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="PF Account Number"
            name="pfaccount"
            value={formData.pfaccount}
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            label="Father's Name"
            name="candidateFatherName"
            value={formData.candidateFatherName}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />

          <TextField
            label="Process Expedia"
            name="processExpedia"
            value={formData.processExpedia}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />

          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Last Company"
            name="lastCompanysName"
            value={formData.lastCompanysName}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />

          <TextField
            label="Last Company Start Data"
            name="lastCompanysStartDate"
            type="date"
            value={formData.lastCompanysStartDate}
            onChange={handleChange}
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Last Company End Data"
            name="lastCompanysEndDate"
            type="date"
            value={formData.lastCompanysEndDate}
            onChange={handleChange}
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="In Hand Salary"
            name="inHandSalary"
            value={formData.inHandSalary}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Last Annual CTC"
            name="lastAnnualCtc"
            value={formData.lastAnnualCtc}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Employee Id"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />

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

            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Alert
                onClose={handleClose}
                // severity={snackbarMessage === "Candidate Added and Assigned" ? "success" : "error"}
                severity={
                  snackbarMessage.includes("Added") ? "success" : "error"
                }
                variant="filled"
                // sx={{ width: '100%', bgcolor: snackbarMessage === "Candidate Added and Assigned" ? undefined : 'error.main' }}>
                sx={{
                  width: "100%",
                  bgcolor: snackbarMessage.includes("Added")
                    ? undefined
                    : "error.main",
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
