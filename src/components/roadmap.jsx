import React from 'react';
import { Button, Box } from '@mui/material';

const Roadmap = () => {
  const nodes = [
    { text: 'List', offset: 0 },
    { text: 'Stack', offset: -100 },
    { text: 'Queue', offset: 100 },
    { text: 'Linked List', offset: -100 },
    { text: 'Tree', offset: 100 },
    { text: 'Heap', offset: -100 },
    { text: 'Hash Table', offset: 100 }
  ];

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 4,
        minHeight: '100vh',
        width: '100%',
        overflow: 'visible'
      }}
    >
      {nodes.map((node, index) => (
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
        </Box>
      ))}
    </Box>
  );
};

export default Roadmap;
