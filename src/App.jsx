import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import GeneralNavBar from './components/Navbar/GeneralNavBar';
import Library from './Pages/Library/Library';
import Books from './Pages/Library/AllBooks/Books';

function App() {

  return (
    <BrowserRouter>
      <GeneralNavBar />
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/library' element={<Library />} />
        <Route path='/library/collection' element={<Books />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
