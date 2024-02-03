import React, {useState} from 'react'
import './Search.css'
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Search = ({books}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBooks = books.filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className='search-books-container'>
    <input
      type="text"
      id="searchInput"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder='Type to search...'
    />

    {searchTerm && (
      <div className='book-search-results-container'>
        {filteredBooks.length > 0 ? (
          <ul className='book-search-list-container'>
            {filteredBooks.map((book, index) => (
              <Link style={{textDecoration: 'none'}} to={'/book'} state={{book: {book}}} onClick={() => setSearchTerm('')}><div key={index} className='book-result-info-container'><FaSearch /> {book.name}</div></Link>
            ))}
          </ul>
        ) : (
          <p style={{padding: '5px'}}>No matching books found.</p>
        )}
      </div>
    )}
  </div>
  )
}

export default Search