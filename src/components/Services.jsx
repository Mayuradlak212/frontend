import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';

const Services = () => {
  return (
    <Box sx={{ p: 3, backgroundColor: '#f9f9f9' }}>
      <Typography variant="h4" gutterBottom>Our Services</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Online Courses</Typography>
            <Typography>High-quality courses in various subjects.</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Webinars</Typography>
            <Typography>Live sessions with industry experts.</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Student Support</Typography>
            <Typography>24/7 support to assist your learning journey.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Services;
