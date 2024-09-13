import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LIVE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [batch, setBatch] = React.useState("");
const navigate =useNavigate()
  const handleBatchChange = (event) => {
    setBatch(event.target.value);
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
      navigate("/");
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


  useEffect(()=>{
  
  },[])
  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Sign Up</Typography>
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
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUp;
