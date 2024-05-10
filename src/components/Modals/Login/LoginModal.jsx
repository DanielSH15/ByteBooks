import React, {useState} from 'react'
import { Modal } from 'react-bootstrap'
import './LoginModal.css'
import axios from 'axios'
import LoginInput from './LoginInput/LoginInput'
import Button from '../../Buttons/DefaultButton/Button'

const LoginModal = ({show, onHide}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
         await axios.post(import.meta.env.VITE_BACKEND_URI + '/api/login', {  //send HTTP post request
          username: username,
          password: password
         }).then((response) => {
          console.log(response.data)
          sessionStorage.setItem("token", JSON.stringify(response.data))
          sessionStorage.setItem("username", username)
          sessionStorage.setItem("password", password)
          window.location.reload(false)
         })
      
        } catch (e) {
          setError(e.response.data)
        }
      }
  return (
    <Modal
        size='lg'
        centered
        show={show}
        onHide={onHide}
        className='modal'
        >
            <div className='loginModalContainer'>
            <Modal.Header closeButton>
                <div className='login-modal-title'>
                    <Modal.Title><h1>Login</h1></Modal.Title>
                </div>
            </Modal.Header>
                <Modal.Body>
                    <div className='login-modal-body'>
                        <form className='loginInputs'>
                            <LoginInput type='text' label='Username' onChange={(e) => setUsername(e.target.value)}/>
                            <LoginInput type='password' label='Password' onChange={(e) => setPassword(e.target.value)}/>
                            <Button text={"Sign In"} onClick={handleSubmit}/>
                        </form>
                        <div className='login-error-container'>
                            <h5 className='login-error-message'>{error}</h5>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                  </Modal.Footer>
            </div>
        </Modal>
  )
}

export default LoginModal