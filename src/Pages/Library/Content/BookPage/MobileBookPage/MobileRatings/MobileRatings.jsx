import React, { useEffect, useState } from 'react'
import MobileRatingItem from './MobileRatingItem/MobileRatingItem'
import axios from 'axios'
import './MobileRatings.css'

const MobileRatings = ({bookId}) => {
    const [ratings, setRatings] = useState([])

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


  return (
    <div>
        <div className='ratings-data-container'>
            {ratings?.map((value, i) => {
                return(
                    <div>
                        <MobileRatingItem rating={ratings[ratings.length - 1 - i]}/>
                        <hr style={{color: '#FFF'}}/>
                    </div>
                )
            })}
        </div>
        <br />
        <br />
    </div>
  )
}

export default MobileRatings