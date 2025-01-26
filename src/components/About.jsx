import React from 'react';
import { Link } from 'react-router'
import { Box, Typography, Button, Card, CardContent } from '@mui/material';

const HomePage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'top',
        height: '100vh',
        gap: 4,
        padding: 20
      }}
    >
      <Typography 
        component="p" 
        gutterBottom 
      >
        Polygo serves as a way to learn and stay familiar with data structures and algorithms. Whether you are just starting to learn
        or have studied them in the past, Polygo offers a fun way to get practice in without needing to pick up a textbook. Inspired by Duolingo's
        gameified approach to learning a language, we hoped to replicated the experience to help developers get ready for interviews.
      </Typography>
      <Box
        component="img"
        src="src\assets\Polygo Diagram.png"
      />
      </Box>
  );
};

export default HomePage;
