import React, { useState } from "react";
import NoteContext from "./noteContext";
// import Notes from "../../components/Notes";

const NoteState = (props) => {
  // const s1 = {
  //     "name": "Harsh Soni",
  //     "course": "React"
  // }

  //=> This was the basic implementation of how we can use the usestate and do the things using context API
  // const [state,setState] = useState(s1);
  // const update=()=>{
  //     setTimeout(() => {
  //         setState({
  //             "name":"Yash Soni",
  //             "course":"B.COM"
  //         })
  //     }, 3000);
  // }


  const host = "http://localhost:5000"
  //=> Now here is a Big Deal
  const notesIntial = []

  //=> Get all Note
  const getNotes = async () => {

    //=> Need to make an API call
    const response = await fetch(`${host}/api/notes/fetchNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json)
    setNotes(json);
  }

  //=> Now here we will add the Functionalities..........

  //=> Add a Note
  const addNote = async (title, description, type) => {

    //=> Need to make an API call
    const response = await fetch(`${host}/api/notes/addNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, type }),
    });
    const note = await response.json()
    setNotes(notes.concat(note))
  }


  //=> Update a Note
  const editNote = async (id, title, description, type) => {
    //=> Need to make an API call
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, type }),
    });
    const json = await response.json()
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));

    //=> Logic to edit in Client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index]
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].type = type
        break;
      }
    }
    setNotes(newNotes)
  }


  //=> Delete a Note
  const deleteNote = async (id) => {
    //=> API call
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = response.json()
    console.log(json);


    console.log("Deleting the Node with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  const [notes, setNotes] = useState(notesIntial);
  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, getNotes, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;