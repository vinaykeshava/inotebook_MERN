import React, { useState } from "react";
import axios from "axios";
import { Button, Grid, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import LockIcon from '@mui/icons-material/Lock';
import { FormHelperText } from "@mui/material";
import useStyles from "./login-styles"

export default function Login() {

    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const { classes } = useStyles();

    const onUserSubmit = (event) => {
        console.log(event);
        event.preventDefault();

        const requestBody = {
            username: userName,
            password: userPassword
        };

        axios.post('http://localhost:3000/app/login', requestBody)
            .then(response => {
                console.log(response.data);
                localStorage.setItem("token", response.data.token)
                alert(response.data.message) 
            })
            .catch(error => {
                alert(error.response.data.message)
                console.error(error);
            });
    }

    return (
        <Grid container alignItems="center" justifyContent="center" flexDirection="column" spacing={3}>
            <Grid item>
                <form onSubmit={(event) => onUserSubmit(event)} className={classes.form}>
                    <TextField variant="filled" placeholder="User Name" id="userId"
                        onChange={(e) => setUserName(e.target.value)}
                        className={classes.typography}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                        />
                    <TextField variant="filled" placeholder="Password" id="password"
                        onChange={(e) => setUserPassword(e.target.value)}
                        className={classes.typography}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                            type: 'password',
                        }} />
                    <Button className={classes.button} variant="contained" type="submit">Login</Button>
                </form>
            </Grid>
        </Grid>
    )
}