// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import axios from 'axios';
// import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';


// export default function ManageAllUsers() {
//   const Host = process.env.REACT_APP_API_URL || "http://localhost:5001";
//   const [dataCandidates, setDataCandidates] = useState({ rows: [], columns: [] });
//   const [gridHeight, setGridHeight] = useState(window.innerHeight - 100);
//   const [editRowsModel, setEditRowsModel] = useState({});
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('info');

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpenSnackbar(false);
//   };

//   const fetchCandidates = async () => {
//     const token = localStorage.getItem("accessToken");
//     const baseUrl = new URL(Host).origin;
//     try {
//       const response = await axios.get(`${baseUrl}/api/users/getAllUserIDs`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const users = response.data.users;
//       const gridWidth = document.querySelector('.MuiDataGrid-root')?.offsetWidth || window.innerWidth;
//       const columnWidth = gridWidth / 6;

//       setDataCandidates({
//         rows: users.map((user) => ({
//           id: user._id,
//           employeeID: user.employeeID,
//           email: user.email,
//           password: user.password,
//           uID: user.uID,
//           accessLevel: user.accessLevel === 0 ? 'User' : user.accessLevel === 1 ? 'Admin' : 'Super Admin',
//         })),
//         columns: [
//           { field: "employeeID", headerName: "Employee Id", width: columnWidth, editable: true },
//           { field: "password", headerName: "Password", width: columnWidth, editable: true },
//           { field: "email", headerName: "Email", width: columnWidth, editable: true },
//           { field: "uID", headerName: "User Id", width: columnWidth, editable: true },
//           { field: "accessLevel", headerName: "Access Level", width: columnWidth, editable: true },
//           {
//             field: "actions", headerName: "Actions", width: columnWidth, renderCell: (params) => (
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => handleSubmit(params.id)}
//               >
//                 Submit
//               </Button>
//             )
//           },
//         ],
//       });
//     } catch (error) {
//       console.error('Failed to fetch Candidates:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCandidates();
//   }, []);

//   const handleEditCellChangeCommitted = React.useCallback(({ id, field, props }) => {
//     console.log("Hello");
//     const value = props.value;
//     setEditRowsModel((prev) => {
//       const prevRow = prev[id] || {};
//       const newRow = { ...prevRow, [field]: value };
//       return { ...prev, [id]: newRow };
//     });
//   }, []);

//   const handleSubmit = async (id) => {
//     console.log("Submit", id);
//     const updatedRow = editRowsModel[id];

//     if (!updatedRow) {
//       setSnackbarMessage('No changes made to submit.');
//       setSnackbarSeverity('warning');
//       setOpenSnackbar(true);
//       return;
//     }
//     const token = localStorage.getItem("accessToken");
//     const baseUrl = new URL(Host).origin;
//     try {
//       const response = await axios.post(`${baseUrl}/api/users/updateUser`, updatedRow, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.status === 200) {
//         setSnackbarMessage('User updated successfully.');
//         setSnackbarSeverity('success');
//       } else {
//         setSnackbarMessage('Failed to update user.');
//         setSnackbarSeverity('error');
//       }
//       setOpenSnackbar(true);
//       fetchCandidates(); // Refetch to show updated data
//     } catch (error) {
//       console.error('Failed to update user:', error);
//       setSnackbarMessage('Error updating user.');
//       setSnackbarSeverity('error');
//       setOpenSnackbar(true);
//     }
//   };


//   return (
//     <div style={{ height: gridHeight, width: '100%' }}>
//       <DataGrid
//         rows={dataCandidates.rows}
//         columns={dataCandidates.columns}
//         pageSize={5}
//         rowsPerPageOptions={[5, 10, 25]}
//         onCellEditCommit={handleEditCellChangeCommitted}
//       />
//       <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
//         <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// }




























import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function ManageAllUsers() {
  const Host = process.env.REACT_APP_API_URL || "http://localhost:5001";
  const [dataCandidates, setDataCandidates] = useState({ rows: [], columns: [] });
  const [gridHeight, setGridHeight] = useState(window.innerHeight - 100);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const fetchCandidates = async () => {
    const token = localStorage.getItem("accessToken");
    const baseUrl = new URL(Host).origin;
    try {
      const response = await axios.get(`${baseUrl}/api/users/getAllUserIDs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const users = response.data.users;
      const gridWidth = document.querySelector('.MuiDataGrid-root')?.offsetWidth || window.innerWidth;
      const columnWidth = gridWidth / 8;

      setDataCandidates({
        rows: users.map((user) => ({
          id: user._id,
          employeeID: user.employeeID,
          email: user.email,
          password: user.password,
          uID: user.uID,
          accessLevel: user.accessLevel === 0 ? 'User' : user.accessLevel === 1 ? 'Admin' : 'Super Admin',
        })),
        columns: [
          { field: "employeeID", headerName: "Employee Id", width: columnWidth, editable: true },
          { field: "password", headerName: "Password", width: columnWidth, editable: true },
          { field: "email", headerName: "Email", width: columnWidth, editable: true },
          { field: "uID", headerName: "User Id", width: columnWidth, editable: true },
          { field: "accessLevel", headerName: "Access Level", width: columnWidth, editable: true },
          {
            field: "actions", headerName: "Edit User", width: columnWidth, renderCell: (params) => (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit(params.id)}
              >
                Submit
              </Button>
            )
          },
          {
            field: "deleteUser", headerName: "Delete", width: columnWidth, renderCell: (params) => (
              <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(params.id)}
            >
              Delete
            </Button>
            )
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

  const handleEditCellChangeCommitted = React.useCallback(({ id, field, props }) => {
    console.log("Hello");
    const value = props.value;
    setEditRowsModel((prev) => {
      const prevRow = prev[id] || {};
      const newRow = { ...prevRow, [field]: value };
      return { ...prev, [id]: newRow };
    });
  }, []);

  const handleSubmit = async (id) => {
    console.log("Submit", id);
    const updatedRow = editRowsModel[id];
    console.log("updatedRow : ", updatedRow);

    if (!updatedRow) {
      setSnackbarMessage('No changes made to submit.');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      return;
    }
    const token = localStorage.getItem("accessToken");
    const baseUrl = new URL(Host).origin;
    console.log(baseUrl , token);
    try {
      const response = await axios.post(`${baseUrl}/api/users/update_user`, updatedRow, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('I am res : ', response);
      if (response.status === 200) {
        setSnackbarMessage('User updated successfully.');
        setSnackbarSeverity('success');
      } else {
        setSnackbarMessage('Failed to update user.');
        setSnackbarSeverity('error');
      }
      setOpenSnackbar(true);
      fetchCandidates(); // Refetch to show updated data
    } catch (error) {
      console.error('Failed to update user:', error);
      setSnackbarMessage('Error updating user.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };


  // const handleSubmit = async (id) => {
  //   console.log("Submit", id);
  //   const updatedRow = editRowsModel[id];
  //   console.log("updatedRow : ", updatedRow);
  
  //   if (!updatedRow) {
  //     setSnackbarMessage('No changes made to submit.');
  //     setSnackbarSeverity('warning');
  //     setOpenSnackbar(true);
  //     return;
  //   }
  //   const token = localStorage.getItem("accessToken");
  //   const baseUrl = new URL(Host).origin;
  //   console.log(baseUrl, token);
  //   try {
  //     const response = await axios.post(`${baseUrl}/api/users/update_user`, updatedRow, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     console.log('I am res : ', response);
  
  //     if (response.status === 200) {
  //       setSnackbarMessage('User updated successfully.');
  //       setSnackbarSeverity('success');
  //     } else {
  //       setSnackbarMessage('Failed to update user.');
  //       setSnackbarSeverity('error');
  //     }
  //     setOpenSnackbar(true);
  //     fetchCandidates(); // Refetch to show updated data
  //   } catch (error) {
  //     console.error('Failed to update user:', error);
  //     setSnackbarMessage('Error updating user.');
  //     setSnackbarSeverity('error');
  //     setOpenSnackbar(true);
  //   }
  // };
  

  const handleDelete = async (id) => {
    console.log("Delete", id);
  
    const token = localStorage.getItem("accessToken");
    const baseUrl = new URL(Host).origin;
    const deleteUserEndpoint = `${baseUrl}/api/users/delete_user`;
    try {
      const response = await axios.post(deleteUserEndpoint, {
        id: id, // Sending the user id in the request body
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log(response);
  
      if (response.status === 200) {
        setSnackbarMessage('User deleted successfully.');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        fetchCandidates(); // Refetch to show updated data
      } else {
        setSnackbarMessage('Failed to delete user.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      setSnackbarMessage('Error deleting user.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };
  

  return (
    <div style={{ height: gridHeight, width: '100%' }}>
      <DataGrid
        rows={dataCandidates.rows}
        columns={dataCandidates.columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 25]}
        onCellEditCommit={handleEditCellChangeCommitted}
      />
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

