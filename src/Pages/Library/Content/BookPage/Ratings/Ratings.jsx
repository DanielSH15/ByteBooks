import React, { useEffect, useState } from 'react'
import RatingItem from './RatingItem/RatingItem'
import axios from 'axios'
import './Ratings.css'

const Ratings = ({bookId}) => {
    const [ratings, setRatings] = useState([])
    const [users, setUsers] = useState([])

    const GetRatings = async() => {
       try{
        await axios.get('http://localhost:5226/api/rating/ ' + bookId)
        .then((response) => {
            setRatings(response.data)
            console.log(response.data)
        })
       } catch (e){
       }
    }

    useEffect(() => {
        GetRatings()
    }, [])
    return(
        <div className='ratings-data-container'>
            {ratings?.map((value, i) => {
                return(
                    <div>
                        <RatingItem rating={ratings[ratings.length - 1 - i]}/>
                        <hr style={{color: '#FFF'}}/>
                    </div>
                )
            })}
        </div>
    )
}

export default Ratings