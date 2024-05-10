import React, {useEffect, useState} from 'react'
import { adminUserSchema } from '../../../Validations/AdminUserValidation'
import { useFormik } from 'formik'
import { GetGenres, Register } from '../Registration/Data/Data'
import { Modal } from 'react-bootstrap'
import UserInput from '../EditUserAdmin/Input/UserInput'
import UserMultiSelectInput from '../EditUserAdmin/Input/UserMultiSelectInput'
import SelectInput from '../EditUserAdmin/Input/SelectInput'
import MessageContent from '../MessageContent/MessageContent'
import SubmitButton from '../../Buttons/ModalButtons/SubmitButton/SubmitButton'
import CancelButton from '../../Buttons/ModalButtons/CancelButton/CancelButton'
import './AddUserModal.css'

const AddUserModal = (props) => {
  const[genres, setGenres] = useState([])  //set state for genres
  const[genders, setGenders] = useState([{label: 'Male', value: 'Female'}, {label: 'Female', value: 'Female'}])  //define genders
  const[gender, setGender] = useState('')  //set state for gender
  const[selectedGenres, setSelectedGenres] = useState([])  //set state for selected genres
  const[openModal, setOpenModal] = useState(false)  //set state for modal
  const[message, setMessage] = useState([])  //set state for message

  const formik = useFormik({  
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      dateOfBirth: '',
      genres: [],
      gender: ''
    },
    validationSchema: adminUserSchema,
    onSubmit: async (values) => {
      var insert = {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        email: values.email,
        password: values.password,
        phone: values.phone,
        dateOfBirth: values.dateOfBirth,
        genres: values.genres,
        gender: values.gender,
      }
      try{
        const response = await Register(insert)
        console.log(response)
        window.location.reload(false)
      } catch (e){
        setMessage(e.response.data)
        console.log(e.response.data)
      }
    }
  })

  const handleSelectedGenres = (updatedGenres) => {
    setSelectedGenres(updatedGenres)
    formik.values.genres = updatedGenres.map((item, i) => {return item.value})
  }

  const handleSelectGender = (updatedGender) => {
    setGender(updatedGender.value)
    formik.values.gender = gender
  }


  const handleSubmit = async(e) => {
    e.preventDefault()
    formik.handleSubmit()
    console.log(formik.values)
  }

  useEffect(() => {
    const GetSelectGenres = async() => {
      try{
        var genres = await GetGenres()
        setGenres(genres)
        console.log(genres)
      } catch (e){
        console.log(e)
      }
    }
    GetSelectGenres()
  }, [])


  return (
    <div>
      <Modal
        size='lg'
        centered
        show={props.show}
        onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add user</Modal.Title>
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
                <UserInput type='text' placeholder='Phone number' label="Phone" id='phone' defaultValue={formik.values.phone} onChange={formik.handleChange}
                          onBlur={formik.handleBlur} touched={formik.touched.phone} error={formik.errors.phone}/>
                <UserMultiSelectInput options={genres} id='genres' label="Genres" selectedOptions={selectedGenres} onChange={handleSelectedGenres}
                          onBlur={formik.handleBlur} touched={formik.touched.genres} error={formik.errors.genres}/>
                <UserInput type='date' label='Birthday' id='dateOfBirth' defaultValue={formik.values.dateOfBirth} onChange={formik.handleChange}
                          onBlur={formik.handleBlur} touched={formik.touched.dateOfBirth} error={formik.errors.dateOfBirth}/>
                <SelectInput options={genders} id='gender' label="Gender" onChange={handleSelectGender}
                          onBlur={formik.handleBlur} touched={formik.touched.gender} error={formik.errors.gender}/>
            </Modal.Body>
            <Modal.Footer>
              <div className='edit-users-admin-actions-container'>
                <div className="add-user-admin-button-modal">
                  <SubmitButton text="Add" action={handleSubmit}/>
                </div>
                <div className="cancel-add-user-admin-button-modal">
                  <CancelButton text="Cancel" action={props.onHide}/>
                </div>
              </div>
                
            </Modal.Footer>
            <MessageContent show={openModal} onHide={() => setOpenModal(false)} message={message}/>
    </Modal>
    </div>
  )
}

export default AddUserModal