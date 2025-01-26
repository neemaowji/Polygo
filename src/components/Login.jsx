import React, { useEffect, useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithRedirect, signOut, getRedirectResult, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { Button, Typography, Box, Container, Paper, CircularProgress } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    const handleRedirectResult = async () => {
      try {
        setLoading(true);
        const result = await getRedirectResult(auth);
        if (result) {
          console.log("Redirect result:", result);
          navigate('/learn');
        }
      } catch (error) {
        console.error("Error handling redirect result:", error);
      } finally {
        setLoading(false);
      }
    };

    handleRedirectResult();

    return () => unsubscribe();
  }, [navigate]);

  const signInWithGoogle = () => {
    setLoading(true);
    signInWithRedirect(auth, googleProvider).catch((error) => {
      console.error("Error initiating Google sign-in:", error);
      setLoading(false);
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <Container component="main" maxWidth="xs">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

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
