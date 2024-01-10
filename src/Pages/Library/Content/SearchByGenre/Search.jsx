import React, {useState} from 'react'
import Axios from 'axios'
import { Form } from 'react-bootstrap';
import { useEffect } from 'react';
import './Search.css'
import Result from './Result/Result';

const Search = () => {
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState('')


  useEffect(() => {
    try{
      Axios.get('http://localhost:5226' + '/api/genre')
      .then((response) => {
          setGenres(response.data)
      }) 
  } catch (e){
      console.log(e.response.data)
  }
  }, [])

  return (
    <div>
      <Form.Control as='select' id = 'genres' onChange={e => {setGenre(e.target.value)}} className = 'select'>
        <option selected hidden value='Select genre'>Select genre</option>
            {genres?.map(genre => (
                <option key={genre.genreId} value={genre.name}>{genre.name}</option>
            ))}
    </Form.Control>
    <Result genre = {genre}/>
    </div>
  )
}

export default Search;