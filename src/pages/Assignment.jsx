import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Table,
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TablePagination,
} from "@mui/material";
import { LIVE_URL } from "../../config";

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]); // For search filtering
  const [newAssignmentName, setNewAssignmentName] = useState("");
  const [newAssignmentGithubLink, setNewAssignmentGithubLink] = useState("");
  const [newAssignmentDescription, setNewAssignmentDescription] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [newAssignmentFile, setNewAssignmentFile] = useState(null);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch assignments data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${LIVE_URL}/assignment/assignment`);
        setAssignments(response.data);
        setFilteredAssignments(response?.data?.reverse()); // Set filtered assignments initially
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  // Pagination change handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Search filter logic
  useEffect(() => {
    const filteredData = assignments.filter(
      (assignment) =>
        assignment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAssignments(filteredData);
  }, [searchTerm, assignments]);

  // Adding a new assignment
  const handleAddAssignment = () => {
    if (
      newAssignmentName &&
      newAssignmentGithubLink &&
      newAssignmentDescription
    ) {
      const newAssignment = {
        name: newAssignmentName,
        githubLink: newAssignmentGithubLink,
        description: newAssignmentDescription,
        date: new Date().toLocaleDateString(),
      };
      setAssignments([...assignments, newAssignment]);
      setFilteredAssignments([...filteredAssignments, newAssignment]);
      localStorage.setItem(
        "assignments",
        JSON.stringify([...assignments, newAssignment])
      );
      setOpenDialog(false);
      setNewAssignmentName("");
      setNewAssignmentGithubLink("");
      setNewAssignmentDescription("");
    }
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          label="Search Assignments"
          variant="outlined"
          marginLeft="10px"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenDialog(true)}
        >
          Add Assignment
        </Button> */}
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Index</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Course</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Technology</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAssignments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((assignment, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                  <TableCell>{assignment.name}</TableCell>
                  <TableCell>{assignment.course}</TableCell>
                  <TableCell>{assignment.technology}</TableCell>
                  <TableCell>{assignment.description}</TableCell>
                  <TableCell>{assignment.createdAt.slice(0, 10)}</TableCell>
                  <TableCell
                    style={{
                      color: assignment.status ? "green" : "yellow",
                    }}
                  >
                    {assignment.status ? "Completed" : "Pending"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredAssignments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Assignment</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} mt={2}>
              <TextField
                label="Assignment Name"
                fullWidth
                value={newAssignmentName}
                onChange={(e) => setNewAssignmentName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="GitHub Link"
                fullWidth
                value={newAssignmentGithubLink}
                onChange={(e) => setNewAssignmentGithubLink(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={newAssignmentDescription}
                onChange={(e) => setNewAssignmentDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="file"
                onChange={(e) => setNewAssignmentFile(e.target.files[0])}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddAssignment}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AssignmentsPage;
