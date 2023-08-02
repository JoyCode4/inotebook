import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) =>{
    const notesInitially = [];
    const [alert,setAlert]=useState(null);

    const showAlert=(msg,type)=>{
      setAlert({msg,type});
      setTimeout(()=>{
        setAlert(null);
      },2000)
    }
    const host = "http://localhost:5000";
    
    const [notes,setNotes]=useState(notesInitially);
    
    const getNotes = async ()=>{
      // Added API
      const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "auth-token":localStorage.getItem('token'),
        }
      })

      const json = await response.json();
      const updatedNotes=json.notes;
      setNotes(updatedNotes);
      showAlert("All notes are get","success");
    }
    // Function 1 : Add a note
    const addNote =async (title,description,tag)=>{
      // API Call
      const response = await fetch(`${host}/api/notes/addnote`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "auth-token":localStorage.getItem('token'),
        },
        body:JSON.stringify({
          "title":title,
          "description":description,
          "tag":tag
        })
      })

      const note = await response.json();
      setNotes(notes.concat(note));
      showAlert("Note is Added Successfully","success");
    }


    // Function 2 : Delete a note
    const deleteNote=async (id)=>{
      // API Call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
        method:"DELETE",
        headers:{
          "auth-token":localStorage.getItem('token'),
        }
      });
      const json = await response.json();
      // console.log(json)

      // console.log("Deleting a Note "+id);
      const newNotes = notes.filter((note)=>{return note._id !== id});
      setNotes(newNotes);
      showAlert("Note is Deleted Successfully","danger");

    }
    
    
    // Function 2 : Edit a note
    const editNote=async (id,title,description,tag)=>{
      // API Call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "auth-token":localStorage.getItem('token'),
        },
        body:JSON.stringify({
          "title":title,
          "description":description,
          "tag":tag,
        })
      })
      const json= await response.json();
      // console.log(json);

      // console.log("Updating a Note");
      const newNotes=notes.filter((note)=>{
        if(note._id===id){
          note.title=title;
          note.description=description;
          note.tag=tag
        }
        return note 
      })
      setNotes(newNotes);
      showAlert("Note is Updated Successfully","success");
    }


    return(
        <NoteContext.Provider value={{notes,addNote,editNote,deleteNote,getNotes,alert,showAlert}}>
            {props.children}
        </NoteContext.Provider>
    )
  
}

export default NoteState;