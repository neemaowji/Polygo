import { useState } from 'react'
import * as React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Button from '@mui/material/Button';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button variant="contained">Hello world</Button>
    </>
  )
}

export default App
