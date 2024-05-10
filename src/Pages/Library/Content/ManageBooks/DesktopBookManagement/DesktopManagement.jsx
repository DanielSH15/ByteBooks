import React, { useEffect, useState } from 'react'
import './DesktopManagement.css'
import BookItem from '../BookItem/BookItem'
import axios from 'axios'
import {Link} from 'react-router-dom'

const DesktopManagement = () => {
    const [books, setBooks] = useState([])
    const[searchTerm, setSearchTerm] = useState('')


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

    const filteredBooks = books.filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()));

    useEffect(() => {
        GetBooks()
    }, [])

  return (
    <div className='overall-manage-books-container'>
        <div className='actions-manage-container'>
            <input placeholder='Search...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <Link to='/library' style={{textDecoration: 'none'}}><h1>Back To Library</h1></Link>
        </div>
        <div className='manage-books-container'>
            {searchTerm && filteredBooks.length === 0 ? (
                <h3 style={{color: '#FFF'}}>No matching books found.</h3>
            ) : (
                <div className='manage-books-items-container'>
                {
                    filteredBooks.map((value, i) => {
                        return(
                            <BookItem book={value} key={i}/>
                        )
                    })
                 }
                </div>
            )}
        </div>
    </div>
  )
}

export default DesktopManagement