import React, { useContext, useEffect, useState, useRef } from 'react'
import AddNote from './AddNote';
import noteContext from '../context/notes/noteContext'
import NotesItem from './NotesItem';
import { Navigate, useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const {showAlert} = props;
    const context = useContext(noteContext);
    let navigate = useNavigate();
    //=> Here we are donig destructuring.......
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }else{
             navigate("/login")
        }
        
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etype: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        // Log the currentNote._id value
        console.log("Note ID:", currentNote._id);

        // Make sure _id is available before setting the note state
        if (currentNote._id) {
            setNote({
                id: currentNote._id,
                etitle: currentNote.title,
                edescription: currentNote.description,
                etype: currentNote.type
            });
            
        } else {
            console.error("Error: _id is undefined in currentNote", currentNote);
        }
    };




    const handleClick = (e) => {
        e.preventDefault();
        // Log the values before calling editNote
        console.log("Current Note:", note);
        editNote(note.id, note.etitle, note.edescription, note.etype);
        refClose.current.click();
        showAlert("SUCCESS","Successfully Updated")
    };


    const onChange = (e) => {
        e.preventDefault();

        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote showAlert={showAlert} />
            <button type="button" ref={ref} className="btn d-none btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle || ''} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="text" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription || ''} name="edescription" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="text" className="form-label">Type</label>
                                    <input type="text" className="form-control" id="etype" name="etype" value={note.etype || ''} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose}  className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5}className="btn btn-primary" onClick={handleClick}>Update Notes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <button ref={ref} type="button" className="btn d-none btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={notes.title} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="text" className="form-label">Description</label>
                                    <input type="description" className="form-control" id="edescription" value={notes.description} name="edescription" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="text" className="form-label">Type</label>
                                    <input type="text" className="form-control" id="etype" name="etype" value={notes.type} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Update Notes</button>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="container my-3">
                <h2>YOUR NOTES</h2>
                {notes.map((note) => {
                    return <NotesItem showAlert={showAlert} key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
