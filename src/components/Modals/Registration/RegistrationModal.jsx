import React from 'react'
import { Modal } from 'react-bootstrap'
import './RegistrationModal.css'
import Input from '../../Input/Input'
import { Link } from 'react-router-dom'

const RegistrationModal = ({show, onHide}) => {
  const HandleSignIn = () => {
    onHide()
  }

  return (
    <Modal
        size='lg'
        centered
        show={show}
        onHide={onHide}
        >
            <div className='modalContainer'>
            <Modal.Header closeButton>
                <Modal.Title><h1 style={{marginLeft: '26.5vh'}}>Registration</h1></Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <div className='inputs'>
                       <div className='inputContainer'>
                          <Input type='text' label='First Name'/>
                          <Input type='text' label='Last Name'/>
                       </div>
                       <div className='inputContainer'>
                          <Input type='text' label='Username'/>
                          <Input type='text' label='Email'/>
                       </div>
                       <div className='inputContainer'>
                          <Input type='text' label='Password'/>
                          <Input type='text' label='Confirm Password'/>
                       </div>
                       <div className='inputContainer'>
                          <Input type='text' label='Phone Number'/>
                          <Input type='text'label='Favorite Genre'/>
                       </div>
                       <div className='inputContainer'>
                          <Input type='date' label='Birthday'/>
                          <Input type='text' label='Gender'/>
                       </div>
                    </div>
                    <div className='submitContainer'>
                        <button>Sign Up</button>
                        <h2>Don't have an account? <Link style={{color: '#DB630C'}} onClick={HandleSignIn}>Sign In</Link></h2>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                  </Modal.Footer>
            </div>
        </Modal>
  )
}

export default RegistrationModal