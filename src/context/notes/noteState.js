import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) =>{
    const notesInitially = [];
    const host = "http://localhost:5000";
    
    const [notes,setNotes]=useState(notesInitially);
    
    const getNotes = async ()=>{
      // Added API
      const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiMjljNGQyZTZjZTNjN2E0ZTdkZTQ4In0sImlhdCI6MTY5MDE3NTgwMn0._MKJTs-jP4M1vxsXAk5krZHcWJbj1GZLts-Q5_1nU38",
        }
      })

      const json = await response.json();
      const updatedNotes=json.notes;
      setNotes(updatedNotes);
    }
    // Function 1 : Add a note
    const addNote =async (title,description,tag)=>{
      // API Call
      const response = await fetch(`${host}/api/notes/addnote`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiMjljNGQyZTZjZTNjN2E0ZTdkZTQ4In0sImlhdCI6MTY5MDE3NTgwMn0._MKJTs-jP4M1vxsXAk5krZHcWJbj1GZLts-Q5_1nU38",
        },
        body:JSON.stringify({
          "title":title,
          "description":description,
          "tag":tag
        })
      })

      const json = await response.json();
      console.log(json);

      console.log("adding a Note");
      const note = await json;
      setNotes(notes.concat(note));
    }


    // Function 2 : Delete a note
    const deleteNote=async (id)=>{
      // API Call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
        method:"DELETE",
        headers:{
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiMjljNGQyZTZjZTNjN2E0ZTdkZTQ4In0sImlhdCI6MTY5MDE3NTgwMn0._MKJTs-jP4M1vxsXAk5krZHcWJbj1GZLts-Q5_1nU38",
        }
      });
      const json = await response.json();
      console.log(json)

      console.log("Deleting a Note "+id);
      const newNotes = notes.filter((note)=>{return note._id !== id});
      setNotes(newNotes);

    }
    
    
    // Function 2 : Edit a note
    const editNote=async (id,title,description,tag)=>{
      // API Call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiMjljNGQyZTZjZTNjN2E0ZTdkZTQ4In0sImlhdCI6MTY5MDE3NTgwMn0._MKJTs-jP4M1vxsXAk5krZHcWJbj1GZLts-Q5_1nU38",
        },
        body:JSON.stringify({
          "title":title,
          "description":description,
          "tag":tag,
        })
      })
      const json= await response.json();
      console.log(json);

      console.log("Updating a Note");
      const newNotes=notes.filter((note)=>{
        if(note._id==id){
          note.title=title;
          note.description=description;
          note.tag=tag
        }
        return note 
      })
      console.log(newNotes);
      setNotes(newNotes);
    }


    return(
        <NoteContext.Provider value={{notes,addNote,editNote,deleteNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
  
}

export default NoteState;