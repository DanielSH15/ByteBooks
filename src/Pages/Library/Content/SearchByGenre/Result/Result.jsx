import React, {useState} from 'react'
import Axios from 'axios'
import { Row } from 'react-bootstrap'
import { useEffect } from 'react'
import './Result.css'
import BookItem from '../../BookItem/BookItem'
import BookList from '../../AllBooks/BookList/BookList'

const Result = ({genre}) => {
    const [result, setResult] = useState([])
    
    useEffect(() => {
        if(genre != ''){
            try{
                Axios.get("http://localhost:5226" + `/api/book/` + genre)
                .then((response) => {
                   setResult(response.data)
                })
              } catch (e){
                console.log(e.response.data)
              }
        }
    })
  return (
      <div className='rowsR'>
            {result.Value?.map((book) => (
                <BookItem key={book.bookId} book={book}/>
            ))}
      </div>
  )
}

export default Result
