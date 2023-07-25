import React from "react";
import Notes from "../components/Notes";
import AddNote from "./AddNote";
const Home = ()=>{
    return (
        <div className="Home ">
            <div className="container my-3 w-75">
                <AddNote/>  
                <Notes/>
            </div>
        </div>
    )
}

export default Home;