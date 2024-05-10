import React, {useState, useEffect} from 'react'
import MobileCartItem from './MobileCartItem/MobileCartItem'
import axios from 'axios'

const MobileCart = () => {
    const [books, setBooks] = useState([])
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
  return (
    <div className='mobile-cart-container'>
        <div className="mobile-cart-items-container">
        {
                books.map((value, i) => {
                  return(
                      <MobileCartItem book = {books[i]}/>
                  )
                })
        }
        </div>
    </div>
  )
}

export default MobileCart