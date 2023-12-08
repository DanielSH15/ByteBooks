import React, {useState} from 'react'
import './Slider.css'
import { Link, useNavigate } from 'react-router-dom'

const Slider = ({slides}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate()

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
    prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };


  return (
    <div className='slider'>
        <div className='slideRightArrow' onClick={goToNextSlide}></div>
        <div className="slide"><Link to='/library'>{slides[currentSlide]}</Link></div>
        <div className='slideLeftArrow' onClick={goToPrevSlide}></div>
    </div>
  )
}

export default Slider