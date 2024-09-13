import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Image from "../assets/img.jpg";
import axios from "axios";
import { LIVE_URL } from "../../config";
const Batch = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${LIVE_URL}/batch/batch`); // Replace with your API endpoint
        setNotes(response.data);
        console.log("Notes updated", response.data);
        // setFilteredUsers(response.data); // Initialize filtered users with full data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 4,
        padding: 2,
      }}
    >
      {notes.map((event, index) => {
       return  <Card sx={{ maxWidth: 345 }} key={index}>
          <CardMedia
            component="img"
            height="140"
            // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJRV_6BHD1vkNcx-Iy3eShKfebv4vdQK4lQ&s"
            src={event.url}
            //   image={Image} // Replace with your image link
            alt={event.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {event.name}
            </Typography>
            {/* Start Date and End Date in Flex */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                <strong>Start Date:</strong> {event.startDate}
              </Typography>
              <Typography paddingLeft={2} variant="body2" color="text.secondary">
                <strong>End Date:</strong>
                {event.endDate}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Explore
            </Button>
          </CardActions>
        </Card>;
      })}

{/*  
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPnfj_PdfHzyNebKKRpuxJQw8267pRkP0Xog&s"
          //   image={Image} // Replace with your image link
          alt="Batch Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Full Stack Development
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              <strong>Start Date:</strong> 2024-09-01
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>End Date:</strong> 2025-03-15
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Explore
          </Button>
        </CardActions>
      </Card>


      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          src="https://www.naukri.com/campus/career-guidance/wp-content/uploads/2023/11/what-is-data-science.jpg"
          //   image={Image}  // Replace with your image link
          alt="Batch Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Data Science With Python
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              <strong>Start Date:</strong> 2024-09-01
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>End Date:</strong> 2025-03-15
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Explore
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          src="https://img.freepik.com/free-vector/wireframe-robot-ai-artificial-intelligence-robotic-hand-machine-learning-cyber-mind-domination-concept_127544-852.jpg?t=st=1725349961~exp=1725353561~hmac=f6d28bb91919b01119e78a9721ed73bb2cb7b24a45a26e961ed22a922f9bfdf0&w=900"
          //   image={Image}  // Replace with your image link
          alt="Batch Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Artificial Intelligence
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              <strong>Start Date:</strong> 2024-09-01
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>End Date:</strong> 2025-03-15
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Explore
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          src="https://th.bing.com/th/id/OIP.thdCdgyK3N58deGCgftqnwHaE6?rs=1&pid=ImgDetMain"
          //   image={Image}  // Replace with your image link
          alt="Batch Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Cloud Computing
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              <strong>Start Date:</strong> 2024-09-01
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>End Date:</strong> 2025-03-15
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Explore
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          src="https://static-00.iconduck.com/assets.00/salesforce-icon-2048x1434-jxt80iiu.png"
          //   image={Image}  // Replace with your image link
          alt="Batch Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Salesforce
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              <strong>Start Date:</strong> 2024-09-01
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>End Date:</strong> 2025-03-15
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Explore
          </Button>
        </CardActions>
      </Card>*/}
    </Box>
  );
};

export default Batch;
