import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import AppBar  from './assets/components/AppBar'
import Login from './assets/components/Login'
import Signup from './assets/components/Signup'
import Home from './assets/components/Home';
import EditableNoteCards from './assets/components/Notes';
import './App.css'

function App() {

  return (
    <Router>
      <CssBaseline/>
      <AppBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/notes' element={<EditableNoteCards />} />
      </Routes>
    </Router>
  )
}

export default App
