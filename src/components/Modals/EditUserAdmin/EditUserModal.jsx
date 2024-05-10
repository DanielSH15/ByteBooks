import React, {useEffect, useState} from 'react'
import { Modal } from 'react-bootstrap';
import { adminUserSchema } from '../../../Validations/AdminUserValidation';
import { useFormik } from 'formik';
import UserInput from './Input/UserInput'
import UserMultiSelectInput from './Input/UserMultiSelectInput'
import SelectInput from './Input/SelectInput'
import axios from 'axios';
import { GetGenres, Update } from '../UpdateProfile/Data/Data';
import MessageContent from '../MessageContent/MessageContent';
import './EditUserModal.css'

const EditUserModal = (props) => {
  const[genres, setGenres] = useState([])
  const[selectedGenres, setSelectedGenres] = useState([])
  const[genders, setGenders] = useState([{label: 'Male', value: 'Male'}, {label: 'Female', value: 'Female'}])
  const selectedGender = {label: props.user.gender, value: props.user.gender}
  const[message, setMessage] = useState('')
  const[openModal, setOpenModal] = useState(false)
  const[gender, setGender] = useState(props.user.gender)
  const[accessKey, setAccessKey] = useState(props.user.accessKey)

  const formik = useFormik({
    initialValues: {
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      username: props.user.username,
      email: props.user.email,
      password: props.user.password,
      phone: props.user.phone,
      dateOfBirth: props.user.dateOfBirth,
      genres: selectedGenres,
      gender: props.user.gender
    },
    validationSchema: adminUserSchema,
    onSubmit: async (values) => {
      var update = {
        userId: props.user.userId,
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        email: values.email,
        password: values.password,
        phone: values.phone,
        dateOfBirth: values.dateOfBirth,
        genres: values.genres,
        gender: values.gender,
        accessKey: JSON.parse(accessKey)
      }
      try{
        const response = await Update(update)
        console.log(update)
        setMessage(response)
        setOpenModal(true);
      } catch (e){
        setMessage(e.response.data)
        console.log(e)
        setOpenModal(true);
      }
    }
  })

  const handleSelectedGenres = (updatedGenres) => {
    setSelectedGenres(updatedGenres)
  }

  const handleSelectGender = (updatedGender) => {
    setGender(updatedGender.value)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    formik.values.genres = selectedGenres.map((item, i) => item.value)
    formik.values.gender = gender
    console.log(formik.values)
    formik.handleSubmit()
  }


  useEffect(() => {

    const GetOptionsGenres = async() => {
      try{
        var res = await GetGenres()
        setGenres(res)
      } catch (e) {
        console.log(e)
      }
    }
  
    const GetCurrentGenres = async() => {
        try{
            const response = await axios.get(import.meta.env.VITE_BACKEND_URI + `/api/user/getgenres/${props.user.userId}`);    
            setSelectedGenres(response.data);
        } catch (e){
            console.log(e)
        }
    }
    

    GetOptionsGenres()
    GetCurrentGenres();
  }, [])



  return (
    <Modal
        size='lg'
        centered
        show={props.show}
        onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit user {props.user.username}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UserInput type='text' placeholder='First name' label="First Name" id='firstName' defaultValue={formik.values.firstName} onChange={formik.handleChange} 
                          onBlur={formik.handleBlur} touched={formik.touched.firstName} error={formik.errors.firstName}/>
                <UserInput type='text' placeholder='Last name' label="Last Name" id='lastName' defaultValue={formik.values.lastName} onChange={formik.handleChange}
                          onBlur={formik.handleBlur} touched={formik.touched.lastName} error={formik.errors.lastName}/>
                <UserInput type='text' placeholder='Username' label="Username" id='username' defaultValue={formik.values.username} onChange={formik.handleChange}
                          onBlur={formik.handleBlur} touched={formik.touched.username} error={formik.errors.username}/>
                <UserInput type='text' placeholder='Email' label="Email" id='email' defaultValue={formik.values.email} onChange={formik.handleChange}
                          onBlur={formik.handleBlur} touched={formik.touched.email} error={formik.errors.email}/>
                <UserInput type='text' placeholder='Password' label="Password" id='password' defaultValue={formik.values.password} onChange={formik.handleChange}
                          onBlur={formik.handleBlur} touched={formik.touched.password} error={formik.errors.password} />
                <UserInput type='text' placeholder='Phone number' label="Phone number" id='phone' defaultValue={formik.values.phone} onChange={formik.handleChange}
                          onBlur={formik.handleBlur} touched={formik.touched.phone} error={formik.errors.phone}/>
                <UserMultiSelectInput options={genres} id='genres' label="Genres" selectedOptions={selectedGenres} onChange={handleSelectedGenres}
                          onBlur={formik.handleBlur} touched={formik.touched.genres} error={formik.errors.genres}/>
                <UserInput type='date' label='Birthday' id='dateOfBirth' defaultValue={formik.values.dateOfBirth} onChange={formik.handleChange}
                          onBlur={formik.handleBlur} touched={formik.touched.dateOfBirth} error={formik.errors.dateOfBirth}/>
                <SelectInput options={genders} id='gender' label="Gender" defaultValue={selectedGender} onChange={handleSelectGender}
                          onBlur={formik.handleBlur} touched={formik.touched.gender} error={formik.errors.gender}/>
                <UserInput type='number' placeholder='Access Key' label="Access Key" id='accessKey' defaultValue={props.user.accessKey}
                onChange={(e) => setAccessKey(e.target.value)}/>
            </Modal.Body>
            <Modal.Footer>
              <div className='edit-users-admin-actions-container'>
                <button onClick={handleSubmit} className='edit-user-button'>Save</button>
                <button onClick={props.onHide} className='cancel-edit-button'>Cancel</button>
              </div>
                
            </Modal.Footer>
            <MessageContent show={openModal} onHide={() => setOpenModal(false)} message={message}/>
    </Modal>
  )
}

export default EditUserModal