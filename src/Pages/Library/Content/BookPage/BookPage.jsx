import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './BookPage.css'
import axios from 'axios';
import BorrowBookInfo from '../../../../components/Modals/BorrowBookAction/BorrowBookInfo';
import Ratings from './Ratings/Ratings';
import { FaArrowRight } from 'react-icons/fa';

const BookPage = () => {
  const location = useLocation()
    const navigate = useNavigate()
    var {book} = location.state.book
    const[booksCounter, setBooksCounter] = useState(0)
    const[modalVisible, setModalVisible] = useState(false)
    const[error, setError] = useState("")
    const[listOfBooks, setListOfBooks] = useState([])
    const[ratingMessage, setRatingMessage] = useState('')
    const [bookGenres, setBookGenres] = useState([])
    const[readMore, setIsReadMore] = useState(false)
    const maxChars = 445;
    var imgsrc =  book.photoFileName
  
    const userId = localStorage.getItem("userId")
    const bookId = book.bookId

    
  

  const GetBookGenres = async() => {
    try{
      await axios.get('http://localhost:5226/api/book/getgenresbyid/' + book.bookId)
      .then((response) => {
        setBookGenres(response.data)
        console.log(response.data)
      })
    } catch (e){
      console.log(e.response.data)
    }
  }
  const GetBorrowedBooks = async() => {
    try{
      await axios.get('http://localhost:5226/api/borrowedbooks/getbyuser/' + userId)
      .then((response) => {
        setBooksCounter(response.data.length)
        setListOfBooks(response.data)
      })
    } catch (e){
    }
  }

  const BorrowedBook = {
    userId: userId,
    bookId: bookId
 }
  
  const CheckIfBookExists = () => {
    for(var i = 0; i < listOfBooks.length; i++){
       if(listOfBooks[i].bookId === book.bookId){
        return true;
       }
    }
    return false;
  }


  const AddBorrowedBook = async () => {
    console.log(booksCounter)
    if(booksCounter >= 5){
      setError("You have reached the limit of borrowed books!")
      setModalVisible(true)
    } else if(CheckIfBookExists()){
      setError("You already borrowed that book!")
      setModalVisible(true)
    } else {
      await axios.post('http://localhost:5226/api/borrowedbooks', BorrowedBook)
        .then((response) => {
        })
        navigate('/cart')
    }
 }

 const rating = {
  userId: userId,
  bookId: bookId,
  content: ratingMessage
 }

 const SendReview = async() => {
  try{
    await axios.post('http://localhost:5226/api/rating', rating)
    .then((response) => {
      console.log(response.data)
      window.location.reload(false)
    })
  } catch (e) {
    console.log(e.response.data)
  }
 }

 useEffect(() => {
  GetBorrowedBooks()
  GetBookGenres()
}, [""])
  return (
    <div className='book-page-container'>
        <div className='book-content-container'>
           <div className='book-image-container'>
               <img src={imgsrc}/>
           </div>
           <div className='book-info-container'>
               <div className='book-info-title'>
                  <h1>{book.name} / {book.author}</h1>
                  <hr />
                  <h4>{book.pages} pages</h4>
               </div>
               <div className='book-info-description'>
                 <span><h1>Genres: <span>
                  {
                    bookGenres.map((genre, i) => (
                      <span key={genre.genreId}>
                        {genre.label} 
                        {i != bookGenres.length - 1 ? ', ' : ''}
                      </span>
                    ))
                  }
                  </span></h1></span>
                 <h4>{readMore ? book.description : `${book.description.slice(0, maxChars)} ...`}</h4>
                 <a onClick={() => setIsReadMore(!readMore)} className='read-more-button'>{readMore ? 'Read Less' : 'Read More'}</a>
               </div>
               <div className='actions'>
                   <button onClick={AddBorrowedBook}>Borrow</button>
                   <Link to='/library' style={{fontSize: '25px', color: '#DB630C'}}>Back To Library</Link>
               </div>
           </div>
        </div>
        <BorrowBookInfo show={modalVisible} onHide={() => setModalVisible(false)} message={error}/>
        <div className='ratings-container'>
          <div>
            <textarea className='review-input' placeholder='Write a review' onChange={(e) => setRatingMessage(e.target.value)}></textarea>
            <button className='send-review-button' style={{display: ratingMessage == '' ? 'none' : 'block'}} onClick={SendReview}>Send</button>
            <hr style={{color: '#FFF'}}/>
            <h3>Reviews from other users</h3>
            <hr style={{color: '#FFF'}}/>
            <div>
               <Ratings bookId={bookId}/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default BookPage