import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Container, Grid, CardMedia } from '@mui/material';

const TechnologyPage = () => {
  const [technologies, setTechnologies] = useState([
    { name: 'HTML ', description: 'Hyper Text Markup Language', image: 'https://cdn-icons-png.flaticon.com/256/174/174854.png' },
    { name: 'CSS', description: 'Cascading Style Sheets', image: 'https://images.prismic.io/turing/652ebea8fbd9a45bcec8188d_What_Goes_Behind_Writing_a_Flawless_CSS_Code_37742e2bcf.webp?auto=format,compress' },
    { name: 'JavaScript', description: 'A TypeScript-based  building web applications', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4am68-Zt3vUUDdFuUwmJrFpLjHlpTk_MHkw&s' },
    { name: 'React.js', description: 'React is the library for web and native user interfaces.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSulrr24IUrWkFnA5aSZ3rxQxC6_YPPC_jrJQ&s' },
    { name: 'Node js', description: 'Node.js® is a JavaScript runtime built on Chromes V8 JavaScript engine.', image: 'https://pluralsight2.imgix.net/paths/images/nodejs-45adbe594d.png' },
    { name: 'Express js', description: 'Node.js® is a JavaScript runtime built on Chromes V8 JavaScript engine.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJtcV9aq-lnjpfaBNbdm1JdpR7MQguttUzwA&s' },
    { name: 'MongoDB Database', description: 'Document Database as a Service.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHzzVKfKwkmncUo0XtHbCL3-Z_aTwwACh74Q&s' },
  ]);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid container spacing={2}>
        {technologies.map((technology, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia component="img" alt={technology.name} sx={{backgroundPosition:"center",objectFit:"contain"}} height="140" image={technology.image} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {technology.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {technology.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TechnologyPage;