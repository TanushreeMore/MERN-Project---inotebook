import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

   //   Get all Notes
   const getNotes = async() => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4OWE0ZmJmMGVkMGEwNDMzNzY0MzkxIn0sImlhdCI6MTY4NjgyMzkyMn0.IxY-CpQU58076ODOFF3LNszG-w_ahdLKCOSIM-70zlk",
        }
      });
    const json = await response.json();
    console.log(json);
    setNotes(json)
};

  //   Add a Note
  const addNote = async(title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4OWE0ZmJmMGVkMGEwNDMzNzY0MzkxIn0sImlhdCI6MTY4NjgyMzkyMn0.IxY-CpQU58076ODOFF3LNszG-w_ahdLKCOSIM-70zlk",
            },
            body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
          });
      
    console.log("Adding a new note");
    const note = {
      _id: "648c2cc2d3a054a4eeab398d",
      user: "6489a4fbf0ed0a0433764391",
      title: title,
      description: description,
      tag: tag,
      date: "2023-06-16T09:34:58.266Z",
      __v: 0,
    };
    setNotes(notes.concat(note)); //concat returns a new array
  };

  //   Delete a Note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4OWE0ZmJmMGVkMGEwNDMzNzY0MzkxIn0sImlhdCI6MTY4NjgyMzkyMn0.IxY-CpQU58076ODOFF3LNszG-w_ahdLKCOSIM-70zlk",
      },
    });
    const json = response.json();
    console.log(json);

    // Logic to delete
    console.log("Deleting note with id", id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //   Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4OWE0ZmJmMGVkMGEwNDMzNzY0MzkxIn0sImlhdCI6MTY4NjgyMzkyMn0.IxY-CpQU58076ODOFF3LNszG-w_ahdLKCOSIM-70zlk",
      },
      body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
    });
    const json = response.json();
    console.log(json);

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
