import { Grid, Typography } from "@mui/material";
import React from "react";
import Signup from './../Signup/index';

export default function Home(){
    return(
        <Grid container justifyContent='center' alignItems='center' height="calc(100vh - 64px)" spacing={2} flexDirection='column'>
            <Grid item>
                <Typography variant="h3">
                Welcome
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                To login Click on login button in Navbar
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                To SignUp Click on Signup button in Navbar
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                To see your posts click Posts button in Navbar
                </Typography>
            </Grid>
        </Grid>
    )
}