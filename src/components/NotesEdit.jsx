import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Tab,
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

function NotesEdit() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentNotesPage, setNotesCurrentPage] = useState(0);
  const [rowsNotesPerPage, setNotesRowsPerPage] = useState(10);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchNotesQuery, setSearchNotesQuery] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAuthenticationDialogOpen, setIsAuthenticationDialogOpen] =
    useState(true);
  const [noteData, setNoteData] = useState({
    course: "",
    technology: "",
    name: "",
    url: "",
    description: "",
  });
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const [notesOpen, setNotesOpen] = useState(false);
  const [notesEdit, setNotesEdit] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [notesData, setNotesData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${LIVE_URL}/notes/notes`); // Replace with your API endpoint
        setNotesData(response.data);
        setFilteredNotes(response.data); // Initialize filtered users with full data
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
        await axios.delete(`${LIVE_URL}/notes/notes/${user._id}`);
        setUsers(users.filter((u) => u.id !== user.id));
        setFilteredUsers(filteredUsers.filter((u) => u.id !== user.id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleNotesSaveEdit = async () => {
    try {
      await axios.put(`${LIVE_URL}/notes/notes/${notesEdit._id}`, notesEdit);
      toast.success("Notes updated successfully");
      setEditOpen(false);
      // (false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUser(null);
    setIsDialogOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const handleChangeNotesPage = (event, newPage) => {
    setNotesCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0); // Reset page when rows per page changes
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
  const handleAuthenticationSubmit = async () => {
    try {
      if (username == "mayur" && password == "mayur") {
        setIsAuthenticated(true);
        localStorage.setItem("admin", true);
        setIsAuthenticationDialogOpen(false);
        toast.success("Authentication successful!");
        localStorage.setItem("role", "admin");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      // Handle authentication failure (e.g., display an error message)
    }
  };
  const emptyRows =
    rowsPerPage > 0 ? Math.max(0, rowsPerPage - filteredUsers?.length) : 0;
  const handleClose = () => {
    setOpen(false);
    setNotesOpen(false);
  };

  const handleInputChange = (e) => {
    setNoteData({ ...noteData, [e.target.name]: e.target.value });
  };

  const handleAddNote = () => {
    axios
      .post(`${LIVE_URL}/notes/notes`, noteData)
      .then((response) => {
        console.log("Note added successfully:", response.data);
        toast.success("Note added successfully!");
        // Optionally clear form data or give feedback to the user
        setNotesOpen(false);
      })
      .catch((error) => {
        console.error("Error adding note:", error);
      });
    handleClose();
  };
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setNotesEdit({ ...notesEdit, [name]: value });
  };
  return (
    <div>
      <Box>
        <Typography fontSize={"20px"}>Notes</Typography>
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
          Add Notes
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Course</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Technology</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Upload Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
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
        <DialogTitle>Edit Note</DialogTitle>
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
      
        <Dialog open={notesOpen} onClose={() => setNotesOpen(false)}>
        <DialogTitle>Add a New Note</DialogTitle>
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
            label="Description"
            name="description"
            type="text"
            fullWidth
            variant="outlined"
            value={noteData.description}
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
            Add Note
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NotesEdit;
