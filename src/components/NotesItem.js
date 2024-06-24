// rafce --> This is the basic Import which in used to import the statements
import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const NotesItem = (props) => {
    const context = useContext(noteContext);
    const { note, updateNote,showAlert} = props;
    const { deleteNote } = context;
    return (
        <div className="col-md-3">
            <div className="card my-3" style={{ width: "18rem" }}>
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={() =>{ updateNote(note)}}></i>
                        <i className="fa-solid fa-eraser mx-2" onClick={() => { deleteNote(note._id);showAlert("SUCCESS","Successfully Deleted") }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NotesItem
