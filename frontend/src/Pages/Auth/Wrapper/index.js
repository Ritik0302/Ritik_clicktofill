import React from "react";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getDatabase, ref, set, update, get, push } from "firebase/database";
import { db } from "../../Auth/Firebase/firebase";
import { format } from "date-fns";
import moment from "moment-timezone";
const MAX_RETRIES = 3; // Maximum number of re-authentication attempts
const RETRY_INTERVAL = 5000; // Retry every 5 seconds
const LOGOUT_TIME = 45;
const ACTIVE_REFRESH = 5;
function Wrapper({ children }) {
  const Host = process.env.REACT_APP_API_URL || "http://localhost:5001";
  const navigate = useNavigate();
  let accessLevel = null;
  let user = null;
  const checkAccessLevel = () => {
    try {
      const userString = localStorage.getItem("user");
      // Only parse if userString is not null
      if (userString) {
        const temp = JSON.parse(userString);
        const tempUser = JSON.parse(userString);
        user = tempUser;
        accessLevel = temp.accessLevel;
        // console.log("accessLevel: ", accessLevel);
        // console.log(temp);
      } else {
        // Handle the case where the user key is not found in localStorage
        console.log("User not found in localStorage.");
      }
    } catch (error) {
      // Handle any parsing errors
      console.error("Error parsing user data from localStorage:", error);
    }
  };
  const mouseClickListener = async (event) => {
    // Assuming checkAccessLevel() updates an accessLevel variable and 'user' is available in this scope
    checkAccessLevel();
    if (accessLevel > 0) {
      // console.log(user);
      const db = getDatabase();
      const userRef = ref(db, `ActiveUsers/${user.employeeID}`);
      // const now = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
      // const now = moment
      //   .tz("Asia/Kolkata")
      //   .format("YYYY-MM-DD'T'HH:mm:ss.SSS'Z'");
      const now = moment.tz("Asia/Kolkata").format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      // const currentDate = format(new Date(), "yyyy-MM-dd"); // Format current date as YYYY-MM-DD
      const currentDate = moment.tz("Asia/Kolkata").format("YYYY-MM-DD");
      const sessionHoursRef = ref(
        db,
        `ActiveUsers/${user.employeeID}/ActiveSessionHours/${currentDate}`
      ); // Reference to the current date under ActiveSessionHours
      // console.log("Time ", now);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            // User exists, update lastLogin
            update(userRef, { lastLogin: now });
          } else {
            // User doesn't exist, create new record
            set(userRef, {
              employeeID: user.employeeID,
              lastLogin: now,
              name: user.name,
            });
          }
          // After updating/creating user, push current time under ActiveSessionHours for the current date
          push(sessionHoursRef, now); // Pushes the current time with a unique key
        })
        .catch((error) => {
          console.error(error);
        });
    }
    await refreshloginLogic();
    // console.log("Component clicked!");
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (!accessToken) {
      navigate("/login");
    } else {
      const tokenCreationTime = new Date(
        localStorage.getItem("tokenCreationTime")
      );
      // const oneHourAgo = new Date(new Date().getTime() - 60 * 60 * 1000);
      // const oneHourAgo = new Date(new Date().getTime() - 10000);
      const oneHourAgo = new Date(
        new Date().getTime() - LOGOUT_TIME * 60 * 1000
      );
      if (tokenCreationTime <= oneHourAgo) {
        navigate("/login");
      }
    }
  }, [navigate]);
  useEffect(() => {
    const interval = setInterval(() => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        clearInterval(interval);
        navigate("/login");
        return;
      }
      const tokenCreationTime = new Date(
        localStorage.getItem("tokenCreationTime")
      );
      const oneHourAgo = new Date(
        new Date().getTime() - LOGOUT_TIME * 60 * 1000
      );
      // const oneHourAgo = new Date(new Date().getTime() - 10000);
      if (tokenCreationTime <= oneHourAgo) {
        clearInterval(interval);
        navigate("/login");
      }
    }, RETRY_INTERVAL);
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [navigate]); // Include navigate in the dependency array
  const refreshloginLogic = async () => {
    // console.log("refreshloginLogic Called");
    const accessToken = localStorage.getItem("accessToken");
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    const user = localStorage.getItem("user");
    const tokenCreationTime = new Date(
      localStorage.getItem("tokenCreationTime")
    );
    const oneHourAgo = new Date(
      new Date().getTime() - ACTIVE_REFRESH * 60 * 1000
    );
    // const oneHourAgo = new Date(new Date().getTime() - 2000);
    if (tokenCreationTime <= oneHourAgo) {
      // Token is older than an hour, re-authenticate
      if (accessToken) {
        // Logic to re-authenticate and get a new token
        // You'll need to make an API call to your backend here
        console.log("Email: ", email, password);
        await reauthenticate(Host, accessToken)
          .then((newToken) => {
            localStorage.setItem("accessToken", newToken);
            console.log("Token Refresh: ", newToken);
            localStorage.setItem("tokenCreationTime", new Date().toISOString());
          })
          .catch(() => {
            // Handle failed re-authentication
            localStorage.removeItem("accessToken");
            localStorage.removeItem("tokenCreationTime");
            navigate("/login");
          });
      } else {
        // No credentials stored, redirect to login
        navigate("/login");
      }
    }
  };
  return (
    <>
      <>
        <div
          onClick={() => {
            mouseClickListener();
          }}
        >
          {children}
        </div>
      </>
    </>
  );
}
// async function reauthenticate(host, email, password) {
//   // Replace with your actual re-authentication logic
//   // This should be an API call to your backend
//   const send = {
//     employeeID: email,
//     password: password,
//   };
//   const response = await fetch(`${host}/api/auth/refreshlogin`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(send),
//   });
//   console.log("Data: ", response);
//   const data = await response.json();
//   return data.accessToken;
// }
async function reauthenticate(host, token) {
  // Assuming the token is stored in the localStorage
  const response = await fetch(`${host}/api/auth/refreshlogin`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // Sending the token as a bearer token in the Authorization header
      "Content-Type": "application/json",
    },
    // No body is sent since we're only sending the token in the header
  });
  console.log("Data: ", response);
  const data = await response.json();
  return data.token;
}
export default Wrapper;