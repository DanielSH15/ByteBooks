import React, { useEffect } from 'react'
import './BookCard.css'
import { useState } from 'react'
import axios from 'axios'
import BookInfoModal from '../Modals/BookInfo/BookInfoModal'

const BookCard = ({book}) => {
    let thumbnail = (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail) || book.photoFileName
    const [show, setShow] = useState(false)
    const [bookItem, setItem] = useState([])
    var currentBook;
    if(book.volumeInfo.categories != undefined && book.volumeInfo.authors != undefined){
        currentBook = {
            name: book.volumeInfo.title,
            genre: book.volumeInfo.categories[0],
            author: book.volumeInfo.authors[0],
            description: book.volumeInfo.description,
            releaseDate: book.volumeInfo.publishedDate,
            pages: book.volumeInfo.pageCount,
            photoFileName: book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail,
            previewLink: book.volumeInfo.previewLink
        } 
    } else {
        currentBook = {
            name: book.volumeInfo.title,
            genre: "No genre",
            author: "Unknown author",
            description: book.volumeInfo.description,
            releaseDate: book.volumeInfo.publishedDate,
            pages: book.volumeInfo.pageCount,
            photoFileName: book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail,
            previewLink: book.volumeInfo.previewLink
        }
    }

    const InsertIntoDB = async() => {
        try{
            await axios.post('http://localhost:5226/api/foundbooks', currentBook)
            .then((response) => {
                console.log(response)
            })
        } catch (e) {
            console.log(e.response.data)
        }
    }

    useEffect(() => {
        InsertIntoDB()
    }, [])

    if(thumbnail != undefined){
        return (
            <div>
                <div className='bookCard' onClick={() => {setShow(true)}}>
                    <img src={thumbnail} className='testImg'/>
                    <div className='bottomCard'>
                        <h3 className='titleCard'>{book.volumeInfo.title}</h3>
                    </div>
                </div>
                <BookInfoModal show = {show} book = {book} onClose={() => setShow(false)}/>
            </div>
        )
    }
}

export default BookCard
