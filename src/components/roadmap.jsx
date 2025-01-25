import React from 'react';
import { Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router'


const Roadmap = () => {
  const nodes = [
    { text: 'list', offset: 0 },
    { text: 'stack', offset: -100 },
    { text: 'queue', offset: 100 },
    { text: 'linked list', offset: -100 },
    { text: 'tree', offset: 100 },
    { text: 'heap', offset: -100 },
    { text: 'hash table', offset: 100 }
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

        </Box>
      ))}
    </Box>
  );
};

export default Roadmap;
