import React, {useEffect, useState} from 'react'
import { Col } from 'react-bootstrap'
import './BookItem.css'
import  Axios  from 'axios'
import { Link } from 'react-router-dom'

const BookItem = ({book}) => {
   const imgsrc = book.photoFileName
   const [editBookVisible, setEditBookVisible] = useState(false)
   const [accessKey, setAccessKey] = useState(0)
   const token = sessionStorage.getItem("token")

   const config = {
      headers: {
        'Authorization': `Bearer ${JSON.parse(token)}`
      }
  }

  const GetAccessKey = async () => {
      await Axios.get("http://localhost:5226/" + "api/user/auth", config).then((response) =>{
          setAccessKey(response.data.accessKey)
      })
  }

   const DeleteBook = async () => {
      await Axios.delete('http://localhost:5226' + `/api/book/${book.bookId}`)
      .then((response) => {
         console.log(response.data)
         window.location.reload()
      })
   }

   useEffect(() => {
      GetAccessKey()
   }, [])
   
      return (
         <div style={{margin: '38px', alignItems: 'center'}}>
            <Link to="/book" state={{book: {book}}} style = {{color: 'black', textDecoration: 'none'}}>
            <div>
               <div className='bookCardLib'>
                    <img src={imgsrc} className='testImgLib'/>
                    <div className='bottomCardLib'>
                        <h3 className='titleCardLib'>{book.name}</h3>
                    </div>
                </div>
            </div>
            </Link>
         </div>
      )
}

export default BookItem