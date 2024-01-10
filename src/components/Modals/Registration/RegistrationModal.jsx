import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import './RegistrationModal.css'
import Input from '../../Input/Input'
import { Link } from 'react-router-dom'
import LoginModal from '../Login/LoginModal'
import SelectInput from '../../Input/SelectInput'
import axios from 'axios'
import MultiSelectInput from '../../Input/MultiSelectInput'

const RegistrationModal = ({show, onHide, user, userGenres}) => {
  const[loginModalVisible, setLoginModalVisible] = useState(false)
  const [id, setId] = useState(0)
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
  const [accessKey, setAccessKey] = useState()

  const [firstNameError, setFirstNameError] = useState("First name starts with a big letter and shouldn't include special characters!")
  const [lastNameError, setLastNameError] = useState("Last name starts with a big letter and shouldn't include special characters!")
  const [usernameError, setUsernameError] = useState("Username should be 3-10 characters and shouldn't include any special character!")
  const [emailError, setEmailError] = useState("Invalid email!")
  const [passwordError, setPasswordError] = useState("Password must be at least 8 letters long (20 max), include at least one small letter, one big letter, one number and one special character!")
  const [phoneError, setPhoneError] = useState("Must type valid israeli phone number!")
  const [birthdayError, setBirthdayError] = useState("Must choose birthday!")
  const [genreError, setGenreError] = useState("Must choose your favorite genre!")
  const [genderError, setGenderError] = useState("Must choose your gender!")

  const [title, setTitle] = useState('Registration')
  const [buttonText, setButtonText] = useState('Sign Up')
  const [genreValues, setGenreValues] = useState([])
  
  
  const genres = [
    {label: 'Horror', value: 'Horror'},
    {label: 'Detective', value: 'Detective'},
    {label: 'Science Fiction', value: 'Science Fiction'},
    {label: 'Fantasy', value: 'Fantasy'}
   ]

   
   const [selectedOptions, setSelectedOptions] = useState([]);

  const insert = {
   firstName: firstName,
   lastName: lastName,
   username: username,
   email: email,
   password: password,
   phone: phone,
   dateOfBirth: dateOfBirth,
   genres: genreValues,
   gender: gender,
   accessKey: 0
  }
   
  const update = {
   userId: id,
   firstName: firstName,
   lastName: lastName,
   username: username,
   email: email,
   password: password,
   phone: phone,
   dateOfBirth: dateOfBirth,
   genres: selectedOptions,
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
   gender: null
 })

 

 const updateToken = async() => {
   try{
      await axios.post('http://localhost:5226/api/login', {
       username: username,
       password: password
      }).then((response) => {
       console.log(response.data)
       sessionStorage.setItem("token", JSON.stringify(response.data))
       sessionStorage.setItem("username", username)
       sessionStorage.setItem("password", password)
      })
   
     } catch (e) {
       setError(e.response.data)
     }
 }

 const handleSubmit = async(e) => {
   e.preventDefault()
   if(user != null){
      try{
         await axios.put('http://localhost:5226/api/user', update)
         .then((response) => {
           console.log(response.data)
           updateToken()
         })
       } catch (e){
         console.log(e.response.data)
       }
   } else {
      try{
        console.log(insert)
         await axios.post('http://localhost:5226/api/user', insert)
         .then((response) => {
           console.log(response.data)
           window.location.reload(false)
         })
       } catch (e){
         console.log(e.response.data)
       }
   }
 }

 const getUserGenres = async() => {
  await axios.get("http://localhost:5226" + "/api/user/getgenres/" + user.userId)
  .then((response) => {
    setSelectedOptions(response.data)
  })
}

 const handleSelectChange = (selectedOptions) => {
  setSelectedOptions(selectedOptions);
  setGenreValues(selectedOptions.map((option) => option.value))
  console.log(selectedOptions.map((option) => option.value))
}

 const genders = ['Male', 'Female']

 useEffect(() => {
   if(user != null){
      setTitle('Update Account')
      setButtonText('Update')
      setId(user.userId)
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setUsername(user.username)
      setEmail(user.email)
      setPassword(user.password)
      setPhone(user.phone)
      setDateOfBirth(user.dateOfBirth)
      setGenre(user.genre)
      setGender(user.gender)
      setAccessKey(user.accessKey)
      setSelectedOptions(userGenres)
      setGenreValues(selectedOptions.map((option) => option.value))
      getUserGenres()
   }
 }, [])

  return (
    <Modal
        size='lg'
        centered
        show={show}
        onHide={onHide}
        >
            <div className='modalContainer'>
            <Modal.Header closeButton>
                <Modal.Title><h1 style={{marginLeft: '26.5vh'}}>{title}</h1></Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <div className='inputs'>
                       <div className='inputContainer'>
                          <Input type='text' label='First Name' onChange={(e) => setFirstName(e.target.value)} defaultValue={firstName} errorMessage={firstNameError} regex={regex.firstName} id={'fname'} isValid={true}/>
                          <Input type='text' label='Last Name' onChange={(e) => setLastName(e.target.value)} defaultValue={lastName} errorMessage={lastNameError} regex={regex.lastName} id={'lname'} isValid={true}/>
                       </div>
                       <div className='inputContainer'>
                          <Input type='text' label='Username' onChange={(e) => setUsername(e.target.value)} defaultValue={username} errorMessage={usernameError} regex={regex.username} id={'username'} isValid={true}/>
                          <Input type='text' label='Email' onChange={(e) => setEmail(e.target.value)} defaultValue={email} errorMessage={emailError} regex={regex.email} id={'email'} isValid={true}/>
                       </div>
                       <div className='inputContainer'>
                          <Input type='text' label='Password' onChange={(e) => setPassword(e.target.value)} defaultValue={password} errorMessage={passwordError} regex={regex.password} id={'password'} isValid={true}/>
                          <Input type='text' label='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)}/>
                       </div>
                       <div className='inputContainer'>
                          <Input type='text' label='Phone Number' onChange={(e) => setPhone(e.target.value)} defaultValue={phone} errorMessage={phoneError} regex={regex.phone} id={'phone'} isValid={true}/>
                          <MultiSelectInput options={genres} errorMessage={genreError} selectedOptions={selectedOptions} handleSelectChange={handleSelectChange}/>
                       </div>
                       <div className='inputContainer'>
                          <Input type='date' label='Birthday' onChange={(e) => setDateOfBirth(e.target.value)} defaultValue={dateOfBirth} errorMessage={birthdayError} id={'birthday'} isValid={true}/>
                          <SelectInput label='Gender' onChange={(e) => setGender(e.target.value)} options={genders} hiddenoption={'Select Gender'} defaultValue={gender} errorMessage={genderError} id={'gender'} isValid={true}/>
                       </div>
                    </div>
                    <div className='submitContainer'>
                        <button onClick={handleSubmit}>{buttonText}</button>
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