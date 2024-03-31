import React, { useState, useEffect } from "react"; //, useRef, Suspense, lazy
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const colors = {
  themeColor: "#88cc00",
  focusColor: "#99e600",
  drawerColor: "#050906",
};

export default function MergeRequest() {
  const Host = process.env.REACT_APP_API_URL || "http:localhost:5001";
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const [data, setData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [updatedData, setUpdatedData] = useState(data);
  const [dataChangeTrigger, setDataChangeTrigger] = useState(0);// just for rerender the mergeData


  const [expandedStates, setExpandedStates] = useState(
    new Array(data.length).fill(false)
  );
  const [isModified, setIsModified] = useState(
    new Array(data.length).fill(false)
  );

  const ITEMS_PER_PAGE = 20;
  const [currentPage, setCurrentPage] = useState(1);

  var adminUpdateUserdatabase = async (UpdatedData) => {
    //hardcoded path variables //  IMPORTANT //
    const token = localStorage.getItem("accessToken");
    try {
      const baseUrl = new URL(Host).origin;
      // const response = await axios.post(`http://localhost:5001/api/auth/update_candidate`, JSON.stringify(UpdatedData),
      const response = await axios.post(
        `${baseUrl}/api/editReview`,
        JSON.stringify(UpdatedData),
        {
          headers: {
            "Content-Type": "application/json",
            // Include other headers like authorization if needed
            Authorization: `Bearer ${token}`, // Replace `yourAuthToken` with the actual token
          },
        }
      );
      console.log("Response:", response.UpdatedData);
      // console.log('Response:', response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  ////Handeler Functions>>

  const handleChange = (index) => (event, isExpanded) => {
    setExpandedStates(
      expandedStates.map((item, idx) => (idx === index ? isExpanded : item))
    );
  };

  const handleInputChange = (event, index, field) => {
    // Create a new copy of the currentData for the current page
    const updatedCurrentData = currentData.map((item, idx) =>
      idx === index ? { ...item, [field]: event.target.value } : item
    );

    // Update the global data array with changes made to the current page's data
    const globalDataIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
    const newData = [...data];
    newData[globalDataIndex] = updatedCurrentData[index];

    // Update the data state with the new array
    setData(newData);

    // Set isModified for the current index to true to enable the Save button
    const updatedIsModified = [...isModified];
    updatedIsModified[globalDataIndex] = true;
    setIsModified(updatedIsModified);
  };

  // When saving or cancelling, ensure you handle the state update correctly
  const handleSave = async (index) => {
    const globalDataIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
    const itemToSave = data[globalDataIndex];
    // Make sure to prepare the item correctly for the backend operation
    if (accessLevel <= 0) {
      console.log("Item to save : ", itemToSave);
      console.log(reviewData[index]);
      const temp = {
        ownerDoc: itemToSave,
        ownerUID: reviewData[index].uid,
        ownerDocID: itemToSave["_id"],
      };
      // console.log("Data ", temp);
      await adminUpdateUserdatabase(temp);
    } else {
    }

    // Reset the isModified for this index
    const updatedIsModified = [...isModified];
    updatedIsModified[globalDataIndex] = false;
    setIsModified(updatedIsModified);
  };

  const handleCancel = (index) => {
    // Handle cancel logic here
    // Reset the isModified for this index
    const updatedIsModified = [...isModified];
    updatedIsModified[index] = false;
    setIsModified(updatedIsModified);
  };

  // Admin Backend Calling End
  const getAdminAllDocs = async (Host) => {
    const token = localStorage.getItem("accessToken");
    const baseUrl = new URL(Host).origin;
    try {
      const response = await axios.get(
        `${baseUrl}/api/getAllReviews`, // Use the GET method
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Data successfully retrieved:", response.data);
      return response.data;
    } catch (error) {
      //   console.error("Error retrieving data:", error.response);
      throw error;
    }
  };

  useEffect(() => {
    // console.log("Admin Access Data : ");
    if (accessLevel <= 0) {
      const getadmindata = async () => {
        try {
          let dataTemp = await getAdminAllDocs(Host);
          if (Array.isArray(dataTemp) && dataTemp.length > 0) {
            // Initialize an array to hold the owerDocs
            const ownerDocs = dataTemp.map((item) => item.ownerDoc);
            // console.log("Owner Docs ", ownerDocs);
            // Set the owerDocs array using setData
            setData(ownerDocs);
            setReviewData(dataTemp);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setData([]); // Set data to an empty array in case of an error
        }
      };
      getadmindata();
    } else {
    }
  }, [dataChangeTrigger]);

  //   const ITEMS_PER_PAGE = 20;
  //   const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  let currentData;
  if (data) {
    // console.log("I am Data : ",data);
    // Slice data for current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    currentData = data.slice(startIndex, endIndex);
  }

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  let accessLevel = null;
  const checkAccessLevel = () => {
    try {
      const userString = localStorage.getItem("user");
      // Only parse if userString is not null
      if (userString) {
        const temp = JSON.parse(userString);
        accessLevel = temp.accessLevel;
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

  const mergeDataRequest = async (id, index) => {
    // Assuming `id` is the identifier for the candidate you want to merge
    // and you have the correct endpoint set up in your backend to handle the merge operation.
    const globalDataIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
    const itemToSave = data[globalDataIndex];
    // Make sure to prepare the item correctly for the backend operation
    // console.log("Item to save : ", itemToSave);

    const mergeData = {
      candidateObjId: id, // This might need to be adjusted based on your backend requirements
      item: itemToSave
    };

    try {
      const token = localStorage.getItem("accessToken");
      const baseUrl = new URL(Host).origin;
      const response = await axios.post(
        `${baseUrl}/api/mergeData`, // Adjust this endpoint to match your backend API
        JSON.stringify(mergeData),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Merge Response:", response.data);
      // After successful merge, you may want to update the UI or state accordingly
      setDataChangeTrigger((prev) => prev + 1);
      console.log(dataChangeTrigger);
    } catch (error) {
      console.error("Error during merge operation:", error);
    }
  };

  return (
    <>
      <div>
        {data && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </Button>
              <span style={{ margin: "0 10px" }}>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </Button>
            </div>
            {currentData ? (
              currentData.map((item, index) => (
                <div style={{ padding: "10px" }} key={index}>
                  <Accordion
                    key={item}
                    expanded={expandedStates[index]}
                    onChange={handleChange(index)}
                    sx={{
                      borderRadius: "10px",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${item.id}bh-content`}
                      id={`panel${item.id}bh-header`}
                      style={{
                        height: "100px",
                      }}
                    >
                      <Avatar sx={{ marginRight: 2 }}>
                        {item["candidateName"]
                          ? item["candidateName"].charAt(0)
                          : ""}
                      </Avatar>

                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          flexGrow: 1,
                        }}
                      >
                        <Grid
                          container
                          spacing={2}
                          alignItems="center"
                          wrap="wrap"
                        >
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
                              multiline // This enables multiline input
                              rows={8} // Adjust the number of rows as needed to set the initial size
                              sx={{ width: "100%" }}
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
                                const employeeID =
                                  user && user.employeeID
                                    ? `${user.employeeID}`
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
                          sx={{ display: "flex", marginTop: 2, width: "100%", justifyContent: "space-between" }}
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
                              disabled={!isModified[index]}
                              onClick={() => handleCancel(index)}
                            >
                              Cancel
                            </Button>
                          </div>
                          {
                            accessLevel <= 0 && (
                              <Button
                                variant="contained"
                                color="primary"
                                sx={{ marginRight: 1 }}
                                onClick={() => {
                                  // mergeDataRequest(item["id"], index);
                                  mergeDataRequest(item["_id"] ? item["_id"] : item["id"], index);
                                }}
                              >
                                Merge Data
                              </Button>
                            )
                          }
                        </Box>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))
            ) : (
              <p>Data not assigned</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

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
