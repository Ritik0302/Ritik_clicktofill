import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { DataGrid } from "@mui/x-data-grid";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

// Components Imports
// import ShowConflict from "../SubComponents/ShowConflict";

// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

import {
  GridRowModes,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";

const Host = process.env.REACT_APP_API_URL || "http:localhost:5001";

const colors = {
  themeColor: "#88cc00",
  focusColor: "#99e600",
  drawerColor: "#050906",
};

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1SUQiOiI2MjA1ODI4NDEiLCJpYXQiOjE3MDU1NjM4NzAsImV4cCI6MTcwNTU2NzQ3MH0.4VIsdtRe6cCnx-nu_zdZMtGdgUiiIOEAv4PPIiKoydg";
const UploadDatav2 = () => {
  const [processing, setProcessing] = useState(false);
  const [conflict, setConflict] = useState(false);
  const [success, setSuccess] = useState(false);
  const messages = [
    "Please wait, magic is happening...",
    "Your data is embarking on a digital journey!",
    "We're diving deep into your data ocean...",
    "Crunching numbers and pondering algorithms...",
    "Our data wizards are working their magic...",
    "Almost there, weaving the final data threads...",
    "Preparing a feast of insights for you...",
    "Polishing up the last bytes of brilliance...",
    "Hang tight, just adding the finishing touches!",
    "Ready to unveil the secrets of your data very soon...",
    "Thank you for your patience, great discoveries are worth the wait!",
  ];

  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [messageIndex, setMessageIndex] = useState(0);

  // const handleFileSelect = (event) => {
  //   const file = event.target.files[0];
  //   // Ensure the file is a CSV
  //   if (file && file.type === "text/csv") {
  //     console.log("CSV file selected:", file.name);
  //     setProcessing(true);
  //     // Process the file here (e.g., read it, upload it to a server, etc.)
  //   } else {
  //     alert("Please select a CSV file.");
  //   }
  // };

  const metroCities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Kolkata",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
  ];
  const qualifications = [
    "Bachelor",
    "Master",
    "PhD",
    "Diploma",
    "Certificate",
    "Other",
  ];
  const [rows, setRows] = useState([
    // {
    //   id: 1,
    //   "Candidate Name": "John",
    //   "Contact Number": "9089897898",
    //   "Emergency Contact": "9089897898",
    //   "Email Id": "test@gmail.com",
    //   "Current Location": "Kolkata",
    //   "Preferred Location": "Delhi",
    //   Qualification: "M.A",
    // },
    // {
    //   id: 2,
    //   "Candidate Name": "John",
    //   "Contact Number": "9089897898",
    //   "Emergency Contact": "9089897898",
    //   "Email Id": "test@gmail.com",
    //   "Current Location": "Kolkata",
    //   "Preferred Location": "Delhi",
    //   Qualification: "M.A",
    // },
    // {
    //   id: 3,
    //   "Candidate Name": "John",
    //   "Contact Number": "9089897898",
    //   "Emergency Contact": "9089897898",
    //   "Email Id": "test@gmail.com",
    //   "Current Location": "Kolkata",
    //   "Preferred Location": "Delhi",
    //   Qualification: "M.A",
    // },
  ]);
  const [columns] = useState([
    { field: "id", headerName: "ID", editable: true },
    {
      field: "Candidate Name",
      headerName: "Candidate Name",
      width: 150,
      editable: true,
    },
    {
      field: "Contact Number",
      headerName: "Contact Number",
      width: 150,
      editable: true,
    },
    {
      field: "Emergency Contact",
      headerName: "Emergency Contact",
      width: 150,
      editable: true,
    },
    { field: "Email Id", headerName: "Email Id", width: 200, editable: true },
    {
      field: "Current Location",
      headerName: "Current Location",
      type: "singleSelect",
      width: 150,
      editable: true,
      valueOptions: metroCities,
    },
    {
      field: "Preferred Location",
      headerName: "Preferred Location",
      type: "singleSelect",
      width: 150,
      editable: true,
      valueOptions: metroCities,
    },
    {
      field: "Qualification",
      headerName: "Qualification",
      type: "singleSelect",
      width: 150,
      editable: true,
      valueOptions: qualifications,
    },
  ]);

  //   const handleFileSelect = (event) => {
  //     const file = event.target.files[0];

  //     // Ensure the file is a CSV
  //     if (file && file.type === "text/csv") {
  //       const reader = new FileReader();

  //       reader.onload = (e) => {
  //         const stringCsv = e.target.result;
  //         console.log("CSV file content as string:", stringCsv);
  //         setProcessing(true);
  //         console.log("host", Host);
  //         uploadCSVData(stringCsv, Host, token)
  //           .then((data) => {
  //             console.log("Success:", data);
  //             setProcessing(false);

  //             if (data.conflictCount && data.conflictCount > 0) {
  //               setConflict(true);
  //               const temp = data.conflictedData.map((item, index) => {
  //                 return {
  //                   id: index + 1, // Assigning an ID starting from 1
  //                   ...item,
  //                 };
  //               });

  //               setRows(temp);

  //               // setRows(data.conflictedData);
  //               console.log("Conficted Data: ", data.conflictedData);
  //             }
  //           })
  //           .catch((error) => console.error("An error occurred:", error));
  //         // Additional processing can be done here
  //       };

  //       reader.onerror = (e) => {
  //         alert("Error reading file");
  //       };

  //       reader.readAsText(file);
  //     } else {
  //       alert("Please select a CSV file.");
  //     }
  //   };
  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    if (
      file &&
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setProcessing(true);
      console.log("host", Host);
      uploadData(file, Host, token) // Function renamed to reflect its purpose
        .then((data) => {
          setProcessing(false);
          if (data.conflictCount && data.conflictCount > 0) {
            setConflict(true);
            const temp = data.conflictedCandidataData.map((item, index) => {
              return {
                id: index + 1, // Assigning an ID starting from 1
                ...item,
              };
            });
            setRows(temp);
            setConflict(true);
            // setRows(data.conflictedData);
            console.log("Conficted Data: ", data.conflictedCandidataData);
          } else {
            setConflict(false);
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
          // ... rest of the error handling code
        });
    } else {
      alert("Please select an XLSX file.");
    }
  };

  // Backend Calling

  //   const uploadCSVData = async (csvData, Host, token) => {
  //     // Make sure Host is correctly formatted
  //     const baseUrl = new URL(Host).origin;

  //     try {
  //       const response = await axios.post(
  //         `${baseUrl}/api/upload`, // Construct the URL with the base URL
  //         { csvData: csvData },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       console.log("Data successfully uploaded:", response.data);
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error uploading data:", error.response);
  //       throw error;
  //     }
  //   };
  // Backend Calling End
  const uploadData = async (file, Host, token) => {
    const baseUrl = new URL(Host).origin;
    const formData = new FormData();
    formData.append("file", file); // Append the file to the form data
    token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `${baseUrl}/api/upload`, // Construct the URL with the base URL
        formData, // Send form data
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Important: Set the content type to multipart/form-data
          },
        }
      );

      console.log("Data successfully uploaded:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error uploading data:", error.response);
      throw error;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % messages.length;
        setCurrentMessage(messages[nextIndex]);
        return nextIndex;
      });
    }, 2000); // Change the text every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {!conflict && !success && (
        <div
          style={{
            // background: "green",
            width: "100%",
            height: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "50px",
          }}
        >
          <div
            style={{
              border: "1px solid #808080", // Adds a gray border
              borderColor: "gray",
              borderRadius: "25px",
              // margin: "25px",
              width: "100%",
              height: "100%",
            }}
          >
            {!processing && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <input
                  accept=".xlsx"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  type="file"
                  onChange={handleFileSelect}
                />

                <CloudUploadIcon
                  style={{ fontSize: "300px", color: colors["drawerColor"] }}
                />
                <Typography style={{ color: "gray", padding: "25px" }}>
                  Upload XLXS Data
                </Typography>
                <label
                  htmlFor="raised-button-file"
                  style={{ textAlign: "center", cursor: "pointer" }}
                >
                  <Button
                    variant="contained"
                    component="span"
                    style={{ background: colors["themeColor"] }}
                  >
                    Upload Xlxs
                  </Button>
                </label>
              </div>
            )}
            {processing && (
              <>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    padding: "25px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{ marginTop: "20px", padding: "20px", color: "gray" }}
                  >
                    {currentMessage}
                  </Box>
                  <Box sx={{ width: "50%" }}>
                    <LinearProgress color="inherit" />
                  </Box>
                </Box>
              </>
            )}
          </div>
        </div>
      )}
      {conflict && !success && (
        <>
          <div
            style={{ padding: "25px", fontWeight: "700", textAlign: "center" }}
          >
            <Typography>Duplicated Data</Typography>
          </div>

          <ShowConflict
            rows={rows}
            columns={columns}
            setRows={setRows}
            conflict={conflict}
            setConflict={setConflict}
            processing={processing}
            setProcessing={setProcessing}
            Host={Host}
            token={token}
          />
        </>
      )}
      {success && (
        <>
          <div
            style={{
              width: "100%",
              height: "80%",
              display: "flex",
              flexDirection: "column", // Changed from 'row' to 'column'
              justifyContent: "center",
              alignItems: "center",
              padding: "50px",
            }}
          >
            <div
              style={{
                border: "1px solid #808080", // Adds a gray border
                borderColor: "gray",
                borderRadius: "25px",
                display: "flex",
                flexDirection: "column", // Changed from 'row' to 'column'
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <CheckCircleOutlineIcon style={{ fontSize: "250px" }} />
              <Typography style={{ textAlign: "center" }}>
                You data have successfully uploaded
              </Typography>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const ShowConflict = (props) => {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const [rows, setRows] = React.useState(props.rows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const metroCities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Kolkata",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Remote",
  ];
  const qualifications = [
    "Bachelor",
    "Master",
    "PhD",
    "Diploma",
    "Certificate",
    "Other",
    "B.A",
    "B.Sc",
    "B.com",
  ];
  const [columns] = useState([
    { field: "id", headerName: "ID", editable: true },
    {
      field: "Candidate Name",
      headerName: "Candidate Name",
      width: 150,
      editable: true,
    },
    {
      field: "Contact Number",
      headerName: "Contact Number",
      width: 150,
      editable: true,
    },
    {
      field: "Emergency Contact",
      headerName: "Emergency Contact",
      width: 150,
      editable: true,
    },
    { field: "Email Id", headerName: "Email Id", width: 200, editable: true },
    {
      field: "Current Location",
      headerName: "Current Location",
      type: "singleSelect",
      width: 150,
      editable: true,
      valueOptions: metroCities,
    },
    {
      field: "Preferred Location",
      headerName: "Preferred Location",
      type: "singleSelect",
      width: 150,
      editable: true,
      valueOptions: metroCities,
    },
    {
      field: "Qualification",
      headerName: "Qualification",
      type: "singleSelect",
      width: 150,
      editable: true,
      valueOptions: qualifications,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    console.log("Data is modified and updated to rows");

    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    props.setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const handleCellEditCommit = useCallback(
    (params) => {
      props.setRows((prevRows) => {
        const newRows = prevRows.map((row) => {
          if (row.id === params.id) {
            return { ...row, [params.field]: params.value };
          }
          return row;
        });
        return newRows;
      });
    },
    [props.setRows]
  ); // Dependency on props.setRows

  const handleDelete = () => {
    // setRowSelectionModel([]); // Clear all the rows
    props.setRows([]);
  };
  const handleDeleteSelected = () => {
    props.setRows((prevRows) =>
      prevRows.filter((row) => !rowSelectionModel.includes(row.id))
    );
  };
  const submitData = () => {
    console.log(props.rows);
    props.setConflict(false);
    props.setProcessing(true);
    console.log("Updated Data: ", props.rows);
    const submitData = {
      conflictedData: props.rows,
      remark: "",
      uID: 0,
    };
    uploadCSVData(submitData, props.Host, props.token)
      .then((data) => {
        console.log("Success:", data);
        props.setProcessing(false);

        if (data.conflictCount && data.conflictCount > 0) {
          props.setConflict(true);
          const temp = data.newConflicts.map((item, index) => {
            return {
              id: index + 1, // Assigning an ID starting from 1
              ...item,
            };
          });

          props.setRows(temp);

          // setRows(data.conflictedData);
          console.log("Conficted Data: ", data.newConflicts);
        }
      })
      .catch((error) => console.error("An error occurred:", error));
  };
  useEffect(() => {
    console.log(rowSelectionModel);
  }, [rowSelectionModel]);
  useEffect(() => {
    console.log("Row data updated ", props.rows);
    setRows(props.rows);
  }, [props.rows]);
  const uploadCSVData = async (submitData, Host, token) => {
    // Make sure Host is correctly formatted
    const baseUrl = new URL(Host).origin;
    console.log(token);
    try {
      const response = await axios.post(
        `${baseUrl}/api/upload/conflicted`, // Construct the URL with the base URL
        submitData, // Send the submitData JSON directly
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Data successfully uploaded:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error uploading data:", error.response);
      throw error;
    }
  };

  return (
    <>
      <Box>
        <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
          {/* Adjust the gap value as needed */}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDelete}
            style={{ background: "lightred" }}
          >
            Delete All Data
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteSelected}
          >
            Delete Selected Data
          </Button>
          <Button variant="contained" color="primary" onClick={submitData}>
            Submit Data
          </Button>
        </div>

        {/* <DataGrid
          checkboxSelection
          onRowSelectionModelChange={setRowSelectionModel}
          rowSelectionModel={rowSelectionModel}
          rows={props.rows}
          columns={props.columns}
          onCellEditCommit={handleCellEditCommit}
        /> */}
        {/* <DataGrid
          checkboxSelection
          onRowSelectionModelChange={setRowSelectionModel}
          rowSelectionModel={rowSelectionModel}
          rows={props.rows}
          columns={props.columns}
          onCellEditCommit={handleCellEditCommit}
        /> */}
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          //   slots={{
          //     toolbar: EditToolbar,
          //   }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
    </>
  );
};

// function EditToolbar(props) {
//   const { setRows, setRowModesModel } = props;

//   const handleClick = () => {
//     const id = randomId();
//     setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
//     setRowModesModel((oldModel) => ({
//       ...oldModel,
//       [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
//     }));
//   };

//   return (
//     <GridToolbarContainer>
//       <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
//         Add record
//       </Button>
//     </GridToolbarContainer>
//   );
// }

export default UploadDatav2;
