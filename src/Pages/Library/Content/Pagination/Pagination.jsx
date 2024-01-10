import React from 'react'
import './Pagination.css'

const Pagination = ({booksPerPage, totalBooks, paginate}) => {
    const pageNumbers = []
    const numbers = Math.ceil(totalBooks / booksPerPage)

    for(let i = 1; i <= numbers; i++){
        pageNumbers.push(i)
    }

    return(
        <nav className='navPagination'>
            <ul className='pagination'>
               {pageNumbers.map(number => (
                <li key={number} className='page-item'>
                   <a href='#' className='page-link' onClick={() => paginate(number)}>{number}</a>
                </li>
               ))}
            </ul>
        </nav>
    )
}

export default Pagination;