import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LIVE_URL } from "../../config";
import axios from "axios";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [newBatch, setNewBatch] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [newBio, setNewBio] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [newGithub, setNewGithub] = useState("");
  const [newLinkedin, setNewLinkedin] = useState("");
 useEffect(() =>{
  const fetchData = async () => {
    try {
      const response = await axios.get(`${LIVE_URL}/user/users/${user._id}`); // Replace with your API endpoint
      setUserData(response.data);
      setNewBio(response.data.bio);
      setNewBatch(response.data.batch);
      setNewEmail(response.data.email);
      setNewLocation(response.data.location);
      setNewWebsite(response.data.website);
      setNewGithub(response.data.github);
      setNewLinkedin(response.data.linkedin);
setName(response.data.name);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  fetchData();
 },[])
  const handleChange = () => {

      const { name, value } = e.target;
      userData({ ...userData, [name]: value });

  
  };

  const handleEditProfile = async () => {
    try {
      const updatedUserData = {
        ...userData,
        profilePicture: newProfilePicture
          ? URL.createObjectURL(newProfilePicture)
          : userData.profilePicture,
        batch: newBatch || userData.batch,
        bio: newBio || userData.bio,
        email: newEmail || userData.email,
        location: newLocation || userData.location,
        website: newWebsite || userData.website,
        github: newGithub || userData.github,
        linkedin: newLinkedin || userData.linkedin,
      };
      await axios.put(`${LIVE_URL}/user/users/${user?._id}`, updatedUserData);
      toast.success("Profile updated successfully");
  setOpenEditDialog(false);
      // (false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    if (user) {
      return;
    } else {
      window.location.reload();
      navigate("/auth/login");
    }
  }, []);
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          transition: "box-shadow 0.3s ease-in-out",
          borderRadius: 2,
          backgroundColor: "background.paper",
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
          },
          position: "relative",
        }}
      >
        <Avatar
          sx={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            marginBottom: 2,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": {
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
            },
          }}
          src={userData.image}
          alt={user.name}
        />
        <Button
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: "6px 16px",
            fontSize: "0.875rem",
          }}
          variant="contained"
          color="primary"
          onClick={() => setOpenEditDialog(true)}
        >
          Edit
        </Button>
        <Typography
          variant="h5"
          sx={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 2,
            textAlign: "center",
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginBottom: 2, textAlign: "center" }}
        >
          {newBio}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Batch:
            </Typography>
            <Typography variant="body2">Full Stack Development </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Email:
            </Typography>
            <Typography variant="body2">{userData.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Location:
            </Typography>
            <Typography variant="body2">{userData.location}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Website:
            </Typography>
            <Typography variant="body2">
              <a
                href={newWebsite}
                target="_blank"
                rel="noopener noreferrer"
              >
                {newWebsite}
              </a>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              GitHub:
            </Typography>
            <Typography variant="body2">
              <a
                href={newGithub}
                target="_blank"
                rel="noopener noreferrer"
              >
                {newGithub}
              </a>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              LinkedIn:
            </Typography>
            <Typography variant="body2">
              <a
                href={newLinkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                {newLinkedin}
              </a>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Profile Picture"
                type="file"
                fullWidth
                onChange={(e) => setNewProfilePicture(e.target.files[0])}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Batch"
                fullWidth
                value={newBatch}
                onChange={(e) => setNewBatch(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Bio"
                fullWidth
                multiline
                rows={4}
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location"
                fullWidth
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Website"
                fullWidth
                value={newWebsite}
                onChange={(e) => setNewWebsite(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="GitHub"
                fullWidth
                value={newGithub}
                onChange={(e) => setNewGithub(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="LinkedIn"
                fullWidth
                value={newLinkedin}
                onChange={(e) => setNewLinkedin(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditProfile}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserProfile;
