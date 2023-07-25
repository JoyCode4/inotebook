import React,{useContext, useEffect} from 'react';
import NoteContext from '../context/notes/noteContext';

const About = () => {
  const a=useContext(NoteContext);
  useEffect(()=>{
    a.update();
     // eslint-disable-next-line
  },[])
  return (
    <div>
       <h1>This is my About page of React App author is {a.state.name} and his roll No is {a.state.roll}</h1>
    </div>
  )
}

export default About
