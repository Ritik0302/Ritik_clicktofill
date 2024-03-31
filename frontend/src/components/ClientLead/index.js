import { DataGrid } from '@mui/x-data-grid';
import { LicenseInfo } from '@mui/x-license-pro';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        `${baseUrl}/api/getAllClientData`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);

      
      const client = response.data;
      const gridWidth = document.querySelector('.MuiDataGrid-root')?.offsetWidth || window.innerWidth; // Fallback to window width
      const columnWidth = gridWidth / 9; // Divide by the number of columns

      setDataCandidates({
        rows: client.map((user) => ({
          id: user._id,
          name: `${user.firstName} ${user.lastName}`, 
          company: user.company,
          email: user.email,
          contactNumber: user.contactNumber,
          designation: user.designation,
          solution: user.solution,
          message: user.message,
          status: user.status,
          timestamp: user.timestamp,
        })),
        columns: [
          { field: "name", headerName: "Name", width: columnWidth },
          { field: "company", headerName: "Company", width: columnWidth },
          { field: "contactNumber", headerName: "Contact Number", width: columnWidth },
          { field: "designation", headerName: "Designation", width: columnWidth },
          { field: "email", headerName: "Email", width: columnWidth },
          { field: "solution", headerName: "Solution", width: columnWidth },
          { field: "message", headerName: "Message", width: columnWidth },
          { field: "status", headerName: "Status", width: columnWidth },
          // { field: "timestamp", headerName: "Apply Time", width: columnWidth },
          { 
            field: "timestamp", 
            headerName: "Apply Time", 
            width: columnWidth,
            valueGetter: (params) => {
              const date = new Date(params.row.timestamp);
              return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
            }
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

  // Other code remains the same...

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
