import React, { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { differenceInMinutes, parseISO } from "date-fns";
import moment from "moment-timezone";
import "moment-timezone"; // Import moment-timezone if you need timezone support

// Firebase
import { db } from "../../Pages/Auth/Firebase/firebase";
import { getDatabase, ref, onValue, off, get, remove } from "firebase/database";

const ShowActiveUsers = () => {
  const [activeUsers, setActiveUsers] = useState([
    // {
    //   name: "John Doe",
    //   employeeID: "EMP123",
    //   lastLogin: new Date("2024-02-05T00:00:00.000Z").toISOString(), // Assuming the time part is 00:00:00.000 and it's in UTC
    //   isActive: true,
    // },
    // {
    //   name: "Jane Doe",
    //   employeeID: "EMP456",
    //   lastLogin: new Date("2024-02-05T00:00:00.000Z").toISOString(), // Assuming the time part is 00:00:00.000 and it's in UTC
    //   isActive: true,
    // },
    // {
    //   name: "Jane Doe",
    //   employeeID: "EMP456",
    //   lastLogin: new Date("2024-02-05T00:00:00.000Z").toISOString(), // Assuming the time part is 00:00:00.000 and it's in UTC
    //   isActive: false,
    // },
    // {
    //   name: "Jane Doe",
    //   employeeID: "EMP456",
    //   lastLogin: new Date("2024-02-05T00:00:00.000Z").toISOString(), // Assuming the time part is 00:00:00.000 and it's in UTC
    //   isActive: true,
    // },
    // {
    //   name: "Jane Doe",
    //   employeeID: "EMP456",
    //   lastLogin: new Date("2024-02-05T00:00:00.000Z").toISOString(), // Assuming the time part is 00:00:00.000 and it's in UTC
    //   isActive: true,
    // },
    // {
    //   name: "Jane Doe",
    //   employeeID: "EMP456",
    //   lastLogin: new Date("2024-02-05T00:00:00.000Z").toISOString(), // Assuming the time part is 00:00:00.000 and it's in UTC
    //   isActive: true,
    // },
    // {
    //   name: "Jane Doe",
    //   employeeID: "EMP456",
    //   lastLogin: new Date("2024-02-05T00:00:00.000Z").toISOString(), // Assuming the time part is 00:00:00.000 and it's in UTC
    //   isActive: true,
    // },
    // Add more user objects as needed
  ]);

  const isUserActive = (lastLogin) => {
    console.log("time: ", lastLogin);
    const awayTime = 10; // Minutes until a user is considered away
    const inactiveTime = 15; // Minutes until a user is considered inactive

    // Parse the lastLogin as a UTC moment
    const lastLoginDate = moment.utc(lastLogin);

    // Get the current time as a moment in UTC
    const nowUtc = moment.utc();

    // Calculate the difference in minutes
    const timeDiff = nowUtc.diff(lastLoginDate, "minutes");
    console.log(
      "time vars: ",
      timeDiff,
      nowUtc.format(),
      lastLoginDate.format()
    );

    if (timeDiff < awayTime) {
      return 1; // User is active
    } else if (timeDiff >= awayTime && timeDiff < inactiveTime) {
      return 2; // User is away
    } else {
      return 0; // User is inactive
    }
  };

  // Function to format date-time in a human-readable format
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      // timeZone: "UTC", // Add this line to keep the time in UTC
    };
    return date.toLocaleString("en-IN", options);
  };

  // const fetchActiveStatus = async () => {
  //   const db = getDatabase();
  //   const usersRef = ref(db, "ActiveUsers");

  //   try {
  //     const snapshot = await get(usersRef);
  //     if (snapshot.exists()) {
  //       const activeUsersData = snapshot.val();
  //       const users = Object.keys(activeUsersData).map((uid) => {
  //         const userData = activeUsersData[uid];
  //         const activeStatus = isUserActive(userData.lastLogin);
  //         console.log("ActiveStatus: ", activeStatus);
  //         return {
  //           ...userData,
  //           lastLogin: formatDateTime(userData.lastLogin), // Format the lastLogin to be human-readable
  //           isActive: activeStatus,
  //         };
  //       });
  //       setActiveUsers(users);
  //       console.log(users);
  //     } else {
  //       console.log("No active users found");
  //       setActiveUsers([]);
  //     }
  //   } catch (error) {
  //     console.error("Error checking active status:", error);
  //   }
  // };
  const fetchActiveStatus = () => {
    const db = getDatabase();
    const usersRef = ref(db, "ActiveUsers");

    onValue(
      usersRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const activeUsersData = snapshot.val();
          const users = Object.keys(activeUsersData).map((uid) => {
            const userData = activeUsersData[uid];
            const activeStatus = isUserActive(userData.lastLogin);
            console.log("ActiveStatus: ", activeStatus);
            return {
              ...userData,
              lastLogin: formatDateTime(userData.lastLogin), // Format the lastLogin to be human-readable
              isActive: activeStatus,
            };
          });
          setActiveUsers(users);
          console.log(users);
        } else {
          console.log("No active users found");
          setActiveUsers([]);
        }
      },
      (error) => {
        console.error("Error checking active status:", error);
      }
    );
  };

  useEffect(() => {
    fetchActiveStatus();
  }, []);
  return (
    <>
      <>
        <Box style={{ padding: "20px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // Changed to column to stack the user info vertically
              flexGrow: 1,
            }}
          >
            {activeUsers && (
              <>
                {activeUsers.map((item, index) => (
                  <Box key={index}>
                    <Paper
                      elevation={3}
                      sx={{ padding: "20px", marginBottom: "5px" }}
                    >
                      <Grid
                        container
                        key={index}
                        spacing={2}
                        alignItems="center"
                        sx={{
                          marginBottom: "8px",
                          height: "100px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* Avatar at the start */}
                        <Grid item>
                          <Avatar sx={{ marginRight: 2 }}>
                            {item.name ? item.name.charAt(0) : ""}
                          </Avatar>
                        </Grid>

                        {/* Other grid items */}
                        <Grid item xs style={{ flexBasis: "15%" }}>
                          {" "}
                          {/* Adjusted percentage for spacing */}
                          <Typography
                            style={{
                              fontSize: "14px",
                              fontWeight: "700",
                            }}
                          >
                            Name: {item.name}
                          </Typography>
                        </Grid>
                        <Grid item xs style={{ flexBasis: "25%" }}>
                          {" "}
                          {/* Adjusted percentage for spacing */}
                          <Typography variant="body2">
                            <span style={{ fontWeight: "bold" }}>
                              Employee ID:{" "}
                            </span>{" "}
                            {item.employeeID}
                          </Typography>
                        </Grid>
                        <Grid item xs style={{ flexBasis: "25%" }}>
                          {" "}
                          {/* Adjusted percentage for spacing */}
                          <Typography variant="body2">
                            <span style={{ fontWeight: "bold" }}>
                              {" "}
                              Last Login:{" "}
                            </span>{" "}
                            {item.lastLogin}
                          </Typography>
                        </Grid>
                        <Grid item style={{ flexBasis: "15%" }}>
                          {" "}
                          {/* Adjusted percentage for spacing */}
                          {/* {item.isActive ? (
                            <span
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <FiberManualRecordIcon
                                style={{ color: "green", marginRight: "4px" }}
                              />
                              <Typography variant="body2">Active</Typography>
                            </span>
                          ) : (
                            <span
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <FiberManualRecordIcon
                                style={{ color: "red", marginRight: "4px" }}
                              />
                              <Typography variant="body2">Inactive</Typography>
                            </span>
                          )} */}
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {console.log(item.isActive)}
                            <FiberManualRecordIcon
                              style={{
                                // Set color based on isActive value
                                color:
                                  item.isActive === 1
                                    ? "green"
                                    : item.isActive === 2
                                    ? "yellow"
                                    : "red",
                                marginRight: "4px",
                              }}
                            />
                            <Typography variant="body2">
                              {/* Set text based on isActive value */}
                              {item.isActive === 1
                                ? "Active"
                                : item.isActive === 2
                                ? "Away"
                                : "Inactive"}
                            </Typography>
                          </span>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Box>
                ))}
              </>
            )}
          </Box>
        </Box>
      </>
    </>
  );
};
export default ShowActiveUsers;
