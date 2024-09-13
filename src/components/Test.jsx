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
} from "@mui/material";
// LIVE_URL
import axios from "axios";
import { LIVE_URL } from "../../config";

function Test() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${LIVE_URL}/test/test`); // Replace with your API endpoint
        setNotes(response.data);
        console.log("Notes updated", response.data);
        // setFilteredUsers(response.data); // Initialize filtered users with full data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDownloadNote = (note) => {
    // Implement logic to download the note as a file
    window.open(note.url);
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <TableContainer component={Paper} sx={{ alignContent: "center" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Index</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Course</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Technology</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {notes.map((note, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{note.name}</TableCell>
                <TableCell>{note.description}</TableCell>
                <TableCell>{note.createdAt?.slice(0, 10)}</TableCell>
                <TableCell>{note.course}</TableCell>
                <TableCell>{note.technology}</TableCell>
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
      </TableContainer>
    </Box>
  );
}

export default Test;
