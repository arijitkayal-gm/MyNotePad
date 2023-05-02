import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert,setalert]=useState(null);
  
  const showAlert=(Message,type)=>{
    setalert({
      msg: Message,
      type: type
    })
    setTimeout(() => {
      setalert(null);
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} ></Route>
              <Route exact path="/about" element={<About />} />
              <Route exact path="/Login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/Signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
