import React from 'react'
import './Search.css'

const Search = () => {
  return (
    <div className='searchContainer'>
        <div className='searchIconContainer'></div>
        <input type='text' placeholder='Search Book'/>
    </div>
  )
}

export default Search