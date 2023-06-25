import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useStyles from './Appbar-styles'
import { Button } from '@mui/material';

export default function AppBar() {

    const {classes }= useStyles();
    const navigate = useNavigate();

    const handleLogin = () => {
      navigate('/login');
    }
    const handleSignUp = () => {
      navigate('/signup');
    }
    const handleHome = () => {
      navigate('/');
    }
    const handleNotes = () => {
      navigate('/notes');
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static" className={classes.appbar}>
        <Toolbar>
          {/* <Link to='/'> */}
          <Typography onClick={handleHome} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NoteBook
          </Typography>
          {/* </Link> */}
          <Button variant='contained' onClick={handleLogin} sx={{margin: 2}} >Login</Button>
          <Button variant='outlined' onClick={handleSignUp} sx={{background: 'white', margin: 2}}>Sign Up</Button>
          <Button variant='outlined' onClick={handleNotes} sx={{background: 'white', margin: 2}}>Posts</Button>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}