import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import LockIcon from '@mui/icons-material/Lock';
import { FormHelperText } from "@mui/material";
import useStyles from "./signup-styles"

export default function Signup() {

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userRePassword, setUserRePassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const { classes } = useStyles();


    useEffect(()=>{
        if(userPassword !== userRePassword){
            setPasswordError(true)
        }else{
            setPasswordError(false)
        }        
    },[userRePassword]);

    const onUserSubmit = (event) => {
        console.log(event);
        event.preventDefault();

        const requestBody = {
            name: name,
            age: age,
            phone: phone,
            username: userName,
            password: userPassword
        };

        // Make the POST request using Axios
        axios.post('http://localhost:3000/app/signup', requestBody)
            .then(response => {
                console.log(response.data);
                alert(response.data.message)
            })
            .catch(error => {
                alert("UserName Exists or Some Error")
            });
    }



    return (
        <Grid container alignItems="center" justifyContent="center" flexDirection="column" spacing={3}>
            <Grid item>
                <form onSubmit={(event) => onUserSubmit(event)} className={classes.form}>
                    <TextField variant="filled" placeholder="Name" id="name"
                        onChange={(e) => setName(e.target.value)}
                        className={classes.typography}
                    />
                    <TextField variant="filled" placeholder="AGE" id="age"
                        onChange={(e) => setAge(e.target.value)}
                        className={classes.typography}
                        InputProps={{
                            type: 'number',
                        }}
                    />
                    <TextField variant="filled" placeholder="Phone" id="phone"
                        onChange={(e) => setPhone(e.target.value)}
                        className={classes.typography}
                        InputProps={{
                            type: 'number',
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ContactPhoneIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
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
                    <TextField variant="filled" placeholder="Retype Password" id="password"
                        className={classes.typography}
                        onChange={(e) => setUserRePassword(e.target.value)}
                        error={passwordError}
                        helperText={passwordError ? 'Passwords do not match' : ''}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                            type: 'password',
                        }} />
                    <Button className={classes.button} variant="contained" type="submit">Sign Up</Button>
                </form>
            </Grid>
            <Grid item >
                <Typography>User Name: {userName}</Typography>
                <Typography>Password: {userPassword}</Typography>
            </Grid>
        </Grid>
    )
}