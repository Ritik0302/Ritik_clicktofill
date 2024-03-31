// import React, { useState } from "react";
// import axios from "axios";

// import Grid from "@mui/material/Grid";
// import Button from "@mui/material/Button";
// import Container from "@mui/material/Container";
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import Alert from "@mui/material/Alert";
// import { useNavigate } from "react-router-dom";
// import { Snackbar } from "@mui/material";
// import MuiAlert from "@mui/material/Alert";
// import Link from '@mui/material/Link';

// const colors = {
//   themeColor: "#88cc00",
//   focusColor: "#99e600",
//   drawerColor: "#050906",
// };
// const LoginPage = () => {
//   const Host = process.env.REACT_APP_API_URL || "http://localhost:5001";

//   const navigate = useNavigate(); // Use the useNavigate hook
//   const [mobile, setmobile] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [mobileError, setmobileError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     let hasError = false;

//     if (mobile === "") {
//       setmobileError(true);
//       hasError = true;
//     } else {
//       setmobileError(false);
//     }

//     if (password === "") {
//       setPasswordError(true);
//       hasError = true;
//     } else {
//       setPasswordError(false);
//     }

//     if (hasError) {
//       alert("Both email and password are required.");
//     } else {
//       // Call the login function
//       try {
//         console.log(mobile, password, Host);
//         const response = await login(Host, mobile, password);
//         if (response.success) {
//           // Redirect to home page
//           navigate("/");
//           storeCredentials(response, mobile, password);
//         } else {
//           // setSnackbarOpen(true); // Open Snackbar for wrong credentials
//         }
//       } catch (error) {
//         setSnackbarOpen(true); // Open Snackbar for wrong credentials

//         console.error("Login error:", error);
//         // alert("An error occurred during login.");
//       }
//     }
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const storeCredentials = (data, mobile, password) => {
//     localStorage.clear();

//     localStorage.setItem("accessToken", data.token);
//     localStorage.setItem("accessLevel", data.accessLevel);
//     localStorage.setItem("user", JSON.stringify(data.user));
//     localStorage.setItem("mobile", mobile);
//     localStorage.setItem("password", password);
//     localStorage.setItem("tokenCreationTime", new Date().toISOString());
//   };

//   const login = async (Host, mobile, password) => {
//     try {
//       console.log("base ", Host, mobile, password);
//       const response = await axios.post(`${Host}/api/auth/login`, {
//         mobile,
//         password,
//       });

//       return response.data;
//     } catch (error) {
//       console.error("Error:", error);
//       throw error;
//     }
//   };

//   return (
//     <>
//       <Grid
//         container
//         padding="0"
//         style={{
//           backgroundImage: 'url("/images/login_background.jpg")',
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         <Grid
//           item
//           xs={12}
//           md={4}
//           style={{
//             display: "flex",
//             maxWidth: "400px",
//             margin: "0 auto",
//             height: "100vh",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: "20px",
//               background: colors["drawerColor"],
//               color: "white",
//               height: "600px",
//               borderRadius: "10px",
//             }}
//           >
//             <Box style={{ width: "100%", alignItems: "left" }}>
//               <Typography
//                 component="h1"
//                 variant="h5"
//                 style={{ color: colors["themeColor"], fontWeight: "700" }}
//               >
//                 SIGN IN
//               </Typography>
//             </Box>

//             <form
//               onSubmit={handleSubmit}
//               style={{ width: "100%", marginTop: 1 }}
//             >
//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="mobile"
//                 label="Mobile Number"
//                 name="mobile"
//                 autoComplete="mobile"
//                 autoFocus
//                 value={mobile}
//                 onChange={(e) => setmobile(e.target.value)}
//                 error={mobileError}
//                 helperText={mobileError ? "Email is required" : ""}
//                 sx={{
//                   "& label": {
//                     color: mobileError ? "red" : "white",
//                   },
//                   "& .MuiOutlinedInput-root": {
//                     "& fieldset": {
//                       borderColor: colors["themeColor"],
//                     },
//                     "&:hover fieldset": {
//                       borderColor: colors["themeColor"],
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: colors["themeColor"],
//                     },
//                     "& input": {
//                       color: "white",
//                     },
//                   },
//                 }}
//               />

//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 error={passwordError}
//                 helperText={passwordError ? "Password is required" : ""}
//                 sx={{
//                   "& label": {
//                     color: passwordError ? "red" : "white",
//                   },
//                   "& .MuiOutlinedInput-root": {
//                     "& fieldset": {
//                       borderColor: colors["themeColor"],
//                     },
//                     "&:hover fieldset": {
//                       borderColor: colors["themeColor"],
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: colors["themeColor"],
//                     },
//                     "& input": {
//                       color: "white",
//                     },
//                   },
//                 }}
//               />

//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 style={{
//                   marginTop: 3,
//                   marginBottom: 2,
//                   background: colors["themeColor"],
//                 }}
//               >
//                 Sign In
//               </Button>
//               <Grid item xs sx={{marginTop:"2px"}}>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link href="#" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </form>
//           </Box>
//         </Grid>


//         <Grid item xs={12} md={8}>
//           {" "}
//         </Grid>
//       </Grid>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         style={{
//           top: "5%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           position: "fixed",
//           zIndex: 9999 // Adjust z-index as needed
//         }}
//       >
//         <MuiAlert
//           elevation={6}
//           variant="filled"
//           onClose={handleSnackbarClose}
//           severity="error"
//         >
//           Invalid Employee ID or Password
//         </MuiAlert>
//       </Snackbar>


//     </>
//   );
// };
// export default LoginPage;












import React, { useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Link from '@mui/material/Link';

const colors = {
  themeColor: "#88cc00",
  focusColor: "#99e600",
  drawerColor: "#050906",
};

const LoginPage = () => {
  const Host = process.env.REACT_APP_API_URL || "http://localhost:5001";

  const navigate = useNavigate(); // Use the useNavigate hook
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileError, setMobileError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar

  const handleSubmit = async (event) => {
    event.preventDefault();
    let hasError = false;

    if (mobile === "") {
      setMobileError(true);
      hasError = true;
    } else {
      setMobileError(false);
    }

    if (password === "") {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (hasError) {
      alert("Both email and password are required.");
    } else {
      // Call the login function
      try {
        console.log(mobile, password, Host);
        const response = await login(Host, mobile, password);
        if (response.success) {
          // Redirect to home page
          navigate("/");
          storeCredentials(response, mobile, password);
        } else {
          // setSnackbarOpen(true); // Open Snackbar for wrong credentials
        }
      } catch (error) {
        setSnackbarOpen(true); // Open Snackbar for wrong credentials

        console.error("Login error:", error);
        // alert("An error occurred during login.");
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const storeCredentials = (data, mobile, password) => {
    localStorage.clear();

    localStorage.setItem("accessToken", data.token);
    localStorage.setItem("accessLevel", data.accessLevel);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("mobile", mobile);
    localStorage.setItem("password", password);
    localStorage.setItem("tokenCreationTime", new Date().toISOString());
  };

  const login = async (Host, mobile, password) => {
    try {
      console.log("base ", Host, mobile, password);
      const response = await axios.post(`${Host}/api/auth/login`, {
        mobile,
        password,
      });

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const handleForgotPassword = () => {
    setResetPassword(true);
  };

  const handleSignUp = () => {
    // Redirect to signup page
    navigate("/signup");
  };

  return (
    <>
      <Grid
        container
        padding="0"
        style={{
          backgroundImage: 'url("/images/login_background.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Grid
          item
          xs={12}
          md={4}
          style={{
            display: "flex",
            maxWidth: "400px",
            margin: "0 auto",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              background: colors["drawerColor"],
              color: "white",
              height: "600px",
              borderRadius: "10px",
            }}
          >
            <Box style={{ width: "100%", alignItems: "left" }}>
              <Typography
                component="h1"
                variant="h5"
                style={{ color: colors["themeColor"], fontWeight: "700" }}
              >
                {resetPassword ? "RESET PASSWORD" : "SIGN IN"}
              </Typography>
            </Box>

            <form
              onSubmit={handleSubmit}
              style={{ width: "100%", marginTop: 1 }}
            >
              {!resetPassword && (
                <>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="mobile"
                    label="Mobile Number"
                    name="mobile"
                    autoComplete="mobile"
                    autoFocus
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    error={mobileError}
                    helperText={mobileError ? "Email is required" : ""}
                    sx={{
                      "& label": {
                        color: mobileError ? "red" : "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: colors["themeColor"],
                        },
                        "&:hover fieldset": {
                          borderColor: colors["themeColor"],
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: colors["themeColor"],
                        },
                        "& input": {
                          color: "white",
                        },
                      },
                    }}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError}
                    helperText={passwordError ? "Password is required" : ""}
                    sx={{
                      "& label": {
                        color: passwordError ? "red" : "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: colors["themeColor"],
                        },
                        "&:hover fieldset": {
                          borderColor: colors["themeColor"],
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: colors["themeColor"],
                        },
                        "& input": {
                          color: "white",
                        },
                      },
                    }}
                  />
                </>
              )}

              {resetPassword && (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="reset-password"
                  label="Reset Password"
                  name="reset-password"
                  autoComplete="reset-password"
                  autoFocus
                  // Add necessary state and event handlers
                />
              )}

              {!resetPassword && (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    marginTop: 3,
                    marginBottom: 2,
                    background: colors["themeColor"],
                  }}
                >
                  Sign In
                </Button>
              )}

              {!resetPassword && (
                <Grid container>
                  <Grid item xs>
                    <Link
                      href="#"
                      variant="body2"
                      onClick={handleForgotPassword}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2" onClick={handleSignUp}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              )}

              {resetPassword && (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    marginTop: 3,
                    marginBottom: 2,
                    background: colors["themeColor"],
                  }}
                >
                  Reset Password
                </Button>
              )}
            </form>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          {" "}
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        style={{
          top: "5%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "fixed",
          zIndex: 9999 // Adjust z-index as needed
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="error"
        >
          Invalid Employee ID or Password
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default LoginPage;
