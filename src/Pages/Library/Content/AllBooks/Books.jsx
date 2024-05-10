import React, {useState, useEffect} from 'react'
import './Books.css'
import BookList from './BookList/BookList'
import axios from 'axios'
import Pagination from '../Pagination/Pagination'

const Books = () => {
  const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const booksPerPage = 6



  useEffect(() => {
    const getBooks = async() => {
      setLoading(true)
      const res = await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/book')
      setData(res.data.Value)
      setLoading(false)
    }

    getBooks()
  }, [])

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage
  const currentBooks = data.slice(indexOfFirstBook, indexOfLastBook)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className='all-books-content-container'>
      <div className='desktop-booklist'>
        <BookList books={currentBooks} />
      </div>
      <div className='mobile-booklist'>
        <BookList books={data} />
      </div>
       <div className='pagination-container'>
        <Pagination booksPerPage={booksPerPage} totalBooks={data.length} paginate={paginate}/>
       </div>
    </div>
  )
}

export default Books