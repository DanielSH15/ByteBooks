import React, { useRef, useState } from 'react'
import './InitDashboard.css'
import RegistrationModal from '../../../components/Modals/Registration/RegistrationModal'
import Button from '../../../components/Buttons/DefaultButton/Button'

const InitDashboard = () => {
    const[registrationVisible, setRegistrationVisible] = useState(false)

    return (
      <div className='bodyContainer'>
         <div className='overallContainer'>
         <div className='contentContainer'>
          <div className='contents'>
            <div className='descriptionContainer'>
                <h1>From classics to</h1>
                <h1>Contemporary gems.</h1>
                <h1>Craft your own reading journey.</h1>
                <h1>Post your own books.</h1>
                <h1>Welcome to <span style={{color: '#E13701'}}>ByteBooks!</span></h1>
                <Button text={"Sign Up"} onClick={() => setRegistrationVisible(true)}/>
            </div>
            <div className='bookDivContainer'>
              <div className='bookIconContainer'></div>
            </div>
          </div>
          <div className='sectionContainer'>
            <div className='shortContainer'>
              <div className='line'></div>
              <div className='optionsContainer'>
                 <h1>Welcome To ByteBooks!</h1>
                 <div className='optionsDescriptionContainer'>
                  <h3>-Discover Immerse Reads</h3>
                  <h3>-Effortless Exploration</h3>
                  <h3>-Craft Your Reading Journey</h3>
                  <h3>-Post Your Own Books</h3>
                 </div>
              </div>
            </div>
            <div className='aboutContainer'>
              <div className='icons'>
                 <div className='iconContainer'></div>
                 <div className='iconContainer'></div>
                 <div className='iconContainer'></div>
                 <div className='iconContainer'></div>
              </div>
              <div className='aboutDescription'>
                <h3>All kinds of books</h3>
                <h3>Lots of genres</h3>
                <h3>Adapting borrowing system</h3>
                <h3>Experienced moderators</h3>
              </div>
            </div>
          </div>
          <div className='sectionTwoContainer'>
            <h1>Sign Up And Start Your Reading Journey!</h1>
            <Button onClick={() => setRegistrationVisible(true)} text={"Sign Up"}/>
          </div>
        </div>
      </div>
      <RegistrationModal show={registrationVisible} onHide={() => setRegistrationVisible(false)}/>
      </div>
    )
}

export default InitDashboard