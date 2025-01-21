// src/theme.js
import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

const CustomAppBar = () => {
  return (
    <AppBar position="static" >
      <Toolbar sx={{backgroundColor:'#00625f'}}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TODO
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;