const express = require('express')
const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// A get request to fetch all the Notes 
router.get('/fetchNotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        return res.status(400).send("Some Error ocurred")
    }
})

// A post request to add the notes...
router.post('/addNotes', fetchUser, [
    body('title', 'enter a Valid Title').isLength({ min: 3 }),
    body('description', 'Enter atleast 5 Characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const {title,description,tag} = req.body;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).json({ errors: result.array() });
        }
        const note = new Notes({
            title,description,tag, user: req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote);
    } catch (error) {
        console.log(error.message);
        return res.status(400).send("Some Error ocurred")
    }
})

//A put request to update a Note....
router.put('/updateNote/:id', fetchUser, async (req, res) => {
    try {
        const {title,description,tag} = req.body;

        // Create a New Note Object
        const newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        // Find the note to be Updated and update it
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found")
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Invalid")
        }

        note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new: true})
        res.json({note})
    } catch (error) {
        console.log(error.message);
        return res.status(400).send("Some Error ocurred")
    }
})

//=>Deleting a Note
router.delete('/deleteNote/:id', fetchUser, async (req, res) => {
    try {
        const {title,description,tag} = req.body;

        // Find the note to be Updated and update it
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found")
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Invalid")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({Deleted:"Successfully Deleted"})
    } catch (error) {
        console.log(error.message);
        return res.status(400).send("Some Error ocurred")
    }
})

module.exports = router;