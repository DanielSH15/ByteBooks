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
    const[search, setSearch] = useState("")  //save the search results
    const [data, setData] = useState([])  //save the data variable
    const [show, setShow] = useState(false)  //modal state
    const [isLocal, setIsLocal] = useState(false)  //the book is local or not (from db or external API)
    
    const searchBook = async(e) => {
        if(e.key === "Enter"){
            try{
              await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
               + `&maxResults=40`)
              .then((response) => {
                setData(response.data.items)
              })
            } catch (e){
              await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/foundbooks')
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
      <div className='find-book-container'>
        <div className='header-search'>
        <div className='background-container'></div>
        <div className='rows-container'>
          <div className='header-search-title'>
            <h1>Find the most interesting <br /> and the most entertaining book</h1>
          </div>
          <div className='header-search-data-input'>
            <div>
              <input type='text' placeholder='Enter title' onChange = {e => setSearch(e.target.value)} onKeyPress = {searchBook}/>
              <div className='search-book-icon'>
                <HiSearch />
              </div>
            </div>
            <button onClick={() => setShow(true)}>Add Custom Book</button>
          </div>
        </div>
        <AddBook show = {show} onHide = {CloseModal}/>
        </div>
        <div className='books-container'>
          {
              CheckData()
          }
        </div>
      </div>
    )
}

export default FindBook
