import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';

const Notes = () => {
    const {notes} = useContext(NoteContext);
  return (
    <div className='row my-3'>
        <h1 className="my-4">Your Notes</h1>
        {notes.map((note)=>{
            return <NoteItem note={note}/>
        }
      )}
    </div>
  )
}

export default Notes
