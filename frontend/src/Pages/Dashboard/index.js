// import * as React from "react";
// import { useState, useEffect } from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import Avatar from "@mui/material/Avatar";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
// import SettingsIcon from "@mui/icons-material/Settings";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// import LoupeIcon from '@mui/icons-material/Loupe';
// import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
// import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// import EdgesensorLowIcon from '@mui/icons-material/EdgesensorLow';
// import GroupsIcon from '@mui/icons-material/Groups';



// // Icons
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import MotionPhotosAutoIcon from "@mui/icons-material/MotionPhotosAuto";
// // Components Import
// import LogoutComponent from "../Auth/LogoutComponent";
// import StudyMaterial from "../../components/MyCandidate/EditComponent";

// import Subscribtion from "../../components/UploadData";
// // import UploadData from "../../components/Uploadv2";
// import State from "../../components/AssignData";
// import ApplyForm from "../../components/MergeRequest";
// import LatestNotification from "../../components/LatestNotification";


// const drawerWidth = 240;

// const colors = {
//   themeColor: "#88cc00",
//   focusColor: "#99e600",
//   drawerColor: "#050906",
// };

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// export default function Dashboard() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const [parsedObject, setParsedObject] = React.useState(null);
//   const userMenu = ["Profile", "Logout"];

//    // Initialize state with function to immediately apply logic based on localStorage
//    const [listItems, setListItems] = React.useState(() => {
//     const userString = localStorage.getItem("user");
//     if (!userString) {
//       console.log("User not found in localStorage.");
//       return ["LatestNotification", "My Candidate"]; // Default items for unauthenticated users
//     } try {
//       const user = JSON.parse(userString);
//       setParsedObject(user); // Set parsed user object to state

//       // Base list items
//       let items = [
//         "Latest Notification",
//         "My Candidate",
//         // Other items visible to all users
//       ];

//       // if (user.accessLevel < 0) {
//       //   // For admins or special roles
//       //   items.push("Approve User");
//       //   // Additional items for admins
//       // } else if (user.accessLevel > 0) {
//       //   // For regular users
//       //   // Possibly filter or add specific items
//       // }

//       return items;
//     } catch (error) {
//       console.error("Error parsing user data from localStorage:", error);
//       return ["LatestNotification", "My Candidate"]; // Fallback items
//     }
//   });


//   // State to hold the selected item
//   const [selectedItem, setSelectedItem] = useState("LatestNotification");

//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   useEffect(() => {
//     // Initialize with the base list of items that everyone can see
//     let updatedListItems = [
//       "Latest Notification",
//       "Study Material",
//       "Subscribtion",
//       "State",
//       "Apply Form",
//       "Contect Us"
//     ];

//     // if (parsedObject && parsedObject.accessLevel) {
//     //   if (parsedObject.accessLevel > 0) {
//     //     // Filter out items that should not be visible to users with accessLevel greater than 0
//     //     updatedListItems = updatedListItems.filter(item => ![
//     //       "Upload Data",
//     //       "Merge Data",
//     //       "Assign Data",
//     //       "Active Users",
//     //       "Login Hours",
//     //       "Add User",
//     //     ].includes(item));
//     //   } else if (parsedObject.accessLevel < 0) {
//     //     // For users with accessLevel less than 0, add "Approve User" to the list
//     //     updatedListItems.push("Client Lead");
//     //     updatedListItems.push("Approve User");
//     //     updatedListItems.push("Call Logs");
//     //     updatedListItems.push("All Users");
//     //   }
//     // }

//     // Update the list items state
//     setListItems(updatedListItems);
//   }, [parsedObject]);

//   // Function to render the component based on the selected item
//   const renderComponent = () => {
//     switch (selectedItem) {
//       // case "My Profile":
//       //   return <>My Profile</>;
//       case "LatestNotification":
//         return (
//           <>
//             <LatestNotification />
//           </>
//         );
//       case "Study Material":
//         return (
//           <>
//             <StudyMaterial />
//           </>
//         );
//       case "Subscribtion":
//         return (
//           <>
//             <Subscribtion />
//           </>
//         );
//       case "State":
//         return (
//           <>
//             <State />{" "}
//           </>
//         );
//       case "Apply Form":
//         return (
//           <>
//             <ApplyForm />
//           </>
//         );
//       default:
//         return <div>Select an item</div>;
//     }
//   };
//   //
//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };
//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   function getIconForText(text) {
//     switch (text) {
//       case "My Candidate":
//         return <GroupsIcon />;
//       case "Upload Data":
//         return <CloudUploadIcon />;
//       case "Merge Data":
//         return <TaskAltIcon />;
//       case "LatestNotification":
//         return <DashboardIcon />;
//       case "Assign Data":
//         return <ContentPasteGoIcon />;
//       case "Active Users":
//         return <MotionPhotosAutoIcon />;
//       case "Login Hours":
//         return <AccessTimeIcon />;
//       case "Add Candidate":
//         return <PersonAddAltIcon />;
//       case "Add User":
//         return <LoupeIcon />;
//       case "Client Lead":
//         return <SensorOccupiedIcon />;
//       case "Approve User":
//         return <VerifiedUserIcon />;
//       case "Call Logs":
//         return <EdgesensorLowIcon />;
//       case "All Users":
//         return <PeopleAltIcon />;
//       // Add more cases for other text values and corresponding icons
//       default:
//         return <InboxIcon />; // Default icon if none match
//     }
//   }

//   return (
//     <Box sx={{ display: "flex" }}>
//       {/* <LogoutComponent /> */}
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         open={open}
//         style={{
//           borderRadius: "20px 0px 0px 0px",
//           background: colors["themeColor"],
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{
//               marginRight: 5,
//               ...(open && { display: "none" }),
//             }}
//           >
//             {/* <MenuIcon style={{ color: "white" }} /> */}
//             <ChevronRightIcon style={{ color: "white" }} />
//           </IconButton>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             style={{ fontWeight: "700" }}
//           >
//             {/* HBR CRM */}
//             {selectedItem}
//           </Typography>
//           <Box style={{ flexGrow: "1" }}></Box>
//           <Box style={{ padding: "5px 10px" }}>
//             <Typography style={{ fontSize: "14px", fontWeight: "700" }}>
//               {parsedObject && parsedObject.name && parsedObject.name}
//             </Typography>
//           </Box>
//           <Tooltip title="Open settings">
//             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//               <Avatar sx={{ marginRight: 2 }}>
//                 {parsedObject && parsedObject.name.charAt(0)}
//               </Avatar>
//             </IconButton>
//           </Tooltip>
//           <Menu
//             sx={{ mt: "45px" }}
//             id="menu-appbar"
//             anchorEl={anchorElUser}
//             anchorOrigin={{
//               vertical: "top",
//               horizontal: "right",
//             }}
//             keepMounted
//             transformOrigin={{
//               vertical: "top",
//               horizontal: "right",
//             }}
//             open={Boolean(anchorElUser)}
//             onClose={handleCloseUserMenu}
//           >
//             {/* {settings.map((setting) => (
//               <MenuItem key={setting} onClick={handleClickUserMenu(setting)}>
//                 <Typography textAlign="center">{setting}</Typography>
//               </MenuItem>
//             ))} */}
//             <UserMenu userMenu={userMenu} />
//           </Menu>
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         variant="permanent"
//         open={open}
//         sx={{
//           ".MuiDrawer-paper": {
//             backgroundColor: colors["drawerColor"],
//             // Add other styles here if needed
//           },
//         }}
//       >
//         <DrawerHeader
//           sx={{ backgroundColor: colors["drawerColor"], paddingLeft: "20px" }} // Add this line to change background color
//         >
//           <Box style={{ width: "100%" }}>
//             <Typography
//               style={{ color: "white", fontWeight: "700", fontSize: "18px" }}
//             >
//               Click2Fill
//             </Typography>
//           </Box>

//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === "rtl" ? (
//               <ChevronRightIcon />
//             ) : (
//               <ChevronLeftIcon style={{ color: "white" }} />
//             )}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List
//           sx={{ backgroundColor: "black", color: "white" }} // Add this line to change background color
//         >
//           {listItems.map((text, index) => (
//             <ListItem
//               key={text}
//               disablePadding
//               sx={{ display: "block", background: colors["drawerColor"] }}
//               onClick={() => setSelectedItem(text)} // Set the selected item
//             >
//               <ListItemButton
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: "initial",
//                   px: 2.5,
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: 3,
//                     justifyContent: "center",
//                     color: "white",
//                   }}
//                 >
//                   {/* {index % 2 === 0 ? <InboxIcon /> : <PeopleAltIcon />} */}

//                   {getIconForText(text)}
//                 </ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//         <Box style={{ flexGrow: "1" }}></Box>
//         <Box style={{ color: "white" }}>
//           <ListItem
//             // key={text}
//             disablePadding
//             sx={{ display: "block", background: colors["drawerColor"] }}
//           // onClick={() => setSelectedItem(text)} // Set the selected item
//           >
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: "initial",
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: 3,
//                   justifyContent: "center",
//                   color: "white",
//                 }}
//               >
//                 <SettingsIcon />
//               </ListItemIcon>
//               <ListItemText primary="Settings" />
//             </ListItemButton>
//           </ListItem>
//         </Box>
//       </Drawer>

//       <Box component="main" sx={{ flexGrow: 1, height: "100vh" }}>
//         <DrawerHeader />
//         <Box
//           style={{
//             background: "black",
//             with: "100%",
//             height: "92%",
//             // borderRadius: "0px 20px 20px 20px",
//           }}
//         >
//           <Box
//             style={{
//               background: "white",
//               with: "100%",
//               height: "100%",
//             }}
//           >
//             {renderComponent()}
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// const UserMenu = ({ userMenu }) => {
//   // Destructure userMenu from props
//   const [selectedItem, setSelectedItem] = useState(null);

//   const handleClickUserMenu = (item) => {
//     setSelectedItem(item);
//   };

//   // Ensure userMenu is an array before attempting to map over it
//   if (!Array.isArray(userMenu)) {
//     return null; // or some other fallback UI
//   }

//   return (
//     <>
//       {userMenu.map((item) => (
//         <MenuItem key={item} onClick={() => handleClickUserMenu(item)}>
//           <Typography textAlign="center">{item}</Typography>
//         </MenuItem>
//       ))}
//       {selectedItem === "Profile" && <></>}
//       {selectedItem === "Logout" && <LogoutComponent />}
//     </>
//   );
// };

































































































































































// import * as React from "react";
// import { useState, useEffect } from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import Avatar from "@mui/material/Avatar";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
// import SettingsIcon from "@mui/icons-material/Settings";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// import LoupeIcon from '@mui/icons-material/Loupe';
// import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
// import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';



// // Icons
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import MotionPhotosAutoIcon from "@mui/icons-material/MotionPhotosAuto";
// // Components Import
// import LogoutComponent from "../Auth/LogoutComponent";
// // import DatabaseDisplay from "../../components/DatabaseDisplay";
// // import DatabaseDisplay from "../../components/DatabaseDisplayv2";
// // import DatabaseDisplay from "../../components/DatabaseDisplayv3";
// // import DatabaseDisplay from "../../components/Test/MyTest";
// // import DatabaseDisplayv5 from "../../components/DatabaseDisplayv5";
// // import DatabaseDisplayv5 from "../../components/Test/Test3";
// import DatabaseDisplayv5 from "../../components/Test/EditComponent";
// //import DatabaseDisplay from "../../components/DatabaseDisplayShaon/index";

// // import UploadData from "../../components/UploadData";
// import UploadData from "../../components/Uploadv2";
// import AssignData from "../../components/AssignData";
// import MergeRequest from "../../components/MergeRequest";
// import Overview from "../../components/Overview";
// import ShowActiveUsers from "../../components/ShowActiveUsers/ShowActiveUsers";
// import LoginHours from "../../components/LoginHours";
// // import AddCandidate from "../../components/AddCandidate";
// import AddCandidate from "../../components/AddCandidate/AddCandidateByLink";
// import AddUserRequest from "../../components/AddUserRequest";
// import ClientLead from "../../components/ClientLead";
// //
// const drawerWidth = 240;

// const colors = {
//   themeColor: "#88cc00",
//   focusColor: "#99e600",
//   drawerColor: "#050906",
// };

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// export default function Dashboard() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const userMenu = ["Profile", "Logout"];
//   //

//   let parsedObject = null;

//   try {
//     const userString = localStorage.getItem("user");
//     // Only parse if userString is not null
//     if (userString) {
//       parsedObject = JSON.parse(userString);
//     } else {
//       // Handle the case where the user key is not found in localStorage
//       console.log("User not found in localStorage.");
//     }
//   } catch (error) {
//     // Handle any parsing errors
//     console.error("Error parsing user data from localStorage:", error);
//   }

//   const [listItems, setListItems] = useState([
//     // "My Profile",
//     "Overview",
//     "My Candidate",
//     "Upload Data",
//     "Assign Data",
//     "Merge Data",
//     "Active Users",
//     "Login Hours",
//     "Add Candidate",
//     "Add User",
//     "Client Lead",
//     "Approve User"
//   ]);

//   // State to hold the selected item
//   const [selectedItem, setSelectedItem] = useState("Overview");

//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   // useEffect(() => {
//   //   if (parsedObject && parsedObject.accessLevel > 0) {
//   //     // Create a new filtered array only if necessary
//   //     const updatedListItems = listItems.filter(
//   //       (item) =>
//   //         item !== "Upload Data" &&
//   //         item !== "Merge Data" &&
//   //         item !== "Assign Data" &&
//   //         item !== "Active Users" &&
//   //         item !== "Login Hours" &&
//   //         item !== "Client Lead" &&
//   //         item !== "Add User" 
//   //     );

//   //     // Update state only if the list has changed
//   //     if (updatedListItems.length !== listItems.length) {
//   //       setListItems(updatedListItems);
//   //     }
//   //   }
//   // }, [parsedObject, listItems]);


//   useEffect(() => {
//     // Initialize with the base list of items that everyone can see
//     let updatedListItems = [
//       "Overview",
//       "My Candidate",
//       "Upload Data",
//       "Assign Data",
//       "Merge Data",
//       "Active Users",
//       "Login Hours",
//       "Add Candidate",
//       "Add User",
//       "Client Lead",
//     ];

//     if (parsedObject && parsedObject.accessLevel) {
//       if (parsedObject.accessLevel > 0) {
//         // Filter out items that should not be visible to users with accessLevel greater than 0
//         updatedListItems = updatedListItems.filter(item => ![
//           "Upload Data",
//           "Merge Data",
//           "Assign Data",
//           "Active Users",
//           "Login Hours",
//           "Client Lead",
//           "Add User",
//         ].includes(item));
//       } else if (parsedObject.accessLevel < 0) {
//         // For users with accessLevel less than 0, add "Approve User" to the list
//         updatedListItems.push("Approve User");
//       }
//     }

//     // Update the list items state
//     setListItems(updatedListItems);
//   }, [parsedObject]);






//   // Function to render the component based on the selected item
//   const renderComponent = () => {
//     switch (selectedItem) {
//       // case "My Profile":
//       //   return <>My Profile</>;
//       case "Overview":
//         return (
//           <>
//             <Overview />
//           </>
//         );
//       case "My Candidate":
//         return (
//           <>
//             <DatabaseDisplayv5 />
//           </>
//         );
//       case "Upload Data":
//         return (
//           <>
//             <UploadData />
//           </>
//         );
//       case "Assign Data":
//         return (
//           <>
//             <AssignData />{" "}
//           </>
//         );
//       case "Merge Data":
//         return (
//           <>
//             <MergeRequest />
//           </>
//         );
//       case "Active Users":
//         return (
//           <>
//             <ShowActiveUsers />
//           </>
//         );
//       case "Login Hours":
//         return (
//           <>
//             <LoginHours />
//           </>
//         );
//       case "Add Candidate":
//         return (
//           <>
//             <AddCandidate />
//           </>
//         );
//       case "Add User":
//         return (
//           <>
//             <AddUserRequest />
//           </>
//         );
//       case "Client Lead":
//         return (
//           <>
//             <ClientLead />
//           </>
//         );
//       // Add cases for other components
//       default:
//         return <div>Select an item</div>;
//     }
//   };
//   //
//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };
//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   function getIconForText(text) {
//     switch (text) {
//       case "My Candidate":
//         return <PeopleAltIcon />;
//       case "Upload Data":
//         return <CloudUploadIcon />;
//       case "Merge Data":
//         return <TaskAltIcon />;
//       case "Overview":
//         return <DashboardIcon />;
//       case "Assign Data":
//         return <ContentPasteGoIcon />;
//       case "Active Users":
//         return <MotionPhotosAutoIcon />;
//       case "Login Hours":
//         return <AccessTimeIcon />;
//       case "Add Candidate":
//         return <PersonAddAltIcon />;
//       case "Add User":
//         return <LoupeIcon />;
//       case "Client Lead":
//         return <SensorOccupiedIcon />;
//       case "Approve User":
//         return <VerifiedUserIcon />;
//       // Add more cases for other text values and corresponding icons
//       default:
//         return <InboxIcon />; // Default icon if none match
//     }
//   }

//   return (
//     <Box sx={{ display: "flex", background: "#000000" }}>
//       {/* <LogoutComponent /> */}
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         open={open}
//         style={{
//           borderRadius: "20px 0px 0px 0px",
//           background: colors["themeColor"],
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{
//               marginRight: 5,
//               ...(open && { display: "none" }),
//             }}
//           >
//             {/* <MenuIcon style={{ color: "white" }} /> */}
//             <ChevronRightIcon style={{ color: "white" }} />
//           </IconButton>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             style={{ fontWeight: "700" }}
//           >
//             {/* HBR CRM */}
//             {selectedItem}
//           </Typography>
//           <Box style={{ flexGrow: "1" }}></Box>
//           <Box style={{ padding: "5px 10px" }}>
//             <Typography style={{ fontSize: "14px", fontWeight: "700" }}>
//               {parsedObject && parsedObject.name && parsedObject.name}
//             </Typography>
//           </Box>
//           <Tooltip title="Open settings">
//             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//               <Avatar sx={{ marginRight: 2 }}>
//                 {parsedObject && parsedObject.name.charAt(0)}
//               </Avatar>
//             </IconButton>
//           </Tooltip>
//           <Menu
//             sx={{ mt: "45px" }}
//             id="menu-appbar"
//             anchorEl={anchorElUser}
//             anchorOrigin={{
//               vertical: "top",
//               horizontal: "right",
//             }}
//             keepMounted
//             transformOrigin={{
//               vertical: "top",
//               horizontal: "right",
//             }}
//             open={Boolean(anchorElUser)}
//             onClose={handleCloseUserMenu}
//           >
//             {/* {settings.map((setting) => (
//               <MenuItem key={setting} onClick={handleClickUserMenu(setting)}>
//                 <Typography textAlign="center">{setting}</Typography>
//               </MenuItem>
//             ))} */}
//             <UserMenu userMenu={userMenu} />
//           </Menu>
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         variant="permanent"
//         open={open}
//         sx={{
//           ".MuiDrawer-paper": {
//             backgroundColor: colors["drawerColor"],
//             // Add other styles here if needed
//           },
//         }}
//       >
//         <DrawerHeader
//           sx={{ backgroundColor: colors["drawerColor"], paddingLeft: "20px" }} // Add this line to change background color
//         >
//           <Box style={{ width: "100%" }}>
//             <Typography
//               style={{ color: "white", fontWeight: "700", fontSize: "18px" }}
//             >
//               HireWynk
//             </Typography>
//           </Box>

//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === "rtl" ? (
//               <ChevronRightIcon />
//             ) : (
//               <ChevronLeftIcon style={{ color: "white" }} />
//             )}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List
//           sx={{ backgroundColor: "black", color: "white" }} // Add this line to change background color
//         >
//           {listItems.map((text, index) => (
//             <ListItem
//               key={text}
//               disablePadding
//               sx={{ display: "block", background: colors["drawerColor"] }}
//               onClick={() => setSelectedItem(text)} // Set the selected item
//             >
//               <ListItemButton
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: "initial",
//                   px: 2.5,
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: 3,
//                     justifyContent: "center",
//                     color: "white",
//                   }}
//                 >
//                   {/* {index % 2 === 0 ? <InboxIcon /> : <PeopleAltIcon />} */}

//                   {getIconForText(text)}
//                 </ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//         <Box style={{ flexGrow: "1" }}></Box>
//         <Box style={{ color: "white" }}>
//           <ListItem
//             // key={text}
//             disablePadding
//             sx={{ display: "block", background: colors["drawerColor"] }}
//           // onClick={() => setSelectedItem(text)} // Set the selected item
//           >
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: "initial",
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: 3,
//                   justifyContent: "center",
//                   color: "white",
//                 }}
//               >
//                 <SettingsIcon />
//               </ListItemIcon>
//               <ListItemText primary="Settings" />
//             </ListItemButton>
//           </ListItem>
//         </Box>
//       </Drawer>

//       <Box component="main" sx={{ flexGrow: 1, height: "100vh" }}>
//         <DrawerHeader />
//         <Box
//           style={{
//             background: "black",
//             with: "100%",
//             height: "92%",
//             // borderRadius: "0px 20px 20px 20px",
//           }}
//         >
//           <Box
//             style={{
//               background: "white",
//               with: "100%",
//               height: "100%",
//             }}
//           >
//             {renderComponent()}
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// const UserMenu = ({ userMenu }) => {
//   // Destructure userMenu from props
//   const [selectedItem, setSelectedItem] = useState(null);

//   const handleClickUserMenu = (item) => {
//     setSelectedItem(item);
//   };

//   // Ensure userMenu is an array before attempting to map over it
//   if (!Array.isArray(userMenu)) {
//     return null; // or some other fallback UI
//   }

//   return (
//     <>
//       {userMenu.map((item) => (
//         <MenuItem key={item} onClick={() => handleClickUserMenu(item)}>
//           <Typography textAlign="center">{item}</Typography>
//         </MenuItem>
//       ))}
//       {selectedItem === "Profile" && <></>}
//       {selectedItem === "Logout" && <LogoutComponent />}
//     </>
//   );
// };













































































































import * as React from "react";
import { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LoupeIcon from '@mui/icons-material/Loupe';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EdgesensorLowIcon from '@mui/icons-material/EdgesensorLow';
import GroupsIcon from '@mui/icons-material/Groups';



// Icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MotionPhotosAutoIcon from "@mui/icons-material/MotionPhotosAuto";
// Components Import
import LogoutComponent from "../Auth/LogoutComponent";
import MyCandidate from "../../components/MyCandidate/EditComponent";

import UploadData from "../../components/UploadData";
// import UploadData from "../../components/Uploadv2";
import AssignData from "../../components/AssignData";
import MergeRequest from "../../components/MergeRequest";
import Overview from "../../components/LatestNotification";
import ShowActiveUsers from "../../components/ShowActiveUsers/ShowActiveUsers";
import LoginHours from "../../components/LoginHours";
import AddCandidate from "../../components/AddCandidate/AddCandidateByLink";
import AddUserRequest from "../../components/AddUserRequest";
import ClientLead from "../../components/ClientLead";
import ApproveUser from "../../components/ApproveUser";
import UsersCallLog from "../../components/UsersCallLog";
import ManageAllUsers from "../../components/ManageAllUsers";

const drawerWidth = 240;

const colors = {
  themeColor: "#88cc00",
  focusColor: "#99e600",
  drawerColor: "#050906",
};

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [parsedObject, setParsedObject] = React.useState(null);
  const userMenu = ["Profile", "Logout"];

   // Initialize state with function to immediately apply logic based on localStorage
   const [listItems, setListItems] = React.useState(() => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      console.log("User not found in localStorage.");
      return ["Overview", "My Candidate"]; // Default items for unauthenticated users
    } try {
      const user = JSON.parse(userString);
      setParsedObject(user); // Set parsed user object to state

      // Base list items
      let items = [
        "Overview",
        "My Candidate",
        // Other items visible to all users
      ];

      if (user.accessLevel < 0) {
        // For admins or special roles
        items.push("Approve User");
        // Additional items for admins
      } else if (user.accessLevel > 0) {
        // For regular users
        // Possibly filter or add specific items
      }

      return items;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return ["Overview", "My Candidate"]; // Fallback items
    }
  });


  // State to hold the selected item
  const [selectedItem, setSelectedItem] = useState("Overview");

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  useEffect(() => {
    // Initialize with the base list of items that everyone can see
    let updatedListItems = [
      "Overview",
      "My Candidate",
      "Upload Data",
      "Assign Data",
      "Merge Data",
      "Active Users",
      "Login Hours",
      "Add Candidate",
      "Add User",
    ];

    if (parsedObject && parsedObject.accessLevel) {
      if (parsedObject.accessLevel > 0) {
        // Filter out items that should not be visible to users with accessLevel greater than 0
        updatedListItems = updatedListItems.filter(item => ![
          "Upload Data",
          "Merge Data",
          "Assign Data",
          "Active Users",
          "Login Hours",
          "Add User",
        ].includes(item));
      } else if (parsedObject.accessLevel < 0) {
        // For users with accessLevel less than 0, add "Approve User" to the list
        updatedListItems.push("Client Lead");
        updatedListItems.push("Approve User");
        updatedListItems.push("Call Logs");
        updatedListItems.push("All Users");
      }
    }

    // Update the list items state
    setListItems(updatedListItems);
  }, [parsedObject]);

  // Function to render the component based on the selected item
  const renderComponent = () => {
    switch (selectedItem) {
      // case "My Profile":
      //   return <>My Profile</>;
      case "Overview":
        return (
          <>
            <Overview />
          </>
        );
      case "My Candidate":
        return (
          <>
            <MyCandidate />
          </>
        );
      case "Upload Data":
        return (
          <>
            <UploadData />
          </>
        );
      case "Assign Data":
        return (
          <>
            <AssignData />{" "}
          </>
        );
      case "Merge Data":
        return (
          <>
            <MergeRequest />
          </>
        );
      case "Active Users":
        return (
          <>
            <ShowActiveUsers />
          </>
        );
      case "Login Hours":
        return (
          <>
            <LoginHours />
          </>
        );
      case "Add Candidate":
        return (
          <>
            <AddCandidate />
          </>
        );
      case "Add User":
        return (
          <>
            <AddUserRequest />
          </>
        );
      case "Client Lead":
        return (
          <>
            <ClientLead />
          </>
        );
      case "Approve User":
        return (
          <>
            <ApproveUser />
          </>
        );
      case "Call Logs":
        return (
          <>
            <UsersCallLog />
          </>
        );
      case "All Users":
        return (
          <>
            <ManageAllUsers />
          </>
        );
      // Add cases for other components
      default:
        return <div>Select an item</div>;
    }
  };
  //
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function getIconForText(text) {
    switch (text) {
      case "My Candidate":
        return <GroupsIcon />;
      case "Upload Data":
        return <CloudUploadIcon />;
      case "Merge Data":
        return <TaskAltIcon />;
      case "Overview":
        return <DashboardIcon />;
      case "Assign Data":
        return <ContentPasteGoIcon />;
      case "Active Users":
        return <MotionPhotosAutoIcon />;
      case "Login Hours":
        return <AccessTimeIcon />;
      case "Add Candidate":
        return <PersonAddAltIcon />;
      case "Add User":
        return <LoupeIcon />;
      case "Client Lead":
        return <SensorOccupiedIcon />;
      case "Approve User":
        return <VerifiedUserIcon />;
      case "Call Logs":
        return <EdgesensorLowIcon />;
      case "All Users":
        return <PeopleAltIcon />;
      // Add more cases for other text values and corresponding icons
      default:
        return <InboxIcon />; // Default icon if none match
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* <LogoutComponent /> */}
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{
          borderRadius: "20px 0px 0px 0px",
          background: colors["themeColor"],
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            {/* <MenuIcon style={{ color: "white" }} /> */}
            <ChevronRightIcon style={{ color: "white" }} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ fontWeight: "700" }}
          >
            {/* HBR CRM */}
            {selectedItem}
          </Typography>
          <Box style={{ flexGrow: "1" }}></Box>
          <Box style={{ padding: "5px 10px" }}>
            <Typography style={{ fontSize: "14px", fontWeight: "700" }}>
              {parsedObject && parsedObject.name && parsedObject.name}
            </Typography>
          </Box>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar sx={{ marginRight: 2 }}>
                {parsedObject && parsedObject.name.charAt(0)}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {/* {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleClickUserMenu(setting)}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))} */}
            <UserMenu userMenu={userMenu} />
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          ".MuiDrawer-paper": {
            backgroundColor: colors["drawerColor"],
            // Add other styles here if needed
          },
        }}
      >
        <DrawerHeader
          sx={{ backgroundColor: colors["drawerColor"], paddingLeft: "20px" }} // Add this line to change background color
        >
          <Box style={{ width: "100%" }}>
            <Typography
              style={{ color: "white", fontWeight: "700", fontSize: "18px" }}
            >
              Click2Fill
            </Typography>
          </Box>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon style={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{ backgroundColor: "black", color: "white" }} // Add this line to change background color
        >
          {listItems.map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block", background: colors["drawerColor"] }}
              onClick={() => setSelectedItem(text)} // Set the selected item
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: "initial",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {/* {index % 2 === 0 ? <InboxIcon /> : <PeopleAltIcon />} */}

                  {getIconForText(text)}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box style={{ flexGrow: "1" }}></Box>
        <Box style={{ color: "white" }}>
          <ListItem
            // key={text}
            disablePadding
            sx={{ display: "block", background: colors["drawerColor"] }}
          // onClick={() => setSelectedItem(text)} // Set the selected item
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: "initial",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, height: "100vh" }}>
        <DrawerHeader />
        <Box
          style={{
            background: "black",
            with: "100%",
            height: "92%",
            // borderRadius: "0px 20px 20px 20px",
          }}
        >
          <Box
            style={{
              background: "white",
              with: "100%",
              height: "100%",
            }}
          >
            {renderComponent()}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const UserMenu = ({ userMenu }) => {
  // Destructure userMenu from props
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClickUserMenu = (item) => {
    setSelectedItem(item);
  };

  // Ensure userMenu is an array before attempting to map over it
  if (!Array.isArray(userMenu)) {
    return null; // or some other fallback UI
  }

  return (
    <>
      {userMenu.map((item) => (
        <MenuItem key={item} onClick={() => handleClickUserMenu(item)}>
          <Typography textAlign="center">{item}</Typography>
        </MenuItem>
      ))}
      {selectedItem === "Profile" && <></>}
      {selectedItem === "Logout" && <LogoutComponent />}
    </>
  );
};
