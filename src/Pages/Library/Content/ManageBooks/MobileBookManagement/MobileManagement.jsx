import React, { useEffect, useState } from 'react'
import MobileItem from './MobileManagementItem/MobileItem'
import axios from 'axios'
import './MobileManagement.css'

const MobileManagement = () => {
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
    <div className='mobile-management-wrapper'>
        <div className='mobile-book-search'>
            <input type='text' placeholder='Search...' onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
        <div className="mobile-management-content">
            {searchTerm && filteredBooks.length === 0 ? (
                <h3 style={{color: '#FFF'}}>No matching books found.</h3>
            ) : (
                <div className='manage-books-mobile-items-container'>
                {
                    filteredBooks.map((value, i) => {
                        return(
                            <MobileItem book={value} key={i}/>
                        )
                    })
                 }
                </div>
            )}
        </div>
    </div>
  )
}

export default MobileManagement