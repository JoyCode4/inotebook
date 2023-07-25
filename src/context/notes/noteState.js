import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) =>{
    const notesInitial = [
        {
          "_id": "64be106652e657c7c1926fc6",
          "user": "64b29c4d2e6ce3c7a4e7de48",
          "title": "first Note",
          "description": "It is my first note that have to be test here",
          "tag": "personal",
          "date": "2023-07-24T05:47:18.995Z",
          "__v": 0
        },
        {
          "_id": "64bf99760e5a3be798573f38",
          "user": "64b29c4d2e6ce3c7a4e7de48",
          "title": "New Note",
          "description": "Call to someone",
          "tag": "professional",
          "date": "2023-07-25T09:44:22.649Z",
          "__v": 0
        }
      ]
    
    const [notes,setNotes]=useState(notesInitial);

    // Function 1 : Add a note
    const addNote =(title,description,tag)=>{
      // TODO: API Call
      console.log("adding a Note");
      const note = {
        "_id": "64bf99760e5a3be798573f38",
        "user": "64b29c4d2e6ce3c7a4e7de48",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2023-07-25T09:44:22.649Z",
        "__v": 0
      }
      setNotes(notes.concat(note));
    }


    // Function 2 : Delete a note
    const deleteNote=(id)=>{
      // TODO: API Call
      console.log("Deleting a Note "+id);
      const newNotes = notes.filter((note)=>{return note._id != id});
      setNotes(newNotes);

    }
    
    
    // Function 2 : Edit a note
    const editNote=(id,title,description,tag)=>{
      // TODO: API Call
    }


    return(
        <NoteContext.Provider value={{notes,addNote,editNote,deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;