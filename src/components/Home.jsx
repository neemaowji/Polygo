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
        justifyContent: 'center',
        height: '100vh',
        gap: 4,
        padding: 3
      }}
    >
      <Typography 
        variant="h2" 
        component="h1" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold',
          fontSize: { xs: '3rem', md: '4rem' }
        }}
      >
        Polygo
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          width: '100%',
          maxWidth: '1200px',
          justifyContent: 'center'
        }}
      >
        <Card sx={{ minWidth: 275, flex: 1 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Learn
            </Typography>
            <Typography variant="body1">
              Master data structures through interactive lessons and visualizations.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 275, flex: 1 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Practice
            </Typography>
            <Typography variant="body1">
              Reinforce your knowledge with hands-on coding exercises and challenges.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 275, flex: 1 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Track
            </Typography>
            <Typography variant="body1">
              Monitor your progress and earn achievements as you advance.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Button 
        variant="contained" 
        size="large" 
        sx={{ 
          mt: 2,
          px: 4,
          py: 1.5,
          fontSize: '1.2rem'
        }}
        component={Link}
        to="/learn"
      >
        Start Now
      </Button>
    </Box>
  );
};

export default HomePage;
