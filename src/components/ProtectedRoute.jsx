import React, { useEffect, useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithRedirect, signOut, getRedirectResult } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { Button, Typography, Box, Container, Paper } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          // User successfully signed in
          navigate('/learn');
        }
      } catch (error) {
        console.error("Error handling redirect result:", error);
      }
    };

    handleRedirectResult();

    return () => unsubscribe();
  }, [navigate]);

  const signInWithGoogle = () => {
    signInWithRedirect(auth, googleProvider).catch((error) => {
      console.error("Error initiating Google sign-in:", error);
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ marginTop: 8, padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {user ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5" gutterBottom>
              Welcome, {user.displayName}!
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSignOut}
              sx={{ mt: 2 }}
            >
              Log out
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5" gutterBottom>
              Login/Create Account
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 2 }}>
              to track your progress
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<GoogleIcon />}
              onClick={signInWithGoogle}
              sx={{ mt: 2 }}
            >
              Sign In with Google
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
