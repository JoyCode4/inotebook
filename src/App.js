import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import NoteState from './context/notes/noteState';
function App() {
  return (
    <div className="App">
      <NoteState>
        <Router>
          <Navbar/>
          <Alert message="It is an Alert"/>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/about' element={<About/>}/>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
