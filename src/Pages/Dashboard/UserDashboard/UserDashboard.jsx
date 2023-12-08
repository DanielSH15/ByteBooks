import React from 'react'
import './UserDashboard.css'
import Slider from './Slider/Slider'
import { useNavigate } from 'react-router-dom'

const UserDashboard = () => {
  const navigate = useNavigate()
  const firstSlide = <div className='firstSlideContent'>
    <h1>View Our Library</h1>
  </div>

  const secondSlide = <div className='secondSlideContent'>
    <h1>View Your Recommendations</h1>
  </div>

  const thirdSlide = <div className='thirdSlideContent'>
    <h1>Post Your Book</h1>
  </div>

  const slideContent = [
    <div key={1}>{firstSlide}</div>,
    <div key={2}>{secondSlide}</div>,
    <div key={3}>{thirdSlide}</div>,
  ];

  return (
    <div className='sliderContainer'>
      <Slider slides={slideContent}/>
    </div>
  )
}

export default UserDashboard