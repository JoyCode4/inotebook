import React,{useContext} from 'react'
import { Link,useLocation, useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/noteContext';
import Alert from './Alert';
const Navbar = () => {
    const navigate=useNavigate();
    const location=useLocation();
    const {alert}=useContext(NoteContext);
    const logout=()=>{
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Cloud NotesBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            <Link className={`nav-link ${(location.pathname)==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                            <Link className={`nav-link ${(location.pathname)==='/about'?"active":""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex" role="search">
                        <Link className="btn btn-light mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-light" to="/signup" role="button">Sign Up</Link>
                        </form>:<Link className="btn btn-light mx-1" to="/login" onClick={logout} role="button">Logout</Link>}
                    </div>
                </div>
            </nav>
            <Alert alert={alert} />
        </>
    )
}

export default Navbar;