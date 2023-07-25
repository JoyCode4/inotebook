import React,{useContext,useState} from 'react'
import NoteContext from '../context/notes/noteContext'
const AddNote = () => {
    const {addNote} = useContext(NoteContext);
    const [note,setNote]=useState({
        title:"",
        description:"",
        tag:"default"
    })
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
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
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onChange} required/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick }>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
