import React, { useEffect, useState } from 'react'
import './NormalCart.css'
import axios from 'axios'
import NormalCartItem from './NormalCartItem/NormalCartItem'
import { Link } from 'react-router-dom'

const NormalCart = () => {
    const [books, setBooks] = useState([])
    const data = []
    var id = localStorage.getItem("userId")

    const GetBorrowedBooks = async() => {
        try{
          await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/borrowedbooks/getbyuser/' + id)
          .then((response) => {
            setBooks(response.data)
            console.log(response.data)
          })
        } catch (e){
            console.log(e.response.data)
        }
      }

      useEffect(() => {
        GetBorrowedBooks()
      }, [])

      if(books.length === 0){
        return <div className='overdue-page-container' style={{flexDirection: 'column', textAlign: 'center'}}>
                <h1 style={{color: '#FFF'}}>No borrowed books</h1>
                <Link to='/library'><h2>Back To Library</h2></Link>
            </div>;
      } else {
        return (
          <div className='cart-container'>
            <div className='borrow-title-container'>
              <h1>Borrowed Books</h1>
            </div>
            <div className='cart-items-container'>
            {
                books.map((value, i) => {
                  return(
                      <NormalCartItem book = {books[i]}/>
                  )
                })
               }
            </div>
          </div>
        )
      }
}

export default NormalCart;