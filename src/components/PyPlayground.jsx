import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Slider, Grid, ThemeProvider, createTheme } from '@mui/material';

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212', // Dark background color
    },
    text: {
      primary: '#fff', // White text
    },
  },
});

const PyPlayground = () => {
  const [output, setOutput] = useState(''); // State to manage the output display
  const [scriptResult, setScriptResult] = useState(''); // State to manage the result of running the script
  const [printMessage, setPrintMessage] = useState('Hello, World!'); // Text for print statement
  const [xValue, setXValue] = useState(5); // Value for x
  const [yValue, setYValue] = useState(10); // Value for y
  const [zValue, setZValue] = useState(15); // Value for z

  // Handle button click to append the code to the output
  const handleButtonClick = (command) => {
    let finalCommand = '';
    if (command === "print") {
      finalCommand = `print('${printMessage}')`; // Print statement
    } else if (command === "x") {
      finalCommand = `x = ${xValue}`; // Set x value
    } else if (command === "y") {
      finalCommand = `y = ${yValue}`; // Set y value
    } else if (command === "z") {
      finalCommand = `z = ${zValue}`; // Set z value
    } else if (command === "printX") {
      finalCommand = `print(x)`; // Print x value
    } else if (command === "printY") {
      finalCommand = `print(y)`; // Print y value
    } else if (command === "printZ") {
      finalCommand = `print(z)`; // Print z value
    } else if (command === "addXYZ") {
      finalCommand = `print(x + y + z)`; // Add x, y, and z
    }

    // Append to output with new line
    setOutput((prevOutput) => prevOutput + finalCommand + '\n');
    resetFields();
  };

  // Simulate running the Python script (this would normally be a call to a backend or an API)
  const runScript = () => {
    // Simulate running the script by just showing an example output
    setScriptResult('Script executed successfully! Output: \n' + output);
  };

  // Clear all fields and outputs
  const clearAll = () => {
    setOutput('');
    setScriptResult('');
    resetFields();
  };

  // Reset the input fields
  const resetFields = () => {
    setPrintMessage('Hello, World!');
    setXValue(5);
    setYValue(10);
    setZValue(15);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'top',
          height: '100vh',
          gap: 4,
          padding: 20,
        }}
      >
        <Typography component="p" gutterBottom>
          Try Python in a Streamlined Interactive Coding Environment.
        </Typography>

        {/* Command rows with sliders/text boxes */}
        <Grid container spacing={2} justifyContent="center">
          {/* Code Box and Print Button */}
          <Grid item xs={12} sm={6} container alignItems="center" spacing={2}>
            <Grid item xs>
              <TextField
                label="Code"
                variant="outlined"
                value={printMessage}
                onChange={(e) => setPrintMessage(e.target.value)}
                fullWidth
                sx={{
                  input: { color: 'white' },
                  label: { color: 'white' },
                  textAlign: 'left', // Left justify the input text
                }}
              />
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => handleButtonClick("print")}
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Print
              </Button>
            </Grid>
          </Grid>

          {/* Set x, y, and z sliders */}
          <Grid item xs={12} container alignItems="center" justifyContent="flex-start" spacing={2}>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => handleButtonClick("x")}
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Set x
              </Button>
            </Grid>
            <Grid item xs>
              <Slider
                value={xValue}
                min={0}
                max={10}
                step={1}
                onChange={(e, newValue) => setXValue(newValue)}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `x = ${value}`}
                sx={{ width: '250px' }}
              />
            </Grid>

            <Grid item>
              <Button
                variant="outlined"
                onClick={() => handleButtonClick("y")}
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Set y
              </Button>
            </Grid>
            <Grid item xs>
              <Slider
                value={yValue}
                min={0}
                max={10}
                step={1}
                onChange={(e, newValue) => setYValue(newValue)}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `y = ${value}`}
                sx={{ width: '250px' }}
              />
            </Grid>

            <Grid item>
              <Button
                variant="outlined"
                onClick={() => handleButtonClick("z")}
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Set z
              </Button>
            </Grid>
            <Grid item xs>
              <Slider
                value={zValue}
                min={0}
                max={10}
                step={1}
                onChange={(e, newValue) => setZValue(newValue)}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `z = ${value}`}
                sx={{ width: '250px' }}
              />
            </Grid>
          </Grid>

          {/* Print x, Print y, Print z, and Add x, y, z buttons */}
          <Grid item xs={12} container alignItems="center" justifyContent="flex-start" spacing={2}>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => handleButtonClick("printX")}
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Print x
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => handleButtonClick("printY")}
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Print y
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => handleButtonClick("printZ")}
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Print z
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => handleButtonClick("addXYZ")}
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Add x, y, z
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Output display */}
        <TextField
          label="Code"
          variant="outlined"
          value={output}
          multiline
          rows={10} // Adjust the height to make it larger
          sx={{
            width: '100%',
            color: 'white', // Text color for output box
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white', // Border color for output box
              },
              '& textarea': {
                color: 'white', // Text area content (output) color
                backgroundColor: 'transparent', // Optional: make background transparent to match design
              },
            },
          }}
        />

        {/* Buttons to run the script and clear */}
        <Box sx={{ display: 'flex', gap: 2, marginTop: 3 }}>
          <Button
            variant="outlined"
            onClick={runScript}
            sx={{ color: 'white', borderColor: 'white' }}
          >
            Run Script
          </Button>
          <Button
            variant="outlined"
            onClick={clearAll}
            sx={{ color: 'white', borderColor: 'white' }}
          >
            Clear All
          </Button>
        </Box>

        {/* Second output display for running the script */}
        <TextField
          label="Script Output"
          variant="outlined"
          value={scriptResult}
          multiline
          rows={10} // Adjust the height to make it larger
          sx={{
            width: '100%',
            color: 'white', // Text color for output box
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white', // Border color for output box
              },
              '& textarea': {
                color: 'white', // Text area content (output) color
                backgroundColor: 'transparent', // Optional: make background transparent to match design
              },
            },
          }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default PyPlayground;
