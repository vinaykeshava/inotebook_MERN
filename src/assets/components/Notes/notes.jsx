import React, { useEffect, useState } from 'react';
// import TextArea
import useStyles from './notes-styles'
import { Button, Grid, TextField } from '@mui/material';


const EditableNoteCards = () => {
    const [cards, setCards] = useState([]);
    const { classes } = useStyles();


    const addCard = () => {
        const newCard = { id: Date.now(), note: '' };
        setCards([...cards, newCard]);
    };

    const deleteCard = (id) => {
        const updatedCards = cards.filter((card) => card.id !== id);
        setCards(updatedCards);
    };

    const updateNote = (id, note) => {
        const updatedCards = cards.map((card) =>
            card.id === id ? { ...card, note } : card
        );
        setCards(updatedCards);
    };

    const submitNotes = () =>{
        console.log("Submitted");
        console.table(cards)
    }

    return (
        <Grid container className={classes.root} spacing={2}>
            {cards.map((card) => (
                <Grid item key={card.id}>
                    <TextField
                        value={card.note}
                        onChange={(e) => updateNote(card.id, e.target.value)}
                    />
                    <Button className={classes.button} variant='contained' onClick={() => deleteCard(card.id)}>Delete</Button>
                </Grid>
            ))}
            <Grid item>
                <Button variant='contained' onClick={addCard}>Add Card</Button>
            </Grid>
            <Grid item>
                <Button variant='contained' onClick={submitNotes}>Submit Notes</Button>
            </Grid>
        </Grid>
    );
};

export default EditableNoteCards;
