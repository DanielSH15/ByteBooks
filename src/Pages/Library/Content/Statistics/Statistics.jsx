import React from "react";
import TotalBooksGraph from "./TotalBooksGraph/TotalBooksGraph";
import './Statistics.css'
import BorrowedBooksGraph from "./BorrowedBooksGraph/BorrowedBooksGraph";
import AppliedBooksGraph from "./AppliedBooksGraph/AppliedBooksGraph";

const Statistics = () => {
    return(
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
    )
}

export default Statistics