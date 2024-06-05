import React, {useState, useEffect, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './DesktopBookPage.css'
import axios from 'axios';
import BorrowBookInfo from '../../../../../components/Modals/BorrowBookAction/BorrowBookInfo';
import PagesPerDay from '../../../../../components/Modals/PagesPerDayModal/PagesPerDay';
import MessageContent from '../../../../../components/Modals/MessageContent/MessageContent';
import Ratings from '../Ratings/Ratings';
import { BorrowTimeContext } from '../../../../../components/Contexts/BorrowTimeContext/BorrowTimeContext';

const DesktopBookPage = ({book}) => {
    const navigate = useNavigate()
    const[booksCounter, setBooksCounter] = useState(0)
    const [pagesPerDay, setPagesPerDay] = useState(0)
    const[pagesPerDayOpen, setPagesPerDayOpen] = useState(false)
    const[modalVisible, setModalVisible] = useState(false)
    const[error, setError] = useState("")
    const[listOfBooks, setListOfBooks] = useState([])
    const[ratingMessage, setRatingMessage] = useState('')
    const [bookGenres, setBookGenres] = useState([])
    const[readMore, setIsReadMore] = useState(false)
    const[messageModalOpen, setMessageModalOpen] = useState(false)
    const[isBanned, setIsBanned] = useState(false)
    const {borrowTime} = useContext(BorrowTimeContext)
    const {isBannedCon} = useContext(BorrowTimeContext)
    const maxChars = 445;
    var imgsrc =  book.photoFileName
  
    const userId = localStorage.getItem("userId")
    const bookId = book.bookId


    const GetBookGenres = async() => {
        try{
          await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/book/getgenresbyid/' + book.bookId)
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
          await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/borrowedbooks/getbyuser/' + userId)
          .then((response) => {
            setBooksCounter(response.data.length)
            setListOfBooks(response.data)
          })
        } catch (e){
        }
      }
    
      const BorrowedBook = {
        userId: userId,
        bookId: bookId,
     }
    
      const BorrowInsert = {
        borrowedBook: BorrowedBook,
        pagesPerDay: pagesPerDay
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
          await axios.post(import.meta.env.VITE_BACKEND_URI + '/api/borrowedbooks', BorrowInsert)
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
        await axios.post(import.meta.env.VITE_BACKEND_URI + '/api/rating', rating)
        .then((response) => {
          console.log(response.data)
          setRatingMessage(response.data)
          setMessageModalOpen(true)
        })
      } catch (e) {
        console.log(e.response.data)
        setRatingMessage(e.response.data)
        setMessageModalOpen(true)
      }
     }
    
     const ButtonAction = () => {
      if(isBanned === false && isBannedCon === false){
        if(borrowTime != 0 && book.copies > "0"){
          return <button onClick={() => setPagesPerDayOpen(true)}>Borrow</button>
        } else if(book.copies <= "0"){
          return <button onClick={() => {setModalVisible(true); setError("No copies left.")}}>Borrow</button>
        } else if(borrowTime === 0){
          return <Link to='/readingtest'><button>Borrow</button></Link>
        }
      } else  {
        return <button onClick={() => {setModalVisible(true); setError("You are banned from borrowing books.")}}>Borrow</button>
      }
     }
    

       useEffect(() => {
        const CheckIsBanned = async() => {
          try{
            const res = await IsBanned(JSON.parse(localStorage.getItem("userId")))
            setIsBanned(res)
          } catch (e) {
            console.log(e)
          }
         }
      
        GetBorrowedBooks()
        GetBookGenres()
        CheckIsBanned()
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
                   {ButtonAction()}
                   <Link to='/library' style={{fontSize: '25px', color: '#DB630C'}}>Back To Library</Link>
               </div>
           </div>
           <BorrowBookInfo show={modalVisible} onHide={() => setModalVisible(false)} message={error}/>
           <PagesPerDay show={pagesPerDayOpen} onHide={() => setPagesPerDayOpen(false)} setPagesPerDay={setPagesPerDay} action = {AddBorrowedBook}/>
        </div>
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
        <MessageContent show={messageModalOpen} onHide={() => setMessageModalOpen(false)} message={ratingMessage}/>
    </div>
  )
}

export default DesktopBookPage