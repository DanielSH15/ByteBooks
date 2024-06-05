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
import Statistics from './Pages/Library/Content/Statistics/Statistics';
import ReadingTest from './Pages/Library/Content/ReadingTest/ReadingTest';
import DisplayNotification from './components/Notification/DisplayNotification';
import OverdueBooks from './Pages/Library/Content/OverdueBooks/OverdueBooks';
import OverdueNotification from './SignalR/OverdueNotification';
import UpdateProfile from './Pages/UpdateProfile/UpdateProfile';
import { AuthProvider } from './components/Contexts/AuthContext/AuthContext';
import { Update } from './Pages/UpdateProfile/Data/Data';
import { GenreProvider } from './components/Contexts/GenreContext/GenreContext';
import { BorrowTimeProvider } from './components/Contexts/BorrowTimeContext/BorrowTimeContext';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
      <GeneralNavBar />
        <BorrowTimeProvider>
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
            <Route path='/statistics' element={<Statistics />} />
            <Route path='/readingtest' element={<ReadingTest />}/>
            <Route path='/overduebooks' element={<OverdueBooks />}/>
            <Route path='/updateprofile' element={
                <GenreProvider>
                  <UpdateProfile />
                </GenreProvider>} />
          </Routes>
        </BorrowTimeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
