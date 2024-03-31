import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { LicenseInfo } from "@mui/x-license-pro";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// Firebase
import { db } from "../../Pages/Auth/Firebase/firebase";
import { getDatabase, ref, onValue, off, get, remove } from "firebase/database";

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

export default function LoginHours() {
  const [openAssignWindow, setOpenAssignWindow] = React.useState(false);
  //   const handleOpenAssignWindow = () => setOpenAssignWindow(true);
  const handleCloseAssignWindow = () => setOpenAssignWindow(false);

  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 10,
    maxColumns: 6,
  });

  const dataUsers = {
    rows: [
      { id: 1, name: "John", employeeid: "EM235" },
      { id: 2, name: "Jane", employeeid: "EM233" },
    ],
    columns: [
      { field: "id", headerName: "ID" },
      { field: "name", headerName: "Name" },
      { field: "employeeid", headerName: "EmployeeID" },
    ],
  };
  const [activeUsers, setActiveUsers] = useState();
  //   const sessionHours = [
  //     "2024-02-07T10:54:11.616Z",
  //     "2024-02-07T11:04:11.616Z",
  //     "2024-02-07T11:14:11.616Z",
  //     "2024-02-07T11:24:11.616Z",
  //     "2024-02-07T11:34:11.616Z",
  //     "2024-02-07T11:44:11.616Z",
  //     "2024-02-07T11:54:11.616Z",
  //     "2024-02-07T12:04:11.616Z",
  //     "2024-02-07T12:14:11.616Z",
  //     "2024-02-07T12:24:11.616Z",
  //     "2024-02-07T12:34:11.616Z",
  //     "2024-02-07T12:44:11.616Z",
  //     "2024-02-07T12:54:11.616Z",
  //     "2024-02-07T13:04:11.616Z",
  //     "2024-02-07T13:14:11.616Z",
  //     "2024-02-07T13:24:11.616Z",
  //     "2024-02-07T13:34:11.616Z",
  //     "2024-02-07T13:44:11.616Z",
  //     "2024-02-07T13:54:11.616Z",
  //     "2024-02-07T14:04:11.616Z",
  //     "2024-02-07T14:14:11.616Z",
  //     "2024-02-07T14:24:11.616Z",
  //     "2024-02-07T14:34:11.616Z",
  //     "2024-02-07T14:44:11.616Z",
  //     "2024-02-07T14:54:11.616Z",
  //     "2024-02-07T15:04:11.616Z",
  //     "2024-02-07T15:14:11.616Z",
  //     "2024-02-07T15:24:11.616Z",
  //     "2024-02-07T15:34:11.616Z",
  //     "2024-02-07T15:44:11.616Z",
  //     "2024-02-07T15:54:11.616Z",
  //     "2024-02-07T16:04:11.616Z",
  //     "2024-02-07T16:14:11.616Z",
  //     "2024-02-07T16:24:11.616Z",
  //     "2024-02-07T16:34:11.616Z",
  //     "2024-02-07T16:44:11.616Z",
  //     "2024-02-07T16:54:11.616Z",
  //     "2024-02-07T17:04:11.616Z",
  //     "2024-02-07T17:14:11.616Z",
  //     "2024-02-07T17:24:11.616Z",
  //     "2024-02-07T17:34:11.616Z",
  //     "2024-02-07T17:44:11.616Z",
  //     "2024-02-07T17:54:11.616Z",
  //     "2024-02-07T18:04:11.616Z",
  //     "2024-02-07T18:14:11.616Z",
  //     "2024-02-07T18:24:11.616Z",
  //     "2024-02-07T18:34:11.616Z",
  //     "2024-02-07T18:44:11.616Z",
  //     "2024-02-07T18:54:11.616Z",
  //   ];

  const calculateTotalActiveHours = (timestamps) => {
    // timestamps = sessionHours;
    const dates = Object.values(timestamps)
      .map((timestamp) => new Date(timestamp))
      .sort((a, b) => a - b);

    let totalActiveTimeMs = 0; // Total active time in milliseconds
    const inactiveThresholdMs = 15 * 60 * 1000; // 15 minutes in milliseconds

    for (let i = 0; i < dates.length - 1; i++) {
      let diffMs = dates[i + 1] - dates[i]; // Difference in milliseconds between two timestamps

      // If the difference is less than or equal to the inactive threshold, add it to the total active time
      if (diffMs <= inactiveThresholdMs) {
        totalActiveTimeMs += diffMs;
      }
      // If the difference is greater than the threshold, it's an inactive period and not added
    }

    // Convert milliseconds to hours and ensure the result is a number rounded to two decimal places
    const totalActiveHours = totalActiveTimeMs / (1000 * 60 * 60);
    return isNaN(totalActiveHours)
      ? 0
      : parseFloat(totalActiveHours.toFixed(2));
  };

  //   const fetchActiveStatus = async () => {
  //     const db = getDatabase();
  //     const usersRef = ref(db, "ActiveUsers");

  //     try {
  //       const snapshot = await get(usersRef);
  //       if (snapshot.exists()) {
  //         const activeUsersData = snapshot.val();
  //         const rows = [];
  //         const columns = [{ field: "date", headerName: "Date" }];

  //         // Iterate over each user to get their ActiveSessionHours
  //         for (const uid of Object.keys(activeUsersData)) {
  //           const userRef = ref(db, `ActiveUsers/${uid}/ActiveSessionHours`);
  //           const userSnapshot = await get(userRef);

  //           if (userSnapshot.exists()) {
  //             const sessionHours = userSnapshot.val();

  //             // Add a column for each user
  //             columns.push({ field: uid, headerName: activeUsersData[uid].name });

  //             // Iterate over each date in the user's ActiveSessionHours
  //             for (const [date, timestamp] of Object.entries(sessionHours)) {
  //               let row = rows.find((r) => r.date === date);

  //               if (!row) {
  //                 row = { date };
  //                 rows.push(row);
  //               }

  //               // Add the timestamp to the row under the user's column

  //               row[uid] = calculateTotalActiveHours(timestamp);
  //             }
  //           }
  //         }

  //         const dataUsers = { rows, columns };
  //         setActiveUsers(dataUsers); // Assuming this function is intended to update the state or display the data
  //         console.log(dataUsers);
  //       } else {
  //         console.log("No active users found");
  //         setActiveUsers([]);
  //       }
  //     } catch (error) {
  //       console.error("Error checking active status:", error);
  //     }
  //   };

  const fetchActiveStatus = async () => {
    const db = getDatabase();
    const usersRef = ref(db, "ActiveUsers");

    try {
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const activeUsersData = snapshot.val();
        const rows = [];
        // Add 'id' as the first column
        const columns = [
          { field: "id", headerName: "ID" },
          { field: "date", headerName: "Date" },
        ];
        let rowIndex = 1; // Start row index from 1

        // Iterate over each user to get their ActiveSessionHours
        for (const uid of Object.keys(activeUsersData)) {
          const userRef = ref(db, `ActiveUsers/${uid}/ActiveSessionHours`);
          const userSnapshot = await get(userRef);

          if (userSnapshot.exists()) {
            const sessionHours = userSnapshot.val();

            // Add a column for each user
            columns.push({ field: uid, headerName: activeUsersData[uid].name });

            // Iterate over each date in the user's ActiveSessionHours
            for (const [date, timestamp] of Object.entries(sessionHours)) {
              let row = rows.find((r) => r.date === date);

              if (!row) {
                row = { id: rowIndex++, date }; // Assign row index as 'id'
                rows.push(row);
              }

              // Add the timestamp to the row under the user's column
              row[uid] = calculateTotalActiveHours(timestamp);
            }
          }
        }

        const dataUsers = { rows, columns };
        setActiveUsers(dataUsers); // Assuming this function is intended to update the state or display the data
        console.log(dataUsers);
      } else {
        console.log("No active users found");
        setActiveUsers([]);
      }
    } catch (error) {
      console.error("Error checking active status:", error);
    }
  };

  useEffect(() => {
    fetchActiveStatus();
  }, []);

  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  React.useEffect(() => {
    console.log(rowSelectionModel);
  }, [rowSelectionModel]);
  return (
    <div style={{ height: 400, width: "100%" }}>
      {activeUsers && activeUsers.rows && activeUsers.rows.length > 0 ? (
        <DataGrid
          checkboxSelection
          // Uncomment and modify the following lines as per your state management needs
          // onRowSelectionModelChange={(newRowSelectionModel) => {
          //   setRowSelectionModel(newRowSelectionModel);
          // }}
          // rowSelectionModel={rowSelectionModel}
          {...activeUsers}
        />
      ) : (
        <div>No data to show</div>
      )}
    </div>
  );
}
