import React, { useEffect } from 'react'
import { useState } from 'react'
import {HiSearch} from 'react-icons/hi'
import axios from 'axios'
import './FindBook.css'
import BookCard from '../../../../components/BookCard/BookCard'
import CustomBookCard from '../../../../components/BookCard/CustomBookCard'
import { Link } from 'react-router-dom'
import AddBook from '../../../../components/Modals/AddBook/AddBook'

const FindBook = () => {
    const[search, setSearch] = useState("")
    const [data, setData] = useState([])
    const[error, setError] = useState("")
    const [show, setShow] = useState(false)
    const [isLocal, setIsLocal] = useState(false)
    
    const searchBook = async(e) => {
        if(e.key === "Enter"){
            try{
              await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${import.meta.env.VITE_GOOGLE_API_KEY}` + `&maxResults=40`)
              .then((response) => {
                setData(response.data.items)
              })
            } catch (e){
              await axios.get('http://localhost:5226/api/foundbooks')
              .then((response) => {
                setIsLocal(true)
                setData(response.data)
              })
            }
        }
    }


    const CheckData = () => {
      if(data){
        if(isLocal === false){
          return(
            data.map((item) => {
              return(
                <BookCard book={item}/>
              )
            })
          )
        } else {
          return(
            data.map((item) => {
              return(
                <CustomBookCard book={item} isLocal={isLocal}/>
              )
            })
          )
        }
      } else {
        return(
          <h1 className='errorMsg'>No book with such name was found!</h1>
        )
      }
    }

    const CloseModal = () => setShow(false)


    return (
      <div>
        <div>
        <div className='headerSearch'>
          <div className='row1'>
            <Link to='/library'><h2>Back To Library</h2></Link>
            <h1>Find the most interesting and <br />  the most entertaining book</h1>
          </div>
          <div className='row2'>
            <h2>Enter the title</h2>
            <div className='searchBook'>
              <input type="text" placeholder = "Enter title" value={search} onChange = {e => setSearch(e.target.value)} onKeyPress = {searchBook}/>
              <HiSearch className='searchButton'/>
              <button className='customBookButton' onClick={() => setShow(true)}>Add Custom Book</button>
              <AddBook show = {show} onHide = {CloseModal}/>
            </div>
          </div>
        </div>
        <div className='containerBooks'>
          {
            CheckData()
          }
        </div>
      </div>
      </div>
    )
}

export default FindBook
