import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const HeroSection = () => {
  return (
    <Box
      sx={{
        height: '50vh',
        backgroundImage: 'url(https://source.unsplash.com/featured/?education)',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        p: 3,
      }}
    >
      <Typography variant="h3" gutterBottom>Welcome to Our EdTech Platform</Typography>
      <Typography variant="h6" gutterBottom>Your Pathway to Learning Excellence</Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>Get Started</Button>
    </Box>
  );
};

export default HeroSection;
