import React, { useEffect, useState } from 'react'
import './Cart.css'
import NormalCart from './RegularCart/NormalCart'
import MobileCart from './MobileCart/MobileCart'

const Cart = () => {

  const [isPhone, setIsPhone] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth < 768){
          setIsPhone(true)
      } else {
          setIsPhone(false)
      }
  }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  return(
    <div className='overall-cart-container'>
      <div className='mobile-cart-container'>
        <MobileCart />
      </div>
      <div className='normal-cart-container'>
        <NormalCart />
      </div>
    </div>
  )
}

export default Cart