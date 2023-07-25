import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import NoteState from './context/notes/noteState';

function App() {
  return (
    <div className="App">
      <NoteState>
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
          </Routes>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
