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


    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;