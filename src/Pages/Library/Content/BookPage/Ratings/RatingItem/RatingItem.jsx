import React, { useEffect, useState } from 'react'
import {FaUser} from 'react-icons/fa'
import {HiDotsCircleHorizontal, HiDotsHorizontal} from 'react-icons/hi'
import axios from 'axios'
import './RatingItem.css'
import OptionsDropDown from './OptionsDropDown/OptionsDropDown'

const RatingItem = ({rating}) => {  
    const [user, setUser] = useState({})
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
        if(localStorage.getItem("userId") == user.userId){
            return <OptionsDropDown />;
        }
    }

    useEffect(() => {
        GetUser()
    }, [])
    return(
        <div className='rating-item-container'>
            <div className='rating-user-icon'>
                <h1><FaUser /></h1>
            </div>
            <div className='rating-info'>
               <h3>{user.username}</h3>
               <h5>{rating.content}</h5>
            </div>
            <hr style={{color: '#FFF'}}/>
            {GetOptions()}
        </div>
    )
}

export default RatingItem