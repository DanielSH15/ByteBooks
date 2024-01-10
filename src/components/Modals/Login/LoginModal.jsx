import React, {useState} from 'react'
import { Modal } from 'react-bootstrap'
import './LoginModal.css'
import Input from '../../Input/Input'
import axios from 'axios'
import LoginInput from './LoginInput/LoginInput'

const LoginModal = ({show, onHide}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
         await axios.post('http://localhost:5226/api/login', {
          username: username,
          password: password
         }).then((response) => {
          console.log(response.data)
          sessionStorage.setItem("token", JSON.stringify(response.data))
          sessionStorage.setItem("username", username)
          sessionStorage.setItem("password", password)
          window.location = "/"
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
                <Modal.Title><h1 style={{marginLeft: '34.5vh'}}>Login</h1></Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <form className='loginInputs'>
                        <LoginInput type='text' label='Username' onChange={(e) => setUsername(e.target.value)}/>
                        <LoginInput type='text' label='Password' onChange={(e) => setPassword(e.target.value)}/>
                        <h5>Forgot Password?</h5>
                        <button onClick={handleSubmit}>Sign In</button>
                    </form>
                    <h5 className='login-error-message'>{error}</h5>
                </Modal.Body>
                <Modal.Footer>
                  </Modal.Footer>
            </div>
        </Modal>
  )
}

export default LoginModal