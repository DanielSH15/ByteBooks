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
      const res = await axios.get('http://localhost:5226/api/book')
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
    <div>
       <BookList books={currentBooks} />
       <Pagination booksPerPage={booksPerPage} totalBooks={data.length} paginate={paginate}/>
    </div>
  )
}

export default Books