import React, {useEffect, useState} from 'react'
import Books from './AllBooks/Books';
import AdminSideNav from './SideNav/AdminSideNav/AdminSideNav'
import Recommendations from './Recommendations/Recommendations';
import './Library.css'
import Content from './Content/Content';


const Library = () => {
  const [currentPage, setCurrentPage] = useState('library');

  const changePage = (newPage) => {
      setCurrentPage(newPage)
      console.log(newPage)
  }
  
  return (
    <div className='library-contents'>
      <AdminSideNav changePage={changePage}/>
      <div className='library-content'>
         <Content page={currentPage} />
      </div>
    </div>
  )
}

export default Library