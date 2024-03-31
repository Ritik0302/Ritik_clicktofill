import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const colors = {
  themeColor: "#88cc00",
  focusColor: "#99e600",
  drawerColor: "#050906",
};

const DisplayComponent = ({ data, onAccordionChange, saveData }) => {
  const Host = process.env.REACT_APP_API_URL || "http:localhost:5001";
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const [isModified, setIsModified] = useState(
    new Array(data.length).fill(false)
  );
  const [isReviewSend, setIsReviewSend] = useState(
    new Array(data.length).fill(false)
  );

  const [selectedAdmin, setSelectedAdmin] = useState('');
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    async function fetchAdmins() {
      //hardcoded path variables //  IMPORTANT //
      const token = localStorage.getItem("accessToken");
      try {
        const baseUrl = new URL(Host).origin;
        const response = await axios.get(
          `${baseUrl}/api/users/getAllAdmin`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Replace `yourAuthToken` with the actual token
            },
          }
        );
        if (response.data && response.data.users) {
          const mappedAdmins = response.data.users.map(admin => ({
            value: admin.uID,
            label: admin.name
          }));
          setAdmins(mappedAdmins);
          setSelectedAdmin(mappedAdmins);
        }
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    }
    fetchAdmins();
  }, []);

  const handleSave = async (index) => {
    const itemToSave = { ...data[index] };
    // Perform your update operation here, e.g., updating application status
    // This might already be done in your handleInputChange method

    // Assuming itemToSave now has the updated application status
    if (accessLevel <= 0) {
      await adminUpdateCandidatesdatabase(itemToSave);
    } else {
      await updateCandidatesdatabase(itemToSave);
    }

    // After saving the data successfully, reset the modification flags
    const updatedIsModified = [...isModified];
    updatedIsModified[index] = false;
    setIsModified(updatedIsModified);

    // const updatedIsReviewSend = [...isReviewSend];
    // updatedIsReviewSend[index] = true; // Assuming you want to mark it as ready for review
    // setIsReviewSend(updatedIsReviewSend);

    // Prepare the updated data array for the state update
    const newData = [...data];
    newData[index] = itemToSave; // Update the specific item in your data array

    // Now call saveData with the updated data, index, and the item's new application status
    saveData(newData, index, itemToSave.applicationStatus);
  };

  const handleCancel = (index) => {
    // const globalDataIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
    // Reset the isModified for this index
    const updatedIsModified = [...isModified];
    updatedIsModified[index] = false;
    setIsModified(updatedIsModified);
  };

  const sendReviewRequest = async (index, id) => {
    // const globalDataIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
    if (selectedAdmin) {
      console.log("Selected user uID:", selectedAdmin);
    }
    const res = {
      candidateObjId: id,
      AdminId: selectedAdmin
    };
    await sendReviewRequestByAdmin(res);
    // console.log("Review Request Send for : ", res);

    // Reset the isModified for this index
    const updatedIsReviewSend = [...isReviewSend];
    updatedIsReviewSend[index] = false;
    setIsReviewSend(updatedIsReviewSend);
  };

  var updateCandidatesdatabase = async (UpdatedData) => {
    //hardcoded path variables //  IMPORTANT //
    const token = localStorage.getItem("accessToken");
    try {
      const baseUrl = new URL(Host).origin;
      const response = await axios.post(
        `${baseUrl}/api/auth/update_candidate`,
        JSON.stringify(UpdatedData),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Replace `yourAuthToken` with the actual token
          },
        }
      );
      console.log("Response:", response.data.message);
      // console.log('Response:', response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  var adminUpdateCandidatesdatabase = async (UpdatedData) => {
    //hardcoded path variables //  IMPORTANT //
    const token = localStorage.getItem("accessToken");
    try {
      const baseUrl = new URL(Host).origin;
      const response = await axios.post(
        `${baseUrl}/api/auth/admin_update_candidate`,
        JSON.stringify(UpdatedData),
        {
          headers: {
            "Content-Type": "application/json",
            // Include other headers like authorization if needed
            Authorization: `Bearer ${token}`, // Replace `yourAuthToken` with the actual token
          },
        }
      );
      console.log("Response:", response.data.message);
      // console.log('Response:', response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  var sendReviewRequestByAdmin = async (data) => {
    //hardcoded path variables //  IMPORTANT //
    const token = localStorage.getItem("accessToken");
    try {
      const baseUrl = new URL(Host).origin;
      // const response = await axios.post(`http://localhost:5001/api/auth/update_candidate`, JSON.stringify(UpdatedData),
      const response = await axios.post(
        `${baseUrl}/api/review_candidate`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            // Include other headers like authorization if needed
            Authorization: `Bearer ${token}`, // Replace `yourAuthToken` with the actual token
          },
        }
      );
      console.log("Response:", response.data.message);
      // console.log('Response:', response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (event, index, field) => {
    // Create a new copy of the currentData for the current page
    const updatedCurrentData = data.map((item, idx) =>
      idx === index ? { ...item, [field]: event.target.value } : item
    );

    const newData = [...data];
    newData[index] = updatedCurrentData[index];
    saveData(newData);

    // Set isModified for the current index to true to enable the Save button
    const updatedIsModified = [...isModified];
    updatedIsModified[index] = true;
    setIsModified(updatedIsModified);
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
    <>
      {data.map((item, index) => (
        <div style={{ padding: "10px" }} key={index}>
          <Accordion
            key={item.contactNumber}
            onChange={() => onAccordionChange(index)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${item.contactNumber}bh-content`}
              id={`panel${item.contactNumber}bh-header`}
              style={{
                height: "100px",
              }}
            >
              <Avatar sx={{ marginRight: 2 }}>
                {item["candidateName"] ? item["candidateName"].charAt(0) : ""}
              </Avatar>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <Grid container spacing={2} alignItems="center" wrap="wrap">
                  <Grid item xs>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "gray",
                      }}
                    >
                      {item["candidateName"]}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body2">
                      {item["qualification"]}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body2">
                      {item["currentLocation"]}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <CircularProgressWithLabel
                      value={70}
                      style={{ color: colors["focusColor"] }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                component="span"
                sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}
              >
                <Grid container spacing={4} margin={"2px"}>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    borderRight={"2px solid gray"}
                    borderLeft={"2px solid gray"}
                    marginBottom={"30px"}
                  >
                    <TextField
                      name="candidateName"
                      label={"Candidate Name"}
                      defaultValue={item["candidateName"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(e, index, "candidateName", item.id)
                      }
                    />
                    <br />

                    <TextField
                      name="candidateFatherName"
                      label={"Candidate Father's Name"}
                      defaultValue={item["candidateFatherName"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          index,
                          "candidateFatherName",
                          item.id
                        )
                      }
                    />

                    <br />
                    <TextField
                      name="contactNumber"
                      label={"Contect Number"}
                      defaultValue={item["contactNumber"]}
                      variant="standard"
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                    />

                    <br />

                    <TextField
                      name="alternateNumber"
                      label={"Alternate Number"}
                      defaultValue={item["alternateNumber"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(e, index, "alternateNumber")
                      }
                    />
                    <br />

                    <TextField
                      name="age"
                      label={"Age"}
                      defaultValue={item["age"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) => handleInputChange(e, index, "age")}
                    />
                    <br />

                    <TextField
                      name="address"
                      label={"Address"}
                      defaultValue={item["address"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) => handleInputChange(e, index, "address")}
                    />
                    <br />

                    <TextField
                      name="city"
                      label={"City"}
                      defaultValue={item["city"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) => handleInputChange(e, index, "city")}
                    />
                    <br />

                    <TextField
                      name="designation"
                      label={"Designation"}
                      defaultValue={item["designation"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(e, index, "designation")
                      }
                    />
                    <br />

                    <TextField
                      name="collegeName"
                      label={"College Name"}
                      defaultValue={item["collegeName"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(e, index, "collegeName")
                      }
                    />
                    <br />

                    <TextField
                      name="university"
                      label={"University"}
                      defaultValue={item["university"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(e, index, "university")
                      }
                    />
                    <br />

                    <TextField
                      name="employeeId"
                      label={"Employee ID"}
                      defaultValue={item["employeeId"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(e, index, "employeeId")
                      }
                    />
                    <br />
                    <TextField
                      label="DOB"
                      sx={{ width: "200px" }}
                      name="dob"
                      defaultValue={item["dob"]}
                      margin="normal"
                      onChange={(e) => handleInputChange(e, index, "dob")}
                      type="date"
                      InputLabelProps={{ shrink: true }}
                    />
                    <br />

                    <TextField
                      name="emailID"
                      label={"Email Id"}
                      defaultValue={item["emailID"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) => handleInputChange(e, index, "emailID")}
                    />

                    <br />
                    {/* <TextField
                      name="remark"
                      label="Remark"
                      defaultValue={item["remark"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) => handleInputChange(e, index, "remark")}
                      multiline // This enables multiline input
                      rows={3} // Adjust the number of rows as needed to set the initial size
                      sx={{ width: "200px" }}
                    /> */}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    borderRight={"2px solid gray"}
                    marginBottom={"30px"}
                  >
                    <TextField
                      name="department"
                      label={"Department"}
                      defaultValue={item["department"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(e, index, "department")
                      }
                    />
                    <br />
                    <TextField
                      name="currentCompany"
                      label={"Current Company"}
                      defaultValue={item["currentCompany"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(e, index, "currentCompany")
                      }
                    />
                    <br />
                    <TextField
                      name="lastCompanysName"
                      label={"Last Companys Company"}
                      defaultValue={item["lastCompanysName"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(e, index, "lastCompanysName")
                      }
                    />
                    <br />
                    <TextField
                      label="Last Companys Start Date"
                      sx={{ width: "200px" }}
                      name="lastCompanysStartDate"
                      defaultValue={item["lastCompanysStartDate"]}
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(e, index, "lastCompanysStartDate")
                      }
                      type="date"
                      InputLabelProps={{ shrink: true }}
                    />
                    <br />
                    <TextField
                      label="Last Companys End Date"
                      sx={{ width: "200px" }}
                      name="lastCompanysEndDate"
                      defaultValue={item["lastCompanysEndDate"]}
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(e, index, "lastCompanysEndDate")
                      }
                      type="date"
                      InputLabelProps={{ shrink: true }}
                    />
                    <br />
                    <TextField
                      name="role"
                      label={"Role"}
                      defaultValue={item["role"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) => handleInputChange(e, index, "role")}
                    />
                    <br />
                    <TextField
                      name="industry"
                      label={"Industry"}
                      defaultValue={item["industry"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) => handleInputChange(e, index, "industry")}
                    />
                    <br />

                    <TextField
                      name="experience"
                      label={"Experience"}
                      defaultValue={item["experience"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(e, index, "experience")
                      }
                    />
                    <br />

                    <TextField
                      name="processExpedia"
                      label={"Process Expedia"}
                      defaultValue={item["processExpedia"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(e, index, "processExpedia")
                      }
                    />
                    <br />

                    <TextField
                      name="pfaccount"
                      label={"PF Account"}
                      defaultValue={item["pfaccount"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) => handleInputChange(e, index, "pfaccount")}
                    />
                    <br />

                    <TextField
                      name="aadhar"
                      label={"Aadhar"}
                      defaultValue={item["aadhar"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) => handleInputChange(e, index, "aadhar")}
                    />
                    <br />
                    <FormControl margin="normal" sx={{ width: "200px" }}>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        label="Gender"
                        name="gender"
                        defaultValue={item["gender"]}
                        onChange={(e) => handleInputChange(e, index, "gender")}
                      >
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4} marginBottom={"30px"}>
                    <TextField
                      name="currentLocation"
                      label={"Current Location"}
                      defaultValue={item["currentLocation"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(e, index, "currentLocation")
                      }
                    />
                    <br />
                    <TextField
                      name="pincode"
                      label={"Pincode"}
                      defaultValue={item["pincode"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) => handleInputChange(e, index, "pincode")}
                    />
                    <br />

                    <TextField
                      name="qualification"
                      label={"Qualification"}
                      defaultValue={item["qualification"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(e, index, "qualification")
                      }
                    />
                    <br />
                    <TextField
                      label="Qualification Start Date"
                      sx={{ width: "200px" }}
                      name="highestQualificationStartDate"
                      defaultValue={item["highestQualificationStartDate"]}
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          index,
                          "highestQualificationStartDate"
                        )
                      }
                      type="date"
                      InputLabelProps={{ shrink: true }}
                    />
                    <br />
                    <TextField
                      label="Qualification End Date"
                      sx={{ width: "200px" }}
                      name="highestQualificationEndDate"
                      defaultValue={item["highestQualificationEndDate"]}
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          index,
                          "highestQualificationEndDate"
                        )
                      }
                      type="date"
                      InputLabelProps={{ shrink: true }}
                    />
                    <br />
                    <TextField
                      name="annualSalary"
                      label={"Anual Salary"}
                      defaultValue={item["annualSalary"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(e, index, "annualSalary")
                      }
                    />
                    <br />

                    <TextField
                      name="noticePeriod"
                      label={"Notic Period"}
                      defaultValue={item["noticePeriod"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(e, index, "noticePeriod")
                      }
                    />
                    <br />

                    <TextField
                      name="inHandSalary"
                      label={"In Hand Salary"}
                      defaultValue={item["inHandSalary"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(e, index, "inHandSalary")
                      }
                    />
                    <br />

                    <TextField
                      name="lastAnnualCtc"
                      label={"Last Annual CTC"}
                      defaultValue={item["lastAnnualCtc"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(e, index, "lastAnnualCtc")
                      }
                    />
                    <br />
                    <TextField
                      name="landmark"
                      label={"Landmark"}
                      defaultValue={item["landmark"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) => handleInputChange(e, index, "landmark")}
                    />
                    <br />
                    <TextField
                      name="assignedTo"
                      label={"Assigned To"}
                      defaultValue={item["assignedTo"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) => handleInputChange(e, index, "assignedTo")}
                      disabled={true}
                    />
                    <br />
                    <FormControl sx={{ width: "200px" }} margin="normal">
                      <InputLabel>Blacklist</InputLabel>
                      <Select
                        name="blackList"
                        value={item["blackList"]}
                        onChange={(e) =>
                          handleInputChange(e, index, "blackList")
                        }
                        label="Application Status"
                      >
                        <MenuItem value="true">True</MenuItem>
                        <MenuItem value="false">false </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4} borderLeft={"2px solid gray"}>
                    <FormControl sx={{ width: "200px" }} margin="normal">
                      <InputLabel>Application Status</InputLabel>
                      <Select
                        name="applicationStatus"
                        // defaultValue={item["applicationStatus"]}
                        value={item["applicationStatus"]}
                        onChange={(e) =>
                          handleInputChange(e, index, "applicationStatus")
                        }
                        label="Application Status"
                      >
                        <MenuItem value="shortlisted">Shortlisted</MenuItem>
                        <MenuItem value="notShortlisted">
                          Not Shortlisted
                        </MenuItem>
                        <MenuItem value="rnr">RNR</MenuItem>
                      </Select>
                    </FormControl>
                    <br />
                    <TextField
                      name="offerStatus"
                      label="Offer Status"
                      defaultValue={item["offerStatus"]}
                      variant="standard"
                      margin="normal"
                      onChange={(e) =>
                        handleInputChange(e, index, "offerStatus")
                      }
                      multiline // This enables multiline input
                      rows={1} // Adjust the number of rows as needed to set the initial size
                      disabled={accessLevel > 0} // Disables the TextField based on accessLevel
                      sx={{ width: "200px" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} borderLeft={"2px solid gray"}>
                    <FormControl sx={{ width: "200px" }} margin="normal">
                      <InputLabel>Recruiter Feedback</InputLabel>
                      <Select
                        name="recruiterFeedback"
                        // defaultValue={item["recruiterFeedback"]}
                        value={item["recruiterFeedback"] || ""}
                        onChange={(e) =>
                          handleInputChange(e, index, "recruiterFeedback")
                        }
                        label="Application Status"
                      >
                        <MenuItem value="stabilityIssue">
                          STABILITY ISSUE
                        </MenuItem>
                        <MenuItem value="shiftIssue">SHIFT ISSUE</MenuItem>
                        <MenuItem value="notFit">
                          NOT FIT FOR INTERNATIONAL PROCESS
                        </MenuItem>
                        <MenuItem value="salaryIssue">SALARY ISSUE</MenuItem>
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
                    <br />
                    <FormControl sx={{ width: "200px" }} margin="normal">
                      <InputLabel>Admin Blacklist</InputLabel>
                      <Select
                        name="blackListAdmin"
                        value={item["blackListAdmin"]}
                        onChange={(e) =>
                          handleInputChange(e, index, "blackListAdmin")
                        }
                        label="Application Status"
                        disabled={accessLevel > 0} // Disables the TextField based on accessLevel
                      >
                        <MenuItem value="true">True</MenuItem>
                        <MenuItem value="false">false </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4} borderLeft={"2px solid gray"}>
                    <FormControl sx={{ width: "200px" }} margin="normal">
                      <InputLabel>Selection Status</InputLabel>
                      <Select
                        name="selectionStatus"
                        value={item["selectionStatus"]}
                        onChange={(e) =>
                          handleInputChange(e, index, "selectionStatus")
                        }
                        label="Application Status"
                        disabled={accessLevel > 0} // Disables the TextField based on accessLevel
                      >
                        <MenuItem value="clientSelected">
                          Client Selected
                        </MenuItem>
                        <MenuItem value="clientRejected">
                          Client Rejected
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <br />
                    <FormControl sx={{ width: "200px" }} margin="normal">
                      <InputLabel>Candidate Status</InputLabel>
                      <Select
                        name="candidateStatus"
                        value={item["candidateStatus"]}
                        onChange={(e) =>
                          handleInputChange(e, index, "candidateStatus")
                        }
                        label="Application Status"
                        disabled={accessLevel > 0} // Disables the TextField based on accessLevel
                      >
                        <MenuItem value="joined">Joined</MenuItem>
                        <MenuItem value="offerDrop">Offer Drop</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Box
                  style={{
                    border: "1px solid gray",
                    width: "100%",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      marginTop: 2,
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextField
                      name="remark"
                      label="Submitted Remark"
                      defaultValue={item["remark"]}
                      variant="standard"
                      margin="normal"
                      // onChange={(e) => handleInputChange(e, index, "remark")}
                      multiline // This enables multiline input
                      rows={8} // Adjust the number of rows as needed to set the initial size
                      sx={{ width: "100%", fontSize:"10px" }}
                      disabled={true}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      marginTop: 2,
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextField
                      name="remark"
                      label="Remark Input"
                      variant="standard"
                      margin="normal"
                      multiline
                      rows={4}
                      sx={{ width: "100%" }}
                      defaultValue="" // Ensure the field is initially empty
                      onChange={(e) => {
                        //   // Prepend 'submitted by user.employeeID' to the new input value, then concatenate with item["remark"]
                        //   console.log("User : ", user && user.employeeID);
                        const employeeID =
                          user && user.employeeID
                            ? `${user.employeeID} `
                            : "";
                        const employeeName =
                          user && user.name
                            ? `${user.name} `
                            : "";
                        const modifiedEvent = {
                          ...e, // Spread the original event properties
                          target: {
                            ...e.target, // Spread the original event target properties
                            value: `Submitted by ${employeeID} (${employeeName})\n\n${e.target.value}\n`, // Prepend the submitted by text to the value
                          },
                        };

                        // Call the handleInputChange function with the modified event
                        handleInputChange(modifiedEvent, index, "remark");
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginTop: 2,
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginRight: 1 }}
                      disabled={!isModified[index]}
                      onClick={() => handleSave(index)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ marginRight: 1 }}
                      disabled={!isModified[index]}
                      onClick={() => handleCancel(index)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{
                        marginRight: 1,
                        background: "#88cc00",
                        "&:hover": {
                          backgroundColor: "green", // Changes background color to green on hover
                        },
                        "&:active": {
                          backgroundColor: "darkgreen", // Changes background color to a darker green when clicked
                        },
                      }}
                      onClick={() =>
                        window.open(
                          `https://wa.me/${item["contactNumber"]}`,
                          "_blank"
                        )
                      }
                    >
                      Whatsapp
                    </Button>
                  </div>
                  {accessLevel > 0 && (
                    <div>
                      <Select
                        value={selectedAdmin}
                        onChange={(e) => {
                          const selectedAdminValue = e.target.value;
                          setSelectedAdmin(selectedAdminValue);
                          // After saving the data successfully, reset the modification flags
                          const updatedIsModified = [...isModified];
                          updatedIsModified[index] = false;
                          setIsModified(updatedIsModified);

                          const updatedIsReviewSend = [...isReviewSend];
                          updatedIsReviewSend[index] = true; // Assuming you want to mark it as ready for review
                          setIsReviewSend(updatedIsReviewSend);
                        }}
                        sx={{ marginRight: 1 }}
                      >
                        {admins.map(admin => (
                          <MenuItem key={admin.value} value={admin.value}>{admin.label}</MenuItem>
                        ))}
                      </Select>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!isReviewSend[index]}
                        onClick={() => {
                          sendReviewRequest(
                            index,
                            item["_id"] ? item["_id"] : item["id"]
                          )
                        }}
                      >
                        Send For Review
                      </Button>
                    </div>
                  )}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </>
  );
};

DisplayComponent.propTypes = {
  data: PropTypes.array.isRequired,
  onAccordionChange: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
};

export default DisplayComponent;

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};
