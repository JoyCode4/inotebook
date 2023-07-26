import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';

const Notes = () => {
    const {notes,getNotes,editNote} = useContext(NoteContext);
    const [note,setNote]=useState({
      id:"",
      etitle:"",
      edescription:"",
      etag:""
    })
    useEffect(()=>{
      getNotes();
      // eslint-disable-next-line
    },[])

    const ref = useRef(null);
    const refClose = useRef(null);
    const updateNote= (note)=>{
      ref.current.click();
      setNote({
        id:note._id,
        etitle:note.title,
        edescription:note.description,
        etag:note.tag})
    }
    const onChange=(e)=>{
      e.preventDefault();
      setNote({...note,[e.target.name]:e.target.value});
    }

    const handleClick=(e)=>{
      e.preventDefault();
      console.log("Updating a Note",note);
      editNote(note.id,note.etitle,note.edescription,note.etag);
      refClose.current.click();

    }
  return (
    <>
    <div className='row my-3'>
        <h1 className="my-4">Your Notes</h1>
        <div className='mx-2'>
          {notes.length===0 && "No Notes is Added"}
        </div>
        {notes.map((note)=>{
          return <NoteItem key={note._id} updateNote={updateNote} note={note}/>
        }
      )}
      <button type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
        Nothing
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
                <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onChange} minLength={5} value={note.etitle} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name='edescription' onChange={onChange} minLength={5} value={note.edescription}required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange}/>
                </div>
            </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleClick} className="btn btn-primary">Edit Note</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Notes
