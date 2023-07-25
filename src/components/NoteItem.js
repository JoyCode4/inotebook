import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const {note}=props;
    const {deleteNote}=useContext(NoteContext);

  return (
    <div className="col-md-4">
        <div className="card my-3">
            <div className="card-body">
                <div className='d-flex flex-row justify-content-between'>
                    <h5 className="card-title">{note.title}</h5>
                    <div className='icon'>
                        <i className="fa-solid fa-pen-to-square mx-3"></i>
                        <i className="fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id)}}></i>
                    </div>
                </div>
                <p className="card-text">{note.description}</p>

            </div>
        </div>
    </div>
  )
}

export default NoteItem
