import  Axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import BookList from '../AllBooks/BookList/BookList'
import Pagination from '../Pagination/Pagination'

const Recommendations = () => {
    const [recs, setRecs] = useState([])
    const userId = localStorage.getItem("userId")
    const token = sessionStorage.getItem("token")
    const [currentPage, setCurrentPage] = useState(1)
    const booksPerPage = 6


    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage
    const currentBooks = recs.slice(indexOfFirstBook, indexOfLastBook)

    const paginate = pageNumber => setCurrentPage(pageNumber)

    useEffect(() => {
        Axios.get(import.meta.env.VITE_BACKEND_URI + "/api/user/getrecs/" + userId)
        .then((response) => {
            setRecs(response.data)
        })
    }, [])

    return(
        <div>
            <BookList books={currentBooks}/>
            <Pagination booksPerPage={booksPerPage} totalBooks={recs.length} paginate={paginate}/>
        </div>
    )
}

export default Recommendations;