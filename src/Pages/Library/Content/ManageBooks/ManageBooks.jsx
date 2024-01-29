import React, { useEffect, useState } from 'react'
import './ManageBooks.css'
import BookItem from './BookItem/BookItem'
import axios from 'axios'
import {Link} from 'react-router-dom'

const ManageBooks = () => {
    const [books, setBooks] = useState([])


    const GetBooks = async() => {
        try{
            await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/book')
            .then((response) => {
                console.log(response.data.Value)
                setBooks(response.data.Value)
            })
        } catch (e){
            console.log(e.response.data)
        }
    }

    useEffect(() => {
        GetBooks()
    }, [])

  return (
    <div className='overall-manage-books-container'>
        <Link to='/library' style={{textDecoration: 'none'}}><h1>Back To Library</h1></Link>
        <div className='manage-books-container'>
            <div className='manage-books-items-container'>
                {
                    books.map((value, i) => {
                        return(
                            <BookItem book={value} key={i}/>
                        )
                    })
                 }
            </div>
        </div>
    </div>
  )
}

export default ManageBooks