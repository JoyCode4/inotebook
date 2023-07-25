import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) =>{
    const [state,setState]=useState({
        "name":"Jayesh",
        "roll":10
    })

    const update=()=>{
        setTimeout(()=>{
            setState({
                "name":"Parth",
                "roll":9
            })
        },1000)
    }
    return(
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;