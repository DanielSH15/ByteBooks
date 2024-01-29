import React from "react";
import TotalBooksGraph from "./TotalBooksGraph/TotalBooksGraph";
import './Statistics.css'
import BorrowedBooksGraph from "./BorrowedBooksGraph/BorrowedBooksGraph";

const Statistics = () => {
    return(
        <div>
            <div className="book-stats-container">
                <TotalBooksGraph />
            </div>
            <div className="borrowed-stats-container">
                <BorrowedBooksGraph />
            </div>
        </div>
    )
}

export default Statistics