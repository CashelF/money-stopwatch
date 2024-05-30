import React, { useState, useEffect } from 'react';
import { Container, Button, Box, Typography, Drawer, TextField, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './App.css';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [amount, setAmount] = useState(0.0000);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleRunning = () => {
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setAmount(prevAmount => prevAmount + (hourlyRate / 36000));
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, hourlyRate]);

  return (
    <div className="App">
      <IconButton onClick={() => setDrawerOpen(true)} sx={{ position: 'absolute', top: 16, left: 16, color: '#fff' }}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ lineHeight: '48px', paddingRight: 10 }}>Settings</Typography>
        </Toolbar>
        <Box sx={{ width: 250, padding: 2 }}>
          <TextField
            label="Hourly Rate"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            InputProps={{
              startAdornment: <span style={{ marginRight: '0.2em' }}>$</span>
            }}
            fullWidth
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1.5em',
                color: '#000',
                paddingLeft: '25px'
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#000',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#000',
                },
              },
              marginTop: 2
            }}
          />
        </Box>
      </Drawer>
      <Box component="main" className="centered-container">
        <Typography variant="h2" className="amount">${amount.toFixed(4)}</Typography>
        <Button 
          variant="contained" 
          sx={{ mt: 3, backgroundColor: '#008080', color: '#fff', '&:hover': { backgroundColor: '#006666' } }}
          onClick={toggleRunning}
        >
          {isRunning ? 'Stop' : 'Start'}
        </Button>
      </Box>
    </div>
  );
}

export default App;
