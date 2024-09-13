import React from 'react';
import { Box, Card, CardContent, Typography, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const students = [
  { score: '85%', date: '2024-08-25', studentName: 'John Doe', email: 'john.doe@example.com', batch: 'Batch 1', technology: 'React', rank: '5' },
  // Add data for more students here
]; // Replace with your actual student data or API call

const Result = () => {
  return (
    <Container component="main" maxWidth="lg" >
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Card sx={{ maxWidth: '100%', padding: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
              Results Summary
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ width: '100%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Index</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Student Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Batch</TableCell>
                    <TableCell>Technology</TableCell>
                    <TableCell>Rank</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student,index) => (
                    <TableRow key={student.email}>
                      <TableCell>{index+1}</TableCell>
                      <TableCell>{student.score}</TableCell>
                      <TableCell>{student.date}</TableCell>
                      <TableCell>{student.studentName}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.batch}</TableCell>
                      <TableCell>{student.technology}</TableCell>
                      <TableCell>{student.rank}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Result;