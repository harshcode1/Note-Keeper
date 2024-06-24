import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'



const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [notes, setNotes] = useState({ title: "", description: "", type: "" })

    const {showAlert} = props;
    const handleClick = (e) => {
        e.preventDefault();
        addNote(notes.title, notes.description, notes.type)
        setNotes({ title: "", description: "", type: "" });
        showAlert("SUCCESS","Successfully ADDED")
    }

    const onChange = (e) => {
        setNotes({ ...notes, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-3">
            <h1>ADD a NOTE</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} value={notes.title}required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label">Description</label>
                    <input type="description" className="form-control" id="description" value={notes.description} name="description" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label">Tag</label>
                    <input type="type" className="form-control" id="type" name="type" value={notes.type} onChange={onChange} />
                </div>
                <button type="submit" disabled={notes.title.length<5 || notes.description.length<5} className="btn btn-primary" onClick={handleClick}>AddNote</button>
            </form>
        </div>
    )
}

export default AddNote
