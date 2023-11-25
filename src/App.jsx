import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  )
}

export default App
