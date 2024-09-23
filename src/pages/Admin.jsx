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
  TextField,FormControl,InputLabel,Select,
  InputAdornment,MenuItem,
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
import CreateTest from "../components/CreateTest";
import Assignment from "../components/Assignement";
import SourceCode from "../components/SourceCode";
import NotesEdit from "../components/NotesEdit";
import AdminBatch from "../components/AdminBatch";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentNotesPage, setNotesCurrentPage] = useState(0);
  const [rowsNotesPerPage, setNotesRowsPerPage] = useState(5);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchNotesQuery, setSearchNotesQuery] = useState("");
  const [batch, setBatch] = React.useState("");
  const [studentPopup, setStudentPopup] = useState(false);
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
  const handleBatchChange = (event) => {
    setBatch(event.target.value);
  };
  const [notesOpen, setNotesOpen] = useState(false);
  const [notesEdit, setNotesEdit] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [notesData, setNotesData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    //  setIsAuthenticated(localStorage.getItem("roe")=="admin")
    const fetchData = async () => {
      try {
        const response = await axios.get(`${LIVE_URL}/user/users`); // Replace with your API endpoint
        setUsers(response.data.data.reverse());
        setFilteredUsers(response.data.data?.reverse()); // Initialize filtered users with full data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);
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

  const handleEdit = (user) => {
    setIsEditing(true);
    setEditedUser(user);
    setIsDialogOpen(true);
  };

  const handleDelete = async (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await axios.delete(`${LIVE_URL}/user/users/${user._id}`);
        setUsers(users.filter((u) => u.id !== user.id));
        setFilteredUsers(filteredUsers.filter((u) => u._id !== user.id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`${LIVE_URL}/user/users/${editedUser._id}`, editedUser);
      const updatedUsers = users.map((user) =>
        user._id === editedUser._id ? editedUser : user
      );
      toast.success("Updated users successfully");
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers); // Update filtered users as well
      setIsEditing(false);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

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
  const handleNotesChangeRowsPerPage = (event) => {
    setNotesRowsPerPage(parseInt(event.target.value, 10));
    setNotesCurrentPage(0); // Reset page when rows per page changes
  };

  const handleSearch = (event) => {
    const newQuery = event.target.value.toLowerCase();
    setSearchQuery(newQuery);
    setFilteredUsers(
      users.filter((user) => {
        const nameMatch = user.name.toLowerCase().includes(newQuery);
        const emailMatch = user.email.toLowerCase().includes(newQuery);
        return nameMatch || emailMatch; // Search by both name and email
      })
    );
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    batchId: "507f191e810c19729de860ea",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API request
      const response = await axios.post(`${LIVE_URL}/user/register`, {
        ...formData,
      });
      console.log("response: ", response.data);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      toast.success(response.data.message);
      // navigate("/");
      // window.location.reload();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      toast.error(err.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  return (
    <Box sx={{ width: "97%", overflowX: "auto", boxShadow: 3, padding: 2 }}>
      <Tabs
        value={activeTab}
        sx={{ margin: "10px 0px" }}
        onChange={handleTabChange}
      >
        <Tab label="Users" />
        <Tab label="Notes" />
        <Tab label="Test" />
        <Tab label="Assignment" />
        <Tab label="Source Code" />
        <Tab label="Batch" />
      </Tabs>

      {isAuthenticated || localStorage.getItem("role") == "admin" ? (
        <>
          {activeTab == 0 && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">User List</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button color="primary" onClick={()=>setStudentPopup(true)} variant="contained">
                    Create Student
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search by name or email"
                    size="small"
                    sx={{ width: "50%" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <MuiIconButton
                            aria-label="search"
                            onClick={handleSearch}
                          >
                            <SearchIcon />
                          </MuiIconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Enroll ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers
                    ?.slice(
                      currentPage * rowsPerPage,
                      currentPage * rowsPerPage + rowsPerPage
                    )
                    ?.map((user, index) => (
                      <TableRow key={user?._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{user?.name}</TableCell>
                        <TableCell>{user?.email}</TableCell>
                        <TableCell>{user?.createdAt.slice(0, 10)}</TableCell>
                        <TableCell>{user?._id}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(user)}>
                            <EditIcon color="primary" />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(user)}>
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
                count={filteredUsers?.length || 0}
                rowsPerPage={rowsPerPage}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </>
      ) : (
        <Dialog
          open={isAuthenticationDialogOpen}
          onClose={() => setIsAuthenticationDialogOpen(false)}
          PaperProps={{
            style: {
              padding: "20px", // Add padding around the dialog content
              borderRadius: "8px", // Rounded corners for the dialog
            },
          }}
        >
          <DialogTitle>Authentication</DialogTitle>
          <DialogContent>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="dense" // Add some spacing between text fields
              variant="outlined" // Use outlined variant for better visual separation
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="dense"
              variant="outlined"
            />
          </DialogContent>
          <DialogActions style={{ padding: "10px 20px" }}>
            {" "}
            {/* Spacing for actions */}
            <Button
              onClick={() => setIsAuthenticationDialogOpen(false)}
              color="primary"
              style={{ marginRight: "10px" }} // Add space between buttons
            >
              Cancel
            </Button>
            <Button
              onClick={handleAuthenticationSubmit}
              color="primary"
              variant="contained"
            >
              Login
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {activeTab == 1 && <NotesEdit />}
      {activeTab == 2 && (
        <>
          {" "}
          <Typography fontSize={"20px"}>Tests</Typography>
          <CreateTest />
        </>
      )}
      {activeTab == 3 && (
        <>
          {" "}
          <Typography fontSize={"20px"}>Assignment</Typography>
          <Assignment />
        </>
      )}
      {activeTab == 4 && (
        <>
          {" "}
          <Typography fontSize={"20px"}>Source Code </Typography>
          <SourceCode />
        </>
      )}
      {activeTab == 5 && (
        <>
          {" "}
          <Typography fontSize={"20px"}>Batch </Typography>
          <AdminBatch />
        </>
      )}

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin="2"
            padding="2"
            sx={{ marginTop: "10px" }}
            label="Name"
            value={editedUser?.name}
            onChange={(e) =>
              setEditedUser({ ...editedUser, name: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Email"
            sx={{ marginTop: "10px" }}
            value={editedUser?.email}
            onChange={(e) =>
              setEditedUser({ ...editedUser, email: e.target.value })
            }
            fullWidth
          />
          {/* Add other fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={studentPopup} onClose={() => setStudentPopup(false)}>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Create Student</Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              onChange={handleChange}
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleChange}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleChange}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
            />

            {/* Batch Dropdown */}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="batch-label">Batch</InputLabel>
              <Select
                labelId="batch-label"
                id="batch"
                value={batch}
                onChange={handleBatchChange}
                label="Batch"
              >
                {/* Example batch options */}
                <MenuItem value="batch1">Full Stack Development</MenuItem>
                <MenuItem value="batch2">Data Science With Python</MenuItem>
                <MenuItem value="batch3">DevOps Batch</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleSubmit}
            >
      Create Student
            </Button>
          </Box>
        </Paper>
      </Dialog>
    </Box>
  );
};

export default UserList;
