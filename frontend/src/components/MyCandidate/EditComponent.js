// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import DisplayComponent from './DisplayComponent';
// import { Box, Tabs, Tab, Pagination, TextField, MenuItem } from '@mui/material';

// const EditComponent = () => {
//     const host = process.env.REACT_APP_API_URL || "http://localhost:5001";
//     const [data, setData] = useState([]);
//     const [tabValue, setTabValue] = useState(0);
//     const [expanded, setExpanded] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(0);
//     const [searchKey, setSearchKey] = useState(''); // For storing selected key from dropdown
//     const [searchValue, setSearchValue] = useState(''); // For storing input from search box

//     // Function to fetch data based on current state (tab, search, pagination)

//     const fetchData = async () => {
//         const token = localStorage.getItem("accessToken");
//         const baseUrl = new URL(host).origin;
//         let endpoint = '/api/filter_candidate'; // Use the filter_candidate endpoint for all tabs
//         let filters = {};
    
//         // Apply filters based on the tab, except for the 'All' tab
//         if (tabValue > 0) {
//             filters = { "applicationStatus": ['', 'shortlisted', 'notShortlisted', 'rnr'][tabValue] };
//         }
    
//         // Include search filters if they are defined
//         if (searchKey && searchValue) {
//             filters = { ...filters, [searchKey]: searchValue };
//         }
    
//         const requestData = {
//             page: currentPage,
//             limit: 10,
//             filters,
//         };
    
//         try {
//             const response = await axios.post(`${baseUrl}${endpoint}`, requestData, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setData(response.data.candidataData || []);
//             const totalItems = response.data.totalItems || 0;
//             setTotalPages(Math.ceil(totalItems / requestData.limit));
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             setData([]);
//             setTotalPages(1); // Fallback to avoid invalid states
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, [host, currentPage, tabValue, searchKey, searchValue]);

//     const handleTabChange = (event, newValue) => {
//         setTabValue(newValue);
//         setCurrentPage(1); // Reset to the first page on tab change
//         fetchData(); // Refetch data for the new tab
//     };

//     const onAccordionChange = (index) => {
//         setExpanded(expanded === index ? false : index);
//     };

//     const handlePageChange = (event, page) => {
//         setCurrentPage(page);
//         fetchData(); // Refetch data for the new page
//     };

//     const handleSearch = (e) => {
//         if (e.key === 'Enter') {
//             setCurrentPage(1); // Reset to the first page on search
//             fetchData(); // Refetch data based on search criteria
//         }
//     };

//     // No changes required for saveData function as it's not directly related to fetching or filtering
//     const saveData = (newData) => {
//         console.log(newData);
//         setData(newData);
//     };

//     return (
//         <>
//             <Box sx={{ width: '100%' }}>
//                 <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
//                         <Tab label="All" {...a11yProps(0)} />
//                         <Tab label="Shortlisted" {...a11yProps(1)} />
//                         <Tab label="Not Shortlisted" {...a11yProps(2)} />
//                         <Tab label="RNR" {...a11yProps(3)} />
//                     </Tabs>
//                     <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
//                         <TextField
//                             select
//                             label="Search By"
//                             value={searchKey}
//                             onChange={(e) => setSearchKey(e.target.value)}
//                             variant="outlined"
//                             sx={{ minWidth: 120, marginRight: 2 }}
//                         >
//                             <MenuItem value="candidateName">Name</MenuItem>
//                             <MenuItem value="contactNumber">Contact Number</MenuItem>
//                             <MenuItem value="currentLocation">Current Location</MenuItem>
//                             <MenuItem value="status">Status</MenuItem>
//                             <MenuItem value="website">Website</MenuItem>
//                         </TextField>
//                         <TextField
//                             label="Search Value"
//                             value={searchValue}
//                             onChange={(e) => setSearchValue(e.target.value)}
//                             onKeyPress={handleSearch}
//                             variant="outlined"
//                             fullWidth
//                         />
//                     </Box>
//                 </Box>
//             </Box>
            
//             <DisplayComponent data={data} onAccordionChange={onAccordionChange} saveData={saveData} />
//         </>
//     );
// };

// // No changes required for a11yProps function as it's utility for accessibility
// function a11yProps(index) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }

// export default EditComponent;


















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayComponent from './DisplayComponent';
import { Box, Tabs, Tab, Pagination, TextField, MenuItem } from '@mui/material';

const EditComponent = () => {
    const host = process.env.REACT_APP_API_URL || "http://localhost:5001";
    const [data, setData] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchKey, setSearchKey] = useState(''); // For storing selected key from dropdown
    const [searchValue, setSearchValue] = useState(''); // For storing input from search box

    // Function to fetch data based on current state (tab, search, pagination)

    const fetchData = async () => {
        const token = localStorage.getItem("accessToken");
        const baseUrl = new URL(host).origin;
        let endpoint = '/api/filter_candidate'; // Use the filter_candidate endpoint for all tabs
        let filters = {};
    
        // Apply filters based on the tab
        if (tabValue > 0) {
            const statuses = ['', 'shortlisted', 'notShortlisted', 'rnr', ''][tabValue];
            if (statuses !== '') {
                filters = { "applicationStatus": statuses };
            }
        }
        // Handle the Fresh tab
        if (tabValue === 4) {
            filters = { "applicationStatus": "" };
        }
    
        // Include search filters if they are defined
        if (searchKey && searchValue) {
            filters = { ...filters, [searchKey]: searchValue };
        }
    
        const requestData = {
            page: currentPage,
            limit: 10,
            filters,
        };
    
        try {
            const response = await axios.post(`${baseUrl}${endpoint}`, requestData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setData(response.data.candidataData || []);
            const totalItems = response.data.totalItems || 0;
            setTotalPages(Math.ceil(totalItems / requestData.limit));
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
            setTotalPages(1); // Fallback to avoid invalid states
        }
    };

    useEffect(() => {
        fetchData();
    }, [host, currentPage, tabValue, searchKey, searchValue]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        setCurrentPage(1); // Reset to the first page on tab change
        fetchData(); // Refetch data for the new tab
    };

    const onAccordionChange = (index) => {
        setExpanded(expanded === index ? false : index);
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
        fetchData(); // Refetch data for the new page
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            setCurrentPage(1); // Reset to the first page on search
            fetchData(); // Refetch data based on search criteria
        }
    };

    // No changes required for saveData function as it's not directly related to fetching or filtering
    const saveData = (newData) => {
        console.log(newData);
        setData(newData);
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
                        <Tab label="All" {...a11yProps(0)} />
                        <Tab label="Shortlisted" {...a11yProps(1)} />
                        <Tab label="Not Shortlisted" {...a11yProps(2)} />
                        <Tab label="RNR" {...a11yProps(3)} />
                        <Tab label="Fresh" {...a11yProps(4)} />
                    </Tabs>
                    <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                        <TextField
                            select
                            label="Search By"
                            value={searchKey}
                            onChange={(e) => setSearchKey(e.target.value)}
                            variant="outlined"
                            sx={{ minWidth: 120, marginRight: 2 }}
                        >
                            <MenuItem value="candidateName">Name</MenuItem>
                            <MenuItem value="contactNumber">Contact Number</MenuItem>
                            <MenuItem value="currentLocation">Current Location</MenuItem>
                            <MenuItem value="status">Status</MenuItem>
                            <MenuItem value="website">Website</MenuItem>
                        </TextField>
                        <TextField
                            label="Search Value"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyPress={handleSearch}
                            variant="outlined"
                            fullWidth
                        />
                    </Box>
                </Box>
            </Box>
            
            <DisplayComponent data={data} onAccordionChange={onAccordionChange} saveData={saveData} />
        </>
    );
};

// No changes required for a11yProps function as it's utility for accessibility
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default EditComponent;

