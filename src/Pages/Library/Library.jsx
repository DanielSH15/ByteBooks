import React, {useState} from 'react'
import AdminSideNav from './SideNav/AdminSideNav/AdminSideNav'
import './Library.css'
import Content from './Content/Content';
import UserSideNav from './SideNav/UserSideNav/UserSideNav';
import ManagerSideNav from './SideNav/ManagerSideNav/ManagerSideNav';


const Library = () => {
  const [currentPage, setCurrentPage] = useState('library');
  const accessKey = sessionStorage.getItem("accessKey")

  const changePage = (newPage) => {
      setCurrentPage(newPage)
      console.log(newPage)
  }

  const SideNav = (accessKey) => {
    if(accessKey === "10"){
      return <AdminSideNav changePage={changePage}/>
    } else if(accessKey === "5"){
      return <ManagerSideNav changePage={changePage}/>
    } else {
      return <UserSideNav changePage={changePage}/>
    }
  }
  
  return (
    <div className='library-contents'>
      {SideNav(accessKey)}
      <div className='library-content'>
         <Content page={currentPage} />
      </div>
    </div>
  )
}

export default Library