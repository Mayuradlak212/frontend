import * as React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,makeStyles,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';
import { API_URL } from '../../config';

// Sample data
const rides = [
  {
    ride_id: '12345',
    rideable_type: 'electric_bike',
    started_at: '2023-07-01T08:00:00Z',
    ended_at: '2023-07-01T08:30:00Z',
    start_station_name: 'Station A',
    start_station_id: 'STA001',
    end_station_name: 'Station B',
    end_station_id: 'STB001',
    start_lat: '40.7128',
    start_lng: '-74.0060',
    end_lat: '40.7128',
    end_lng: '-74.0060',
    member_casual: 'member'
  },
  // Add more ride objects as needed
];

const RideTable= () => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get(`${API_URL}/rides?page=${page+1}&limit=${rowsPerPage}`); // Replace with your API endpoint
        setData(response?.data?.data);
        setCount(response?.data?.count);
        console.log("Data received ", response?.data?.data)
      } catch (error) {
        console.error('Error fetching rides:', error);
      }
    };

    fetchRides();
  }, [page,rowsPerPage]);
  const useStyles = {
    tableContainer: {
      maxHeight: 'auto',
      width: '90vw',
      overflow: 'auto',
    },
    tableHeaderCell: {
      fontWeight: 'bold',
      backgroundColor: '#f0f0f0',  // Light grey background for headers
    },
    tableRow: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#f9f9f9',  // Light background color for odd rows
      },
      '&:hover': {
        backgroundColor: '#e0e0e0',  // Darker background color on hover
      },
    },
  };
  return (
    <Paper>
      <TableContainer sx={useStyles.tableContainer}>
        <Table stickyHeader>
          <TableHead>
          <TableCell sx={useStyles.tableHeaderCell}>Ride ID</TableCell>
            <TableCell sx={useStyles.tableHeaderCell}>Rideable Type</TableCell>
            {/* <TableCell sx={useStyles.tableHeaderCell}>Started At</TableCell>
            <TableCell sx={useStyles.tableHeaderCell}>Ended At</TableCell>
            <TableCell sx={useStyles.tableHeaderCell}>Start Station Name</TableCell>
            <TableCell sx={useStyles.tableHeaderCell}>Start Station ID</TableCell>
            <TableCell sx={useStyles.tableHeaderCell}>End Station Name</TableCell> */}
            <TableCell sx={useStyles.tableHeaderCell}>End Station ID</TableCell>
            <TableCell sx={useStyles.tableHeaderCell}>Start Lat</TableCell>
            <TableCell sx={useStyles.tableHeaderCell}>Start Lng</TableCell>
            <TableCell sx={useStyles.tableHeaderCell}>End Lat</TableCell>
            <TableCell sx={useStyles.tableHeaderCell}>End Lng</TableCell>
            <TableCell sx={useStyles.tableHeaderCell}>Member/Casual</TableCell>
         
          </TableHead>
          <TableBody>
            {data?.map((ride) => (
             <TableRow key={ride?.ride_id} sx={useStyles.tableRow}>
             <TableCell  style={{ width: '10%' }}>{ride?.ride_id}</TableCell>
             <TableCell  style={{ width: '10%' }}>{ride?.rideable_type}</TableCell>
             {/* <TableCell  style={{ width: '10%' }}>{ride?.started_at?.slice(0,10)}</TableCell>
             <TableCell  style={{ width: '10%' }}>{ride?.ended_at?.slice(0,10)}</TableCell>
             <TableCell  style={{ width: '10%' }}>{ride?.start_station_name}</TableCell>
             <TableCell  style={{ width: '10%' }}>{ride?.start_station_id}</TableCell>
             <TableCell  style={{ width: '10%' }}>{ride?.end_station_name}</TableCell> */}
             <TableCell  style={{ width: '10%' }}>{ride?.end_station_id}</TableCell>
             <TableCell  style={{ width: '10%' }}>{ride?.start_lat}</TableCell>
             <TableCell  style={{ width: '10%' }}>{ride?.start_lng}</TableCell>
             <TableCell  style={{ width: '10%' }}>{ride?.end_lat}</TableCell>
             <TableCell  style={{ width: '10%' }}>{ride?.end_lng}</TableCell>
             <TableCell  style={{ width: '10%' }}>{ride?.member_casual}</TableCell>
           </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default RideTable;
