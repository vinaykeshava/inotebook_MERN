import React, { useEffect, useState } from 'react';
import useStyles from './notes-styles'
import { Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';


const EditableNoteCards = () => {
    const [cards, setCards] = useState([]);
    const [authorizred, setAuthorized] = useState(false);
    const { classes } = useStyles();

    useEffect(() => {
        const token = localStorage.getItem('token')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        };
        axios.post('http://localhost:3000/app/protected', {}, { headers })
            .then((response) => {
                setAuthorized(true);
                const tokenParts = token.split('.');
                const encodedPayload = tokenParts[1];
                const decodedPayload = atob(encodedPayload);
                const payload = JSON.parse(decodedPayload);
                const username = payload.username;
                axios.get('http://localhost:3000/app/content/getallpost', {
                    params: {
                        username: username
                    }
                })
                    .then((res) => {
                        console.log(res.data.data)
                        setCards(res.data.data)
                    })
            })
            .catch((error) => {
                alert(error)
            })
    }, [])

    const addPost = () => {
        const newCard = { id: Date.now(), note: '' };
        setCards([...cards, newCard]);
    };

    const deletePost = (id) => {
        const updatedCards = cards.filter((card) => card.id !== id);
        setCards(updatedCards);
        const token = localStorage.getItem('token')
        const tokenParts = token.split('.');
        const encodedPayload = tokenParts[1];
        const decodedPayload = atob(encodedPayload);
        const payload = JSON.parse(decodedPayload);
        const username = payload.username;
        axios.get('http://localhost:3000/app/content/deletepost', {
            params: {
                "username": username,
                "id": id
            }
        })
            .then(response => alert(response.data.message))
            .catch(() => alert("Something went wrong"))
    };


    const submitPost = (id) => {
        const card = cards.find((card) => card.id === id);
        const token = localStorage.getItem('token')
        const tokenParts = token.split('.');
        const encodedPayload = tokenParts[1];
        const decodedPayload = atob(encodedPayload);
        const payload = JSON.parse(decodedPayload);
        const username = payload.username;

        // Make the API call to submit the post
        axios.post('http://localhost:3000/app/content/submitpost', {
            "username": username,
            "id": card.id,
            "note": card.note
        })
            .then((response) => {
                alert(response.data.message);
            })
            .catch((error) => {
                alert("Something went wrong");
                console.error(error);
            });

    }

    const updatePost = (id, note) => {
        const updatedCards = cards.map((card) =>
            card.id === id ? { ...card, note } : card
        );
        setCards(updatedCards);
    };

    if (!authorizred) {
        return (
            <Grid container>
                <Grid item>
                    <Typography variant='h1'>Please Login First</Typography>
                </Grid>
            </Grid>
        )
    } else {
        return (
            <Grid container className={classes.root} spacing={2}>
                {cards.map((card) => (
                    <Grid item key={card.id}>
                        <TextField
                            value={card.note}
                            onChange={(e) => updatePost(card.id, e.target.value)}
                        />
                        <Button className={classes.button} variant='contained' onClick={() => deletePost(card.id)}>Delete Post</Button>
                        <Button className={classes.button} variant='contained' onClick={() => submitPost(card.id)}>Submit Post</Button>
                    </Grid>
                ))}
                <Grid item>
                    <Button variant='contained' onClick={addPost}>Add Post</Button>
                </Grid>
            </Grid>
        );
    };
};

export default EditableNoteCards;
