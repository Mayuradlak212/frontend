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
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { LIVE_URL } from "../../config";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadFile } from "../firebase/upload";

function AdminBatch() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentNotesPage, setNotesCurrentPage] = useState(0);
  const [rowsNotesPerPage, setNotesRowsPerPage] = useState(5);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchNotesQuery, setSearchNotesQuery] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAuthenticationDialogOpen, setIsAuthenticationDialogOpen] =
    useState(true);
  const [noteData, setNoteData] = useState({
    url: "",
    startDate: "",
    endDate: "",
    name: "",

    description: "",
  });
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleFileChange = async (event) => {
    const url = await uploadFile(event.target.files[0]);
    setNoteData({ ...noteData, url });
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
        const response = await axios.get(`${LIVE_URL}/batch/batch`); // Replace with your API endpoint
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
        await axios.delete(`${LIVE_URL}/batch/batch/${user._id}`);
        setUsers(users.filter((u) => u.id !== user.id));
        setFilteredUsers(filteredUsers.filter((u) => u.id !== user.id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleNotesSaveEdit = async () => {
    try {
      await axios.put(`${LIVE_URL}/batch/batch/${notesEdit._id}`, notesEdit);
      toast.success("Batch updated successfully");
      setEditOpen(false);
      // (false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
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
      .post(`${LIVE_URL}/batch/batch`, noteData)
      .then((response) => {
        console.log("Batch added successfully:", response.data);
        toast.success("Batch added successfully!");
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
        {/* <Typography fontSize={"20px"}>Notes</Typography> */}
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
          Create Batch
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Start Date </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>End Date </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Description </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Image </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Created At</TableCell>
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
                  <TableCell>{user?.startDate}</TableCell>
                  <TableCell>{user?.endDate}</TableCell>
                  <TableCell>{user?.description}</TableCell>
                  <TableCell>
                    <ImageListItem>
                      <img
                        src={user?.url}
                        alt={user?.name}
                        style={{
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    </ImageListItem>
                  </TableCell>
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
        <DialogTitle>Update Batch </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Batch Name"
            name="name"
            type="text"
            fullWidth
            variant="outlined"
            value={notesEdit.name}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            label="Start Date"
            name="startDate"
            type="date"
            fullWidth
            variant="outlined"
            value={notesEdit.startDate}
            onChange={handleEditInputChange}
            required
          />
          <TextField
            margin="dense"
            label="End Date "
            name="endDate"
            type="date"
            fullWidth
            variant="outlined"
            value={notesEdit.endDate}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            type="text"
            fullWidth
            variant="outlined"
            value={notesEdit.description}
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
        <DialogTitle>Create Batch </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Batch Name "
            name="name"
            type="text"
            fullWidth
            variant="outlined"
            value={noteData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Start Date "
            name="startDate"
            type="date"
            fullWidth
            variant="outlined"
            value={noteData.startDate}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            label="End Date "
            name="endDate"
            type="date"
            fullWidth
            variant="outlined"
            value={noteData.endDate}
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
            type="file"
            fullWidth
            variant="outlined"
            onChange={handleFileChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNotesOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddNote} color="primary">
            Add Batch
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminBatch;
