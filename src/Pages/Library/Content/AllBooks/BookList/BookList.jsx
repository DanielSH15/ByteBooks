import React from 'react'
import BookItem from '../../BookItem/BookItem'
import Row from 'react-bootstrap/Row'
import './BookList.css'

const BookList = ({books}) => {
    return (
       <div className = 'rows'>
        {books?.map((book) => (
           <BookItem key={book.bookId} book={book}/>
        ))}
       </div>
    )
}

export default BookList;