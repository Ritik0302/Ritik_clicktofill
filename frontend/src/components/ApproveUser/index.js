import { DataGrid } from '@mui/x-data-grid';
import { LicenseInfo } from '@mui/x-license-pro';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from "@mui/material/Button";


LicenseInfo.setLicenseKey(
  "3dbe39118e4a30ffaf0102fccf5a805bTz04MTk4NyxFPTE3MzY1Nzg1NDIwMDAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);


export default function DisplayData() {
  const Host = process.env.REACT_APP_API_URL || "http://localhost:5001";
  const [dataCandidates, setDataCandidates] = useState({ rows: [], columns: [] });
  const [gridHeight, setGridHeight] = useState(window.innerHeight - 100);

  // Function to fetch Candidates data from the database
  const fetchCandidates = async () => {
    const token = localStorage.getItem("accessToken");
    const baseUrl = new URL(Host).origin;

    try {
      const response = await axios.get(
        `${baseUrl}/api/users/getAllTempUser`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const tempUsers = response.data.users;
      const gridWidth = document.querySelector('.MuiDataGrid-root')?.offsetWidth || window.innerWidth; // Fallback to window width
      const columnWidth = gridWidth / 9; // Divide by the number of columns

      setDataCandidates({
        rows: tempUsers.map((user) => ({
          id: user._id,
          name: user.name,
          uID: user.uID,
          employeeID: user.employeeID,
          email: user.email,
          accessLevel: user.accessLevel,
        })),
        columns: [
          { field: "name", headerName: "Name", width: columnWidth },
          { field: "uID", headerName: "User Id", width: columnWidth },
          { field: "employeeID", headerName: "Employee Id", width: columnWidth },
          { field: "email", headerName: "Email", width: columnWidth },
          {
            field: "accessLevel",
            headerName: "Access Level",
            width: columnWidth,
            renderCell: (params) => {
              // Check the accessLevel and return the appropriate label
              return params.value > 0 ? "User" : "Admin";
            },
          },
          {
            field: "actions",
            headerName: "Actions",
            width: columnWidth,
            renderCell: (params) => (
              <Button
                variant="contained"
                color="primary"
                sx={{ marginRight: 1 }}
                onClick={() => approveCandidate(params.id)}
              >
                Approve
              </Button>
            ),
          },
        ],
      });
    } catch (error) {
      console.error('Failed to fetch Candidates:', error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // Function to approve a candidate
  const approveCandidate = async (id) => {
    const token = localStorage.getItem("accessToken");
    const baseUrl = new URL(Host).origin;
    console.log(id);

    try {
      // Send the id in the body of the request
      await axios.post(`${baseUrl}/api/auth/verifyUserByMasterAdmin`, {
        userId: id // Match the expected structure in your controller
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Optionally, refresh the data grid or show a success message
      console.log(`Candidate approved successfully.`);
      fetchCandidates(); // Refresh candidates to reflect changes
    } catch (error) {
      console.error('Failed to approve candidate:', error);
    }
  };

  return (
    <div style={{ height: gridHeight, width: '100%' }}>
      <DataGrid
        rows={dataCandidates.rows}
        columns={dataCandidates.columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
}
