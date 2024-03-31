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

  // // Function to fetch Candidates data from the database

  const fetchCandidates = async () => {
    const token = localStorage.getItem("accessToken");
    const baseUrl = new URL(Host).origin;
  
    try {
      const response = await axios.get(
        `${baseUrl}/api/show_app_data`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data.data);
  
      const data = response.data.data; // Assuming this is the array of objects you've provided
      const gridWidth = document.querySelector('.MuiDataGrid-root')?.offsetWidth || window.innerWidth; // Fallback to window width
      const columnWidth = gridWidth / 7; // Adjusted for the number of columns you have data for
  
      setDataCandidates({
        rows: data.filter(item => item.data.callState === 0) // Filter to include only callState 0
          .map((item) => {
            // Assume only one log entry for simplicity, adjust if you have multiple
            const logItem = item.data.log && item.data.log.length > 0 ? item.data.log[0] : {};
      
            return {
              id: item.id,
              user: item.data.user,
              phoneNumber: item.data.phoneNumber,
              callType: item.data.callType,
              callState: item.data.callState,
              appVersion: item.data.appVersion,
              createdAt: new Date(item.createdAt).toLocaleString(),
              // Flatten log details into separate fields
              logType: logItem.type || '',
              logDuration: logItem.duration || 0,
              logDateTime: logItem.dateTime || '',
              // Assume other fields from logItem if needed
            };
          }),
        columns: [
          { field: "user", headerName: "User", width: columnWidth },
          { field: "phoneNumber", headerName: "Phone Number", width: columnWidth },
          { field: "callType", headerName: "Call Type", width: columnWidth },
          { field: "appVersion", headerName: "App Version", width: columnWidth },
          { field: "createdAt", headerName: "Created At", width: columnWidth },
          // Define columns for log details
          { field: "logType", headerName: "Log Type", width: columnWidth },
          { field: "logDuration", headerName: "Log Duration", width: columnWidth },
          { field: "logDateTime", headerName: "Log Date Time", width: columnWidth },
          // Add more columns as per logItem fields if needed
        ],
      });
      
      
    } catch (error) {
      console.error('Failed to fetch data:', error);
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
