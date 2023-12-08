import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import './RegistrationModal.css'
import Input from '../../Input/Input'
import { Link } from 'react-router-dom'
import LoginModal from '../Login/LoginModal'
import SelectInput from '../../Input/SelectInput'
import axios from 'axios'

const RegistrationModal = ({show, onHide}) => {
  const[loginModalVisible, setLoginModalVisible] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [genre, setGenre] = useState('')
  const [gender, setGender] = useState('')

  const insert = {
   firstName: firstName,
   lastName: lastName,
   username: username,
   email: email,
   password: password,
   phone: phone,
   dateOfBirth: dateOfBirth,
   genre: genre,
   gender: gender
  }
  

 const [regex, setRegex] = useState({
   firstName: /^[A-Z][a-z]*$/,
   lastName: /^[A-Z][a-z]*$/,
   username: /^[A-Za-z0-9]{3,16}$/,
   email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
   password: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
   phone: /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/,
   dateOfBirth: null,
   genre: null,
   gender: null
 })

 const handleSubmit = async(e) => {
   e.preventDefault()
   try{
      await axios.post('http://localhost:5226/api/user', insert)
      .then((response) => {
        console.log(response.data)
        window.location.reload(false)
      })
    } catch (e){
      console.log(e.response.data)
    }
 }

 
 const genres = ['Horror', 'Detective', 'Romance', 'Science Fiction', 'Fantasy']
 const genders = ['Male', 'Female']

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
                          <Input type='text' label='First Name' onChange={(e) => setFirstName(e.target.value)}/>
                          <Input type='text' label='Last Name' onChange={(e) => setLastName(e.target.value)}/>
                       </div>
                       <div className='inputContainer'>
                          <Input type='text' label='Username' onChange={(e) => setUsername(e.target.value)}/>
                          <Input type='text' label='Email' onChange={(e) => setEmail(e.target.value)}/>
                       </div>
                       <div className='inputContainer'>
                          <Input type='text' label='Password' onChange={(e) => setPassword(e.target.value)}/>
                          <Input type='text' label='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)}/>
                       </div>
                       <div className='inputContainer'>
                          <Input type='text' label='Phone Number' onChange={(e) => setPhone(e.target.value)}/>
                          <SelectInput label='Favorite Genre' onChange={(e) => setGenre(e.target.value)} options={genres} hiddenoption={'Select Favorite Genre'}/>
                       </div>
                       <div className='inputContainer'>
                          <Input type='date' label='Birthday' onChange={(e) => setDateOfBirth(e.target.value)}/>
                          <SelectInput label='Gender' onChange={(e) => setGender(e.target.value)} options={genders} hiddenoption={'Select Gender'}/>
                       </div>
                    </div>
                    <div className='submitContainer'>
                        <button onClick={handleSubmit}>Sign Up</button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                  </Modal.Footer>
            </div>
            <LoginModal show={loginModalVisible} onHide={() => setLoginModalVisible(false)}/>
        </Modal>
  )
}

export default RegistrationModal