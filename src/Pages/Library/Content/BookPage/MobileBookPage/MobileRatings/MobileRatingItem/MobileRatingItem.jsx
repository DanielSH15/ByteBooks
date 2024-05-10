import React, { useEffect, useState } from 'react'
import {FaUser} from 'react-icons/fa'
import axios from 'axios'
import './MobileRatingItem.css'
import MobileOptionsDropDown from './OptionsDropDown/MobileOptionsDropDown'

const MobileRatingItem = ({rating}) => {
    const [user, setUser] = useState({})
    const [readMore, setReadMore] = useState(false)
    const GetUser = async() => {
        try{
          await axios.get('http://localhost:5226/api/user/getuserbyid/' + rating.userId)
          .then((response) => {
            setUser(response.data)
            console.log(response.data)
          })
        } catch (e){

        }
    }

    const GetOptions = () => {
        if(sessionStorage.getItem("accessKey") === "10" || sessionStorage.getItem("accessKey") === "5"){
            return <MobileOptionsDropDown rating={rating}/>;
        } else if(localStorage.getItem("userId") == user.userId){
            return <MobileOptionsDropDown rating={rating}/>;
        }
    }

    useEffect(() => {
        GetUser()
    }, [])

  return (
    <div className='mobile-rating-container'>
        <div className='mobile-user-icon'>
            <h1><FaUser /></h1>
        </div>
        <div className="mobile-rating-info">
            <h3>{user.username}</h3>
            <h5>{readMore ? rating.content : `${rating.content.slice(0, 120)} ...`}</h5>
            <a onClick={() => setReadMore(!readMore)} className='read-more-button'>{readMore ? 'Read Less' : 'Read More'}</a>
        </div>
        <hr style={{color: '#FFF'}}/>
        <div className='mobile-rating-options-container'>
            <MobileOptionsDropDown rating={rating}/>
        </div>
    </div>
  )
}

export default MobileRatingItem