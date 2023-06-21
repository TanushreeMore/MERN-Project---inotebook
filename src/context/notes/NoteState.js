import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "648c29cf4bc58b74a171f7c3",
          "user": "6489a4fbf0ed0a0433764391",
          "title": "My First Note.",
          "description": "This is my first Note.",
          "tag": "first note.",
          "date": "2023-06-16T09:22:23.105Z",
          "__v": 0
        },
        {
          "_id": "648c2c744bc58b74a171f7c8",
          "user": "6489a4fbf0ed0a0433764391",
          "title": "My Second Note",
          "description": "This is my Second Note",
          "tag": "Second note",
          "date": "2023-06-16T09:33:40.948Z",
          "__v": 0
        },
        {
          "_id": "648c2cc2d3a054a4eeab398d",
          "user": "6489a4fbf0ed0a0433764391",
          "title": "My Third Note Updated",
          "description": "This is my Updated Third Note",
          "tag": "Updated Third note",
          "date": "2023-06-16T09:34:58.266Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)

    //   Add a Note
    const addNote = (title, description, tag) => {
        // TODO: API call
        console.log("Adding a new note")
        const note={
            "_id": "648c2cc2d3a054a4eeab398d",
            "user": "6489a4fbf0ed0a0433764391",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-06-16T09:34:58.266Z",
            "__v": 0
          };
        setNotes(notes.concat(note))  //concat returns a new array
    }

    //   Delete a Note
    const deleteNote = () => {
        
    }

    //   Edit a Note
    const editNote = () => {
        
    }
    
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;