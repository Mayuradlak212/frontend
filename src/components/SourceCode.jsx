import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  IconButton as MuiIconButton,
  Paper,
  TablePagination,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { LIVE_URL } from "../../config";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SourceCode() {
  const [currentNotesPage, setNotesCurrentPage] = useState(0);
  const [rowsNotesPerPage, setNotesRowsPerPage] = useState(10);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchNotesQuery, setSearchNotesQuery] = useState("");

  const [noteData, setNoteData] = useState({
    course: "",
    technology: "",
    name: "",
    url: "",
    topic: "",
  });
  const [notesOpen, setNotesOpen] = useState(false);
  const [notesEdit, setNotesEdit] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [notesData, setNotesData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${LIVE_URL}/code/code`); // Replace with your API endpoint
        setNotesData(response.data);
        setFilteredNotes(response?.data?.reverse()); // Initialize filtered users with full data
        // setFilteredUsers(response.data.data); // Initialize filtered users with full data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);
  const handleNotesDelete = async (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await axios.delete(`${LIVE_URL}/code/code/${user._id}`);
        // setUsers(users.filter((u) => u.id !== user.id));
        toast.success("Test Delete successfully!");

        // setFilteredUsers(filteredUsers.filter((u) => u.id !== user.id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleNotesSaveEdit = async () => {
    try {
      await axios.put(`${LIVE_URL}/code/code/${notesEdit._id}`, notesEdit);
      // const updatedUsers = noteData.map((user) =>
      //   user._id === editedUser._id ? editedUser : user
      // );
      // Update filtered users as well
      toast.success("Code  Updates successfully!");

      setEditOpen(false);
      // (false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const handleNotesSearch = (event) => {
    const newQuery = event.target.value.toLowerCase();
    setSearchNotesQuery(newQuery);
    setFilteredNotes(
      notesData.filter((user) => {
        const nameMatch = user.name.toLowerCase().includes(newQuery);
        const emailMatch = user.course.toLowerCase().includes(newQuery);
        return nameMatch || emailMatch; // Search by both name and email
      })
    );
  };
  const handleInputChange = (e) => {
    setNoteData({ ...noteData, [e.target.name]: e.target.value });
  };
  
  const handleAddNote = () => {
    axios
      .post(`${LIVE_URL}/code/code`, noteData)
      .then((response) => {
        console.log("Code added successfully:", response.data);
        toast.success("Code added successfully!");
        // Optionally clear form data or give feedback to the user
        setNotesOpen(false);
      })
      .catch((error) => {
        console.error("Error adding Code:", error);
      });
    handleClose();
  };
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setNotesEdit({ ...notesEdit, [name]: value });
  };
  const emptyRows =
  rowsNotesPerPage > 0 ? Math.max(0, rowsNotesPerPage - filteredNotes?.length) : 0;
const handleClose = () => {
  setOpen(false);
  setNotesOpen(false);
};
const handleChangePage = (event, newPage) => {
    setNotesCurrentPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setNotesCurrentPage(0); // Reset page when rows per page changes
  };
  return (
    <div>
      <Dialog open={notesOpen} onClose={() => setNotesOpen(false)}>
        <DialogTitle>Add Source Code</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Course"
            name="course"
            type="text"
            fullWidth
            variant="outlined"
            value={noteData.course}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Topic"
            name="topic"
            type="text"
            fullWidth
            variant="outlined"
            value={noteData.topic}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Technology"
            name="technology"
            type="text"
            fullWidth
            variant="outlined"
            value={noteData.technology}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            label="Name"
            name="name"
            type="text"
            fullWidth
            variant="outlined"
            value={noteData.name}
            onChange={handleInputChange}
          />
          
          <TextField
            margin="dense"
            label="URL"
            name="url"
            type="url"
            fullWidth
            variant="outlined"
            value={noteData.url}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNotesOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddNote} color="primary">
            Add Source Code 
          </Button>
        </DialogActions>
      </Dialog>
      <Box>
        <TextField
          label="Search"
          variant="outlined"
          value={searchNotesQuery}
          onChange={handleNotesSearch}
          placeholder="Search by name or email"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <MuiIconButton aria-label="search" onClick={handleNotesSearch}>
                  <SearchIcon />
                </MuiIconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          sx={{ marginLeft: "10px" }}
          onClick={() => setNotesOpen(true)}
        >
          Add Source Code 
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell  sx={{ fontWeight: "bold" }} >ID</TableCell>
              <TableCell  sx={{ fontWeight: "bold" }} >Name</TableCell>
              <TableCell  sx={{ fontWeight: "bold" }} >Course</TableCell>
              <TableCell  sx={{ fontWeight: "bold" }} >Topic</TableCell>
              <TableCell  sx={{ fontWeight: "bold" }} >Technology</TableCell>
              <TableCell  sx={{ fontWeight: "bold" }} >Upload Date</TableCell>
              <TableCell  sx={{ fontWeight: "bold" }} >Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredNotes
              ?.slice(
                currentNotesPage * rowsNotesPerPage,
                currentNotesPage * rowsNotesPerPage + rowsNotesPerPage
              )
              ?.map((user, index) => (
                <TableRow key={user?._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user?.name}</TableCell>
                  <TableCell>{user?.course}</TableCell>
                  <TableCell>{user?.topic}</TableCell>
                  <TableCell>{user?.technology}</TableCell>
                  <TableCell>{user?.createdAt.slice(0, 10)}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        // handleNotesSaveEdit(user)
                        setNotesEdit(user);
                        setEditOpen(true);
                      }}
                    >
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleNotesDelete(user)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredNotes?.length || 0}
          rowsPerPage={rowsNotesPerPage}
          page={currentNotesPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Source Code </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Course"
            name="course"
            type="text"
            fullWidth
            variant="outlined"
            value={notesEdit.course}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            label="Topic"
            name="topic"
            type="text"
            fullWidth
            variant="outlined"
            value={notesEdit.topic}
            onChange={handleEditInputChange}
            required
          />
          <TextField
            margin="dense"
            label="Technology"
            name="technology"
            type="text"
            fullWidth
            variant="outlined"
            value={notesEdit.technology}
            onChange={handleEditInputChange}
            required
          />
          <TextField
            margin="dense"
            label="Name"
            name="name"
            type="text"
            fullWidth
            variant="outlined"
            value={notesEdit.name}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            label="URL"
            name="url"
            type="url"
            fullWidth
            variant="outlined"
            value={notesEdit.url}
            onChange={handleEditInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleNotesSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SourceCode;
