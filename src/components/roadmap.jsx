import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, LinearProgress } from '@mui/material';
import { Link } from 'react-router';
import { auth, realtimeDb } from '../firebase';
import { ref, onValue } from 'firebase/database';

// roadmap -> Roadmap
const Roadmap = () => {
  const [progress, setProgress] = useState({});
  const [userId, setUserId] = useState(null);

  const nodes = [
    { text: 'list', offset: 0, totalQuestions: 10 },
    { text: 'stack', offset: -100, totalQuestions: 8 },
    { text: 'queue', offset: 100, totalQuestions: 12 },
    { text: 'linked list', offset: -100, totalQuestions: 15 },
    { text: 'tree', offset: 100, totalQuestions: 20 },
    { text: 'heap', offset: -100, totalQuestions: 10 },
    { text: 'hash table', offset: 100, totalQuestions: 18 }
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        const userProgressRef = ref(realtimeDb, `users/${user.uid}`);
        onValue(userProgressRef, (snapshot) => {
          if (snapshot.exists()) {
            setProgress(snapshot.val());
          }
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const calculateProgress = (dataStructure) => {
    if (progress[dataStructure] !== undefined) {
      const currentIndex = progress[dataStructure];
      const totalQuestions = nodes.find(node => node.text === dataStructure).totalQuestions;
      return Math.round(((currentIndex + 1) / totalQuestions) * 100);
    }
    return 0;
  };

  return (
    <>
    <Typography 
        variant="h3" 
      >
        Click on a different data structure to begin learning
    </Typography>
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 4,
        maxHeight: '40vh',
        width: '100%',
        overflow: 'visible'
      }}
    >
      {nodes.map((node) => (
        <Box
          key={node.text}
          sx={{
            my: '150px',
            position: 'relative',
            zIndex: 1,
            transform: `translateX(${node.offset}px)`,
          }}
        >
          <Button
            component={Link}
            to={`/quiz/${node.text}`}
            variant="contained"
            sx={{
              width: '200px',
              height: '50px',
              fontSize: '1.1rem',
              boxShadow: 3,
            }}
          >
            {node.text}
          </Button>
          <Box sx={{ width: '200px', mt: 1 }}>
            <LinearProgress 
              variant="determinate" 
              value={calculateProgress(node.text)} 
              sx={{
                height: 10,
                borderRadius: 5,
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                },
              }}
            />
            <Typography 
              variant="h6" 
              color="text" 
              align="center" 
              sx={{ mt: 1, fontWeight: 'bold' }}
            >
              {`${calculateProgress(node.text)}%`}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
    </>
  );
};

export default Roadmap;
