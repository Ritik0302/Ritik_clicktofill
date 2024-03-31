import { DataGrid } from "@mui/x-data-grid";
import { LicenseInfo } from "@mui/x-license-pro";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

LicenseInfo.setLicenseKey(
  "3dbe39118e4a30ffaf0102fccf5a805bTz04MTk4NyxFPTE3MzY1Nzg1NDIwMDAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function AssignData() {
  const Host = process.env.REACT_APP_API_URL || "http:localhost:5001";

  const [openAssignWindow, setOpenAssignWindow] = useState(false);
  const [dataUsers, setDataUsers] = useState({ rows: [], columns: [] }); // Initialize dataUsers state
  const [dataCandidates, setDataCandidates] = useState({ rows: [], columns: [] }); // Initialize dataCandidates state
  const [queryOptions, setQueryOptions] = useState({ filterModel: [] });
  // const [candidatePageSize, setCandidatePageSize] = useState(20);
  const [totalCandidates, setTotalCandidates] = useState();
  const [candidatePage, setCandidatePage] = useState(1);

  // Function to handle opening the assignment window
  const handleOpenAssignWindow = () => setOpenAssignWindow(true);

  // Function to handle closing the assignment window
  const handleCloseAssignWindow = () => setOpenAssignWindow(false);

  // Assuming queryOptions includes a filterModel that is an array of filter objects
  const onFilterChange = React.useCallback((newFilterModel) => {
    setQueryOptions((prevOptions) => {
      // Modify defaultFilter to treat assignedTo as a string
      const defaultFilter = { columnField: 'assignedTo', value: "" }; // Notice `value` is now a string
      let updatedFilters = prevOptions.filterModel.length ? [...prevOptions.filterModel] : [defaultFilter];

      // Check if the assignedTo filter is already present
      const assignedToFilterIndex = updatedFilters.findIndex(filter => filter.columnField === 'assignedTo');
      if (assignedToFilterIndex === -1) {
        updatedFilters.push(defaultFilter); // Add default filter if not present
      }

      if (newFilterModel.items && Array.isArray(newFilterModel.items)) {
        newFilterModel.items.forEach(item => {
          const { field, value } = item;
          const existingFilterIndex = updatedFilters.findIndex(filter => filter.columnField === field);
          if (existingFilterIndex > -1) {
            // Update existing filter to handle assignedTo as a string
            updatedFilters[existingFilterIndex] = { ...updatedFilters[existingFilterIndex], value };
          } else {
            // Add new filter
            updatedFilters.push({ columnField: field, value });
          }
        });
      } else if (typeof newFilterModel === 'object' && newFilterModel.columnField) {
        // Handle single filter object
        const existingFilterIndex = updatedFilters.findIndex(filter => filter.columnField === newFilterModel.columnField);
        if (existingFilterIndex > -1) {
          updatedFilters[existingFilterIndex] = newFilterModel;
        } else {
          updatedFilters.push(newFilterModel);
        }
      } else {
        console.error('Unexpected newFilterModel type or structure:', newFilterModel);
      }

      return { ...prevOptions, filterModel: updatedFilters };
    });
  }, []);



  useEffect(() => {
    console.log(queryOptions);
  }, [queryOptions]); // Fetch data when filter models change


  // // Function to fetch Candidates data from the database
  // const fetchCandidates = async () => {
  //   // Retrieve the token and base URL as in the initial example
  //   const token = localStorage.getItem("accessToken");
  //   const baseUrl = new URL(Host).origin; // Ensure `Host` variable is defined somewhere

  //   try {
  //     // Use the same structure for the URL and headers
  //     const response = await axios.post(
  //       `${baseUrl}/api/data/getAllDataForAssign`, // Adjusted to the specific endpoint
  //       {
  //         // Add body parameters here
  //         page: 1,
  //         // limit: 5
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const candidates = response.data.candidataData; // Assuming the response data format matches your needs
  //     // Use the retrieved data to set the state

  //     setDataCandidates({
  //       rows: candidates.map((user) => ({
  //         id: user.id,
  //         contactNumber: user.contactNumber,
  //         candidateName: user.candidateName,
  //         currentLocation: user.currentLocation,
  //         qualification: user.qualification,
  //         role: user.role,
  //         experience: user.experience,
  //       })),
  //       columns: [
  //         { field: "contactNumber", headerName: "Contact Number", flex: 1 },
  //         { field: "candidateName", headerName: "Name", flex: 1 },
  //         { field: "currentLocation", headerName: "Location", flex: 1 },
  //         { field: "qualification", headerName: "Qualification", flex: 1 },
  //         { field: "role", headerName: "Role", flex: 1 },
  //         { field: "experience", headerName: "Experience", flex: 1 },
  //       ],
  //     });
  //   } catch (error) {
  //     console.error('Failed to fetch Candidates:', error.response ? error.response : error);
  //     // Optionally handle the error more gracefully here
  //   }
  // };
  // const fetchCandidates = async () => {
  //   // Retrieve the token and base URL as in the initial example
  //   const token = localStorage.getItem("accessToken");
  //   const baseUrl = new URL(Host).origin; // Ensure `Host` variable is defined somewhere

  //   try {
  //     // Use the same structure for the URL and headers
  //     const response = await axios.post(
  //       `${baseUrl}/api/filter_candidate`, // Adjusted to the specific endpoint
  //       {
  //         page: 1,
  //         filters: queryOptions.filterModel.reduce((acc, filter) => {
  //           // Convert filter model to backend-expected format
  //           acc[filter.columnField] = filter.value;
  //           return acc;
  //         }, {}),
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const candidates = response.data.candidataData; // Assuming the response data format matches your needs
  //     // Use the retrieved data to set the state

  //     setDataCandidates({
  //       rows: candidates.map((user) => ({
  //         id: user.id,
  //         contactNumber: user.contactNumber,
  //         candidateName: user.candidateName,
  //         currentLocation: user.currentLocation,
  //         qualification: user.qualification,
  //         role: user.role,
  //         experience: user.experience,
  //       })),
  //       columns: [
  //         { field: "contactNumber", headerName: "Contact Number", flex: 1 },
  //         { field: "candidateName", headerName: "Name", flex: 1 },
  //         { field: "currentLocation", headerName: "Location", flex: 1 },
  //         { field: "qualification", headerName: "Qualification", flex: 1 },
  //         { field: "role", headerName: "Role", flex: 1 },
  //         { field: "experience", headerName: "Experience", flex: 1 },
  //       ],
  //     });
  //   } catch (error) {
  //     console.error('Failed to fetch Candidates:', error.response ? error.response : error);
  //     // Optionally handle the error more gracefully here
  //   }
  // };


  const fetchCandidates = async () => {
    const token = localStorage.getItem("accessToken");
    const baseUrl = new URL(Host).origin;

    try {
      const filtersToApply = queryOptions.filterModel.reduce((acc, filter) => {
        acc[filter.columnField] = filter.value;
        return acc;
      }, {} );

      // Ensure 'assignedTo' filter is present and set to "" if not
      if (filtersToApply.assignedTo === undefined) {
        filtersToApply.assignedTo = ""; // Default to fetching candidates with 'assignedTo' as ""
      }

      // If 'assignedTo' filter is not present or its value is "", it will fetch data accordingly
      const response = await axios.post(
        `${baseUrl}/api/filter_candidate`,
        {
          page: candidatePage,
          filters: filtersToApply,
          limit: 20
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const candidates = response.data.candidataData;
      // console.log(response.data.totalItems);
      setTotalCandidates(response.data.totalItems)
      setDataCandidates({
        rows: candidates.map((user) => ({
          id: user._id,
          contactNumber: user.contactNumber,
          candidateName: user.candidateName,
          currentLocation: user.currentLocation,
          qualification: user.qualification,
          role: user.role,
          experience: user.experience,
        })),
        columns: [
          { field: "contactNumber", headerName: "Contact Number", flex: 1 },
          { field: "candidateName", headerName: "Name", flex: 1 },
          { field: "currentLocation", headerName: "Location", flex: 1 },
          { field: "qualification", headerName: "Qualification", flex: 1 },
          { field: "role", headerName: "Role", flex: 1 },
          { field: "experience", headerName: "Experience", flex: 1 },
        ],
      });
    } catch (error) {
      console.error('Failed to fetch Candidates:', error.response ? error.response : error);
    }
  };



  const [rowSelectionModelCandidates, setRowSelectionModelCandidates] = React.useState([]);
  React.useEffect(() => {
    console.log(rowSelectionModelCandidates);
  }, [rowSelectionModelCandidates]);


  const fetchUser = async () => {
    // Retrieve the token and base URL as in the initial example
    const token = localStorage.getItem("accessToken");
    const baseUrl = new URL(Host).origin; // Ensure `Host` variable is defined somewhere

    try {
      // Use the same structure for the URL and headers
      const response = await axios.get(
        `${baseUrl}/api/users/getAllUserIDs`, // Adjusted to the specific endpoint
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (Array.isArray(response.data.users)) {
        const users = response.data.users; // Assuming the response data format matches your needs
        // Use the retrieved data to set the state
        setDataUsers({
          rows: users.map(user => ({
            id: user.uID,
            employeeID: user.employeeID,
            name: user.name,
            email: user.email,
          })),
          columns: [
            { field: "employeeID", headerName: "Employee ID", flex: 1 },
            { field: "name", headerName: "Employee Name", flex: 1 },
            { field: "email", headerName: "Email", flex: 1 },
          ],
        });

      } else {
        console.error('Data format is incorrect or data is missing');
        // Handle scenario where data is not in the expected format or is missing
        // For example, you might want to set an empty state or show an error message
      }


    } catch (error) {
      // console.log('catch');
      // console.error('Failed to fetch users:', error.response ? error.response : error);
      // Optionally handle the error more gracefully here
    }
  };

  // Use useEffect to fetch users when the component mounts
  useEffect(() => {
    fetchCandidates();
    fetchUser();
  }, []); // Fetch data when filter models change

  const fetchFilteredData = () => {
    fetchCandidates(); // This will use the current state of queryOptions
  };

// // Function to handle page size change
const handleCandidatePageSizeChange = (newPageSize) => {
  console.log(newPageSize);
  setCandidatePage(newPageSize);
  fetchCandidates(); // Refetch with the new page size
};

// Function to handle page change
const handleCandidatePageChange = (newPage) => {
  console.log(newPage);
  setCandidatePage(newPage);
  fetchCandidates(); // Refetch for the new page
};

  return (
    <div style={{ height: '96%', width: "100%" }}>
      <Button onClick={handleOpenAssignWindow}>Assign Data</Button>
      <Button onClick={fetchFilteredData} color="primary">Filter Data</Button>
      {AssignWindow(openAssignWindow, handleCloseAssignWindow, dataUsers, rowSelectionModelCandidates)}
      {/* DataGrid for candidates */}
      <DataGrid
        checkboxSelection
        // pageSize={candidatePageSize}
        onRowSelectionModelChange={setRowSelectionModelCandidates}
        rowSelectionModel={rowSelectionModelCandidates}
        getRowId={(row) => row.id}
        {...dataCandidates}
        onFilterModelChange={onFilterChange}
        onPageSizeChange={handleCandidatePageSizeChange}
        pagination
        paginationMode="server"
        page={candidatePage - 1}
        rowCount={totalCandidates}
        onPageChange={handleCandidatePageChange}
      />
    </div>
  );

}


function AssignWindow(openAssignWindow, handleCloseAssignWindow, dataUsers, rowSelectionModelCandidates) {
  const Host = process.env.REACT_APP_API_URL || "http:localhost:5001";
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  const token = localStorage.getItem("accessToken");
  const baseUrl = new URL(Host).origin;

  const finalAssign = async () => {
    console.log("Users ", rowSelectionModel);
    console.log("Candidates ", rowSelectionModelCandidates);
    try {
      const response = await axios.post(
        `${baseUrl}/api/assign`,
        {
          uid: rowSelectionModel,
          candidate_id: rowSelectionModelCandidates,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      handleCloseAssignWindow();
    } catch (error) {
      console.error("Error during the assignment process", error);
    }
  };

  return (
    <>
      <div>
        <Modal
          open={openAssignWindow}
          onClose={handleCloseAssignWindow}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, overflow: 'auto' }}> {/* Adjust style accordingly */}
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Assign To
            </Typography>
            <Box sx={{ height: 400, overflowY: 'scroll' }}> {/* Set height and make it scrollable */}
              <DataGrid
                checkboxSelection
                onRowSelectionModelChange={(newRowSelectionModel) => {
                  setRowSelectionModel(newRowSelectionModel);
                }}
                rowSelectionModel={rowSelectionModel}
                {...dataUsers}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: 2 }}> {/* Pagination-like section for the button */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => finalAssign()}
              >
                Final Assign
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
}

