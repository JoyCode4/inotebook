import React,{useContext,useState} from 'react'
import NoteContext from '../context/notes/noteContext'
const AddNote = () => {
    const {addNote,showAlert} = useContext(NoteContext);
    const [note,setNote]=useState({
        title:"",
        description:"",
        tag:"default"
    })
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        document.getElementById("title").value="";
        document.getElementById("description").value="";
        document.getElementById("tag").value="";
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }

    return (
        <div>
            <h1>Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange}/>
                </div>
                <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
