import React from "react";
import TotalBooksGraph from "./TotalBooksGraph/TotalBooksGraph";
import './Statistics.css'
import BorrowedBooksGraph from "./BorrowedBooksGraph/BorrowedBooksGraph";
import AppliedBooksGraph from "./AppliedBooksGraph/AppliedBooksGraph";
import {Link} from 'react-router-dom'

const Statistics = () => {
    return(
        <>
        <Link to='/library' style={{textDecoration: 'none'}}><h1 className="back-to-library-link">Back To Library</h1></Link>
        <div>
            <div>
                <TotalBooksGraph />
            </div>
            <div>
                <BorrowedBooksGraph />
            </div>
            <div>
                <AppliedBooksGraph />
            </div>
        </div>
        </>
    )
}

export default Statistics