import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import GeneralNavBar from './components/Navbar/GeneralNavBar';
import Library from './Pages/Library/Library';
import UserManagement from './Pages/Admin/UserManagement/UserManagement';
import FindBook from './Pages/Library/Content/FindBook/FindBook';
import UserAppliedBooks from './Pages/Library/Content/UserAppliedBooks/UserAppliedBooks';
import PendingBooks from './Pages/Library/Content/PendingAppliedBooks/PendingBooks';
import BookPage from './Pages/Library/Content/BookPage/BookPage';
import Cart from './Pages/Cart/Cart';
import ManageBooks from './Pages/Library/Content/ManageBooks/ManageBooks';

function App() {

  return (
    <BrowserRouter>
      <GeneralNavBar />
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/library' element={<Library />} />
        <Route path='/book' element={<BookPage />}/>
        <Route path='/usermanagement' element={<UserManagement />} />
        <Route path='/addbook' element={<FindBook />} />
        <Route path='/userappliedbooks' element={<UserAppliedBooks />}/>
        <Route path='/pendingbooks' element={<PendingBooks />}/>
        <Route path='/cart' element={<Cart />} />
        <Route path='/managebooks' element={<ManageBooks />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
