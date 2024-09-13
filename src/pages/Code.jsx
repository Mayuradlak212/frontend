import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import { LIVE_URL } from "../../config";

const Code = () => {
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(0); // For managing current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${LIVE_URL}/code/code`);
        setNotes(response?.data?.reverse());
        console.log("Notes updated", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDownloadNote = (note) => {
    window.open(note.url);
  };

  // Handle change in page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change in rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <TableContainer component={Paper} sx={{ alignContent: "center" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Index</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Course</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Technology</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Topic</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Uploaded Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Pagination logic
              .map((note, index) => (
                <TableRow key={index}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{note.name}</TableCell>
                  <TableCell>{note.course}</TableCell>
                  <TableCell>{note.technology}</TableCell>
                  <TableCell>{note.topic}</TableCell>
                  <TableCell>{note.createdAt?.slice(0, 10)}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDownloadNote(note)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Pagination controls */}
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          count={notes.length} // Total number of notes
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default Code;
