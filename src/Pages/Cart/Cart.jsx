import React, { useEffect, useState } from 'react'
import './Cart.css'
import axios from 'axios'
import CartItem from './CartItem/CartItem'

const Cart = () => {
  const [books, setBooks] = useState([])
  const data = []
  var id = localStorage.getItem("userId")

  const GetBorrowedBooks = async() => {
    try{
      await axios.get('http://localhost:5226/api/borrowedbooks/getbyuser/' + id)
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
  return (
    <div className='cartContainer'>
         {
          books.map((value, i) => {
            return(
                <CartItem book = {books[i]}/>
            )
          })
         }
    </div>
  )
}

export default Cart