import React from "react";
import {
  Box,
  Typography,
  Grid,Card,
  Container,
 
  CardMedia,
  CardContent,
  Paper,
  
  Button,
  TextField,
} from "@mui/material";
const courses = [
  {
    title: "Data Science",
    img: "https://www.iimtindia.net/Blog/wp-content/uploads/2021/06/Data-Science.jpg",
  },
  {
    title: "Web Development",
    img: "https://th.bing.com/th/id/OIP.Jg35DTU8xEFi-BbUaql9CQHaEI?rs=1&pid=ImgDetMain",
  },
  {
    title: "AI & Machine Learning",
    img: "https://th.bing.com/th/id/OIP.xXbPP1ewWlvBts9Wpfn0MwHaFP?rs=1&pid=ImgDetMain",
  },
  {
    title: "Digital Marketing",
    img: "https://th.bing.com/th/id/OIP.qhgOEfmuLnXY9XUDyqgNawHaE8?rs=1&pid=ImgDetMain",
  },
  {
    title: "Cyber Security",
    img: "https://th.bing.com/th/id/OIP.u9rmMa7F-vTpCRI4184ldAHaDQ?w=304&h=154&c=7&r=0&o=5&dpr=1.2&pid=1.7",
  },
  {
    title: "Blockchain",
    img: "https://th.bing.com/th/id/OIP.CXliS43kofhbAlDIVQWerAHaEK?w=308&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7",
  },
  {
    title: "Cloud Computing",
    img: "https://th.bing.com/th/id/OIP.thdCdgyK3N58deGCgftqnwHaE6?w=229&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7",
  },
  {
    title: "Graphic Design",
    img: "https://th.bing.com/th/id/OIP.OmEyhK6Dz1cUNe9JKu8ebAHaE7?w=237&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7",
  },
  {
    title: "Business Analytics",
    img: "https://th.bing.com/th/id/OIP.8tqO77WNY9oUCneny9hZtwHaFU?w=250&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7",
  },
  {
    title: "Product Management",
    img: "https://th.bing.com/th/id/OIP.Adp0NSa0FLeuNPAB2Yh6EwHaD4?rs=1&pid=ImgDetMain",
  },
];


const CourseGrid = () => {
  return (
    <Container sx={{ py: 12 }}>
   
      <Grid container spacing={4} sx={{ mt: 8 }}>
        {courses.map((course, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="200"
                image={course.img}
                alt={course.title}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {course.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const Dashboard = () => {
  return (
    <Box sx={{ backgroundColor: "white" }}>
      {/* Header */}
      <Box sx={{ backgroundColor: "green", color: "white", py: 12, textAlign: "center" }}>
        <Typography variant="h2" component="h1" sx={{ mt: 8, fontWeight: "bold" }}>
          Welcome to Blend Vidya 
        </Typography>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Empowering Students through Digital Learning Solutions
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 4, px: 4, py: 1, fontWeight: "bold" }}
        >
          Get Started
        </Button>
      </Box>

      {/* Mission and Values */}
      <Container sx={{ py: 12, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Our Mission and Values
        </Typography>
        <Typography variant="body1" sx={{ mt: 4, maxWidth: "600px", mx: "auto", color: "gray" }}>
          We are committed to making high-quality education accessible to everyone, anytime, anywhere.
          Our platform provides a range of online courses and tools designed to help students excel
          in their studies, from foundational knowledge to advanced career skills.
        </Typography>
        <Grid container justifyContent="center" spacing={4} sx={{ mt: 8 }}>
          <Grid item>
            <Paper elevation={3} sx={{ p: 4, transition: "transform 0.3s", "&:hover": { transform: "scale(1.1)" } }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>200K+</Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>Active Students</Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={3} sx={{ p: 4, transition: "transform 0.3s", "&:hover": { transform: "scale(1.1)" } }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>500+</Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>Certified Courses</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Vision Section */}
      <Box sx={{ backgroundColor: "green", color: "white", py: 12 }}>
        <Container>
          <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center" }}>
            Our Vision
          </Typography>
          <Typography variant="body1" sx={{ mt: 4, maxWidth: "600px", mx: "auto", textAlign: "center" }}>
            To transform education through innovative technology and empower the next generation of learners.
            Our vision is to create a global learning community that fosters growth, curiosity, and success.
          </Typography>
        </Container>
      </Box>

      {/* Popular Courses */}
      <Container sx={{ py: 12, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Popular Courses
        </Typography>
       <CourseGrid />
      </Container>

      {/* Technology Section */}
      <Box sx={{ backgroundColor: "gray.100", py: 12 }}>
        <Container>
          <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center" }}>
            Cutting-Edge Technology
          </Typography>
          <Grid container spacing={4} sx={{ mt: 8 }}>
            {[
              { title: "Interactive Learning", description: "Engage with course content in real-time with our interactive modules." },
              { title: "AI-Powered Assessments", description: "Get personalized assessments that help you learn better." },
              { title: "Collaborative Tools", description: "Work together with classmates and instructors using our collaboration suite." },
              { title: "Virtual Labs", description: "Practice real-world skills in a safe, virtual environment." }
            ].map((tech, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Paper elevation={3} sx={{ p: 4, transition: "box-shadow 0.3s", "&:hover": { boxShadow: 8 } }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>{tech.title}</Typography>
                  <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>{tech.description}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ backgroundColor: "green", color: "white", py: 12 }}>
        <Container>
          <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center" }}>
            Student Testimonials
          </Typography>
          <Grid container spacing={4} sx={{ mt: 8 }}>
            {[
              { text: "FutureEd has transformed the way I learn. The courses are top-notch!", name: "John Doe" },
              { text: "I was able to land my dream job after completing the Web Development course.", name: "Jane Smith" },
              { text: "The AI courses are a game-changer for anyone looking to enter the tech world.", name: "Alex Lee" }
            ].map((testimonial, idx) => (
              <Grid item xs={12} sm={4} key={idx}>
                <Paper elevation={3} sx={{ p: 4, backgroundColor: "green.600", "&:hover": { backgroundColor: "green.500" }, transition: "background-color 0.3s" }}>
                  <Typography variant="body1">"{testimonial.text}"</Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>- {testimonial.name}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact Us Section */}
      <Container sx={{ py: 12, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mt: 4, maxWidth: "600px", mx: "auto", color: "gray" }}>
          Have any questions? Reach out to us and we'll get back to you as soon as possible!
        </Typography>
        <Box
          component="form"
          sx={{
            mt: 6,
            maxWidth: "600px",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField label="Your Name" fullWidth variant="outlined" />
          <TextField label="Your Email" fullWidth variant="outlined" />
          <TextField
            label="Message"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
          />
          <Button variant="contained" color="primary" sx={{ mt: 2, px: 4, py: 1 }}>
            Submit
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ backgroundColor: "green", color: "white", textAlign: "center", py: 4 }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()}  Blend Vidya . All rights reserved. Made by Binary Boats⛵
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
